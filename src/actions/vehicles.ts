 "use server";

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { r2Client } from "@/src/lib/r2";

type CreateVehicleInput = {
  make: string;
  model: string;
  year: number;
  price: number;
  km: number;
  description?: string;
  featured?: boolean;
  status?: "AVAILABLE" | "RESERVED" | "SOLD";
  imageFiles: File[];
};

export async function createVehicleAction(input: CreateVehicleInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Não autorizado. Faça login para continuar.");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || !user.storeId) {
    throw new Error("Usuário inválido ou não vinculado a uma loja.");
  }

  if (!input.imageFiles || input.imageFiles.length === 0) {
    throw new Error("Selecione pelo menos uma imagem para cadastrar o veículo.");
  }

  if (input.imageFiles.length > 10) {
    throw new Error("Você pode enviar no máximo 10 imagens por veículo.");
  }

  const bucket = process.env.R2_BUCKET_NAME;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

  if (!bucket || !publicBaseUrl) {
    throw new Error("Configuração do Cloudflare R2 incompleta (R2_BUCKET_NAME/R2_PUBLIC_BASE_URL).");
  }

  let imageData: { url: string; isCover: boolean; order: number }[] = [];

  try {
    const uploads = input.imageFiles.map(async (file, index) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const processedImage = await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      const originalName = file.name || "vehicle-image";
      const safeName = originalName.replace(/\s+/g, "-").toLowerCase();

      const objectKey = `stores/${user.storeId}/vehicles/${Date.now()}-${index}-${safeName}.webp`;

      await r2Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: objectKey,
          Body: processedImage,
          ContentType: "image/webp",
        })
      );

      const url = `${publicBaseUrl.replace(/\/$/, "")}/${objectKey}`;

      return {
        url,
        isCover: index === 0,
        order: index,
      };
    });

    imageData = await Promise.all(uploads);
  } catch (error) {
    console.error("Erro ao processar ou enviar as imagens para o R2:", error);
    throw new Error("Falha ao processar ou enviar as imagens para o storage.");
  }

  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        make: input.make,
        model: input.model,
        year: input.year,
        price: input.price,
        km: input.km,
        description: input.description,
        featured: input.featured ?? false,
        status: input.status ?? "AVAILABLE",
        storeId: user.storeId,
        images: {
          create: imageData,
        },
      },
      include: {
        images: true,
      },
    });

    return vehicle;
  } catch (error) {
    console.error("Erro ao salvar veículo no banco de dados:", error);
    throw new Error("Falha ao salvar veículo no banco de dados.");
  }
}

/**
 * Extrai a Key do objeto R2 a partir da URL pública da imagem.
 * A URL é no formato: baseUrl + "/" + key (ex: https://pub-xxx.r2.dev/stores/xxx/vehicles/1.webp)
 */
function getR2KeyFromImageUrl(imageUrl: string, publicBaseUrl: string): string | null {
  const base = publicBaseUrl.replace(/\/$/, "");
  if (imageUrl.startsWith(base)) {
    return imageUrl.slice(base.length).replace(/^\//, "") || null;
  }
  try {
    const pathname = new URL(imageUrl).pathname;
    return pathname.startsWith("/") ? pathname.slice(1) : pathname;
  } catch {
    return null;
  }
}

export async function deleteVehicle(vehicleId: string): Promise<{ success: true } | { success: false; error: string }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, error: "Não autorizado. Faça login para continuar." };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || !user.storeId) {
    return { success: false, error: "Usuário inválido ou não vinculado a uma loja." };
  }

  const bucket = process.env.R2_BUCKET_NAME;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

  let vehicle: { id: string; storeId: string; images: { url: string }[] } | null = null;

  try {
    vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { images: true },
    });
  } catch (error) {
    console.error("Erro ao buscar veículo para exclusão:", error);
    return { success: false, error: "Falha ao buscar veículo." };
  }

  if (!vehicle) {
    return { success: false, error: "Veículo não encontrado." };
  }

  if (vehicle.storeId !== user.storeId) {
    return { success: false, error: "Veículo não pertence à loja atual." };
  }

  if (bucket && publicBaseUrl && vehicle.images.length > 0) {
    try {
      for (const img of vehicle.images) {
        const key = getR2KeyFromImageUrl(img.url, publicBaseUrl);
        if (key) {
          await r2Client.send(
            new DeleteObjectCommand({
              Bucket: bucket,
              Key: key,
            })
          );
        }
      }
    } catch (error) {
      console.error("Erro ao deletar imagens do R2 (continuando com exclusão no banco):", error);
      // Não falhamos a operação: removemos do banco para evitar órfãos de referência; as imagens podem ser limpas manualmente no R2
    }
  }

  try {
    await prisma.vehicleImage.deleteMany({ where: { vehicleId } });
    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });
  } catch (error) {
    console.error("Erro ao deletar veículo no banco:", error);
    return { success: false, error: "Falha ao remover veículo do banco de dados." };
  }

  revalidatePath("/");
  revalidatePath("/admin/estoque");
  return { success: true };
}

