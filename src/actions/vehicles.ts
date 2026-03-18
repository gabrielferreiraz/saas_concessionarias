"use server"

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { r2Client } from "@/src/lib/r2"

type CreateVehicleInput = {
  make: string
  model: string
  year: number
  price: number
  km: number
  color?: string
  fuelType?: string
  description?: string
  featured?: boolean
  status?: "AVAILABLE" | "RESERVED" | "SOLD"
  imageFiles: File[]
}

type UpdateVehicleInput = {
  id: string
  make: string
  model: string
  year: number
  price: number
  km: number
  color?: string
  fuelType?: string
  description?: string
  featured?: boolean
  status?: "AVAILABLE" | "RESERVED" | "SOLD"
}

export async function createVehicleAction(input: CreateVehicleInput) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Não autorizado. Faça login para continuar.")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user || !user.storeId) {
    throw new Error("Usuário inválido ou não vinculado a uma loja.")
  }

  if (!input.imageFiles || input.imageFiles.length === 0) {
    throw new Error("Selecione pelo menos uma imagem para cadastrar o veículo.")
  }

  if (input.imageFiles.length > 10) {
    throw new Error("Você pode enviar no máximo 10 imagens por veículo.")
  }

  const bucket = process.env.R2_BUCKET_NAME
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL

  if (!bucket || !publicBaseUrl) {
    throw new Error("Configuração do Cloudflare R2 incompleta.")
  }

  let imageData: { url: string; isCover: boolean; order: number }[] = []

  try {
    const uploads = input.imageFiles.map(async (file, index) => {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const processedImage = await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer()

      const originalName = file.name || "vehicle-image"
      const safeName = originalName.replace(/\s+/g, "-").toLowerCase()
      const objectKey = `stores/${user.storeId}/vehicles/${Date.now()}-${index}-${safeName}.webp`

      await r2Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: objectKey,
          Body: processedImage,
          ContentType: "image/webp",
        })
      )

      return {
        url: `${publicBaseUrl.replace(/\/$/, "")}/${objectKey}`,
        isCover: index === 0,
        order: index,
      }
    })

    imageData = await Promise.all(uploads)
  } catch (error) {
    console.error("Erro ao processar imagens:", error)
    throw new Error("Falha ao processar ou enviar as imagens para o storage.")
  }

  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        make: input.make,
        model: input.model,
        year: input.year,
        price: input.price,
        km: input.km,
        color: input.color ?? null,
        fuelType: input.fuelType ?? null,
        description: input.description ?? null,
        featured: input.featured ?? false,
        status: input.status ?? "AVAILABLE",
        storeId: user.storeId,
        images: { create: imageData },
      },
      include: { images: true },
    })

    revalidatePath("/admin/estoque")
    revalidatePath("/")
    return vehicle
  } catch (error) {
    console.error("Erro ao salvar veículo:", error)
    throw new Error("Falha ao salvar veículo no banco de dados.")
  }
}

export async function updateVehicleAction(
  input: UpdateVehicleInput
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return { success: false, error: "Não autorizado." }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user?.storeId) {
    return { success: false, error: "Usuário não vinculado a uma loja." }
  }

  // Verifica ownership
  const existing = await prisma.vehicle.findUnique({
    where: { id: input.id },
    select: { storeId: true },
  })

  if (!existing) {
    return { success: false, error: "Veículo não encontrado." }
  }

  if (existing.storeId !== user.storeId) {
    return { success: false, error: "Veículo não pertence à sua loja." }
  }

  try {
    await prisma.vehicle.update({
      where: { id: input.id },
      data: {
        make: input.make,
        model: input.model,
        year: input.year,
        price: input.price,
        km: input.km,
        color: input.color ?? null,
        fuelType: input.fuelType ?? null,
        description: input.description ?? null,
        featured: input.featured ?? false,
        status: input.status ?? "AVAILABLE",
      },
    })

    revalidatePath("/admin/estoque")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error)
    return { success: false, error: "Falha ao atualizar veículo." }
  }
}

function getR2KeyFromImageUrl(imageUrl: string, publicBaseUrl: string): string | null {
  const base = publicBaseUrl.replace(/\/$/, "")
  if (imageUrl.startsWith(base)) {
    return imageUrl.slice(base.length).replace(/^\//, "") || null
  }
  try {
    const pathname = new URL(imageUrl).pathname
    return pathname.startsWith("/") ? pathname.slice(1) : pathname
  } catch {
    return null
  }
}

export async function deleteVehicle(
  vehicleId: string
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return { success: false, error: "Não autorizado." }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user?.storeId) {
    return { success: false, error: "Usuário não vinculado a uma loja." }
  }

  const bucket = process.env.R2_BUCKET_NAME
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL

  let vehicle: { id: string; storeId: string; images: { url: string }[] } | null = null

  try {
    vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { images: true },
    })
  } catch (error) {
    console.error("Erro ao buscar veículo:", error)
    return { success: false, error: "Falha ao buscar veículo." }
  }

  if (!vehicle) return { success: false, error: "Veículo não encontrado." }

  if (vehicle.storeId !== user.storeId) {
    return { success: false, error: "Veículo não pertence à sua loja." }
  }

  if (bucket && publicBaseUrl && vehicle.images.length > 0) {
    try {
      for (const img of vehicle.images) {
        const key = getR2KeyFromImageUrl(img.url, publicBaseUrl)
        if (key) {
          await r2Client.send(
            new DeleteObjectCommand({ Bucket: bucket, Key: key })
          )
        }
      }
    } catch (error) {
      console.error("Erro ao deletar imagens do R2:", error)
    }
  }

  try {
    await prisma.vehicleImage.deleteMany({ where: { vehicleId } })
    await prisma.vehicle.delete({ where: { id: vehicleId } })
  } catch (error) {
    console.error("Erro ao deletar veículo:", error)
    return { success: false, error: "Falha ao remover veículo." }
  }

  revalidatePath("/")
  revalidatePath("/admin/estoque")
  return { success: true }
}