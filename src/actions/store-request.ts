"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcryptjs"
import { storeRequestRateLimit } from "@/src/lib/rate-limit"
import { headers } from "next/headers"

// ─── Formulário da LP (público) ───────────────────────────────────────────────


export async function createStoreRequestAction(input: {
  name: string
  email: string
  whatsapp: string
  storeName: string
  subdomain: string
  message?: string
}): Promise<{ success: true } | { success: false; error: string }> {
  // Rate limiting por IP
  const headerList = await headers()
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"

  const { success: rateLimitOk } = storeRequestRateLimit(`store-request:${ip}`)
  if (!rateLimitOk) {
    return {
      success: false,
      error: "Muitas solicitações. Tente novamente em 1 hora.",
    }
  }

  const subdomain = input.subdomain.toLowerCase().trim().replace(/[^a-z0-9-]/g, "")

  if (!subdomain) {
    return { success: false, error: "Subdomínio inválido." }
  }

  // Verifica se já tem solicitação pendente para esse email ou subdomínio
  const existingRequest = await prisma.storeRequest.findFirst({
    where: {
      OR: [
        { email: input.email, status: "PENDING" },
        { subdomain, status: "PENDING" },
      ],
    },
  })
  if (existingRequest) {
    return {
      success: false,
      error: "Já existe uma solicitação pendente com este email ou subdomínio.",
    }
  }

  await prisma.storeRequest.create({
    data: {
      name: input.name.trim(),
      email: input.email.toLowerCase().trim(),
      whatsapp: input.whatsapp.trim(),
      storeName: input.storeName.trim(),
      subdomain,
      message: input.message?.trim() || null,
    },
  })

  return { success: true }
}

// ─── Aprovar solicitação (SUPER_ADMIN) ────────────────────────────────────────

export async function approveStoreRequestAction(
  requestId: string
): Promise<{ success: true; tempPassword: string } | { success: false; error: string }> {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "SUPER_ADMIN") {
    return { success: false, error: "Não autorizado." }
  }

  const request = await prisma.storeRequest.findUnique({
    where: { id: requestId },
  })

  if (!request) return { success: false, error: "Solicitação não encontrada." }
  if (request.status !== "PENDING") {
    return { success: false, error: "Solicitação já foi processada." }
  }

  // Verifica se subdomínio ainda está livre
  const existingStore = await prisma.store.findUnique({
    where: { subdomain: request.subdomain },
  })
  if (existingStore) {
    return { success: false, error: "Subdomínio já está em uso por outra loja." }
  }

  // Gera senha temporária
  const tempPassword = Math.random().toString(36).slice(-8).toUpperCase()
  const passwordHash = await bcrypt.hash(tempPassword, 12)

  try {
    await prisma.$transaction(async (tx) => {
      // Cria a loja
      const store = await tx.store.create({
        data: {
          name: request.storeName,
          slug: request.subdomain,
          subdomain: request.subdomain,
          whatsapp: request.whatsapp,
          primaryColor: "#000000",
          status: "ACTIVE",
        },
      })

      // Cria o usuário admin da loja
      await tx.user.create({
        data: {
          email: request.email,
          name: request.name,
          password: passwordHash,
          role: "STORE_ADMIN",
          storeId: store.id,
        },
      })

      // Atualiza status da solicitação
      await tx.storeRequest.update({
        where: { id: requestId },
        data: { status: "APPROVED" },
      })
    })

    // TODO: enviar email com credenciais para request.email
    // await sendWelcomeEmail({ to: request.email, tempPassword, subdomain: request.subdomain })

    revalidatePath("/super-admin")
    return { success: true, tempPassword }
  } catch (error) {
    console.error("Erro ao aprovar solicitação:", error)
    return { success: false, error: "Falha ao criar loja. Tente novamente." }
  }
}

// ─── Rejeitar solicitação (SUPER_ADMIN) ───────────────────────────────────────

export async function rejectStoreRequestAction(
  requestId: string,
  note?: string
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "SUPER_ADMIN") {
    return { success: false, error: "Não autorizado." }
  }

  const request = await prisma.storeRequest.findUnique({
    where: { id: requestId },
  })

  if (!request) return { success: false, error: "Solicitação não encontrada." }
  if (request.status !== "PENDING") {
    return { success: false, error: "Solicitação já foi processada." }
  }

  await prisma.storeRequest.update({
    where: { id: requestId },
    data: { status: "REJECTED", rejectedNote: note ?? null },
  })

  revalidatePath("/super-admin")
  return { success: true }
}