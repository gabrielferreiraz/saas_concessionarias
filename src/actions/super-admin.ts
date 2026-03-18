"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcryptjs"

async function assertSuperAdmin() {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Não autorizado.")
  }
}

export async function updateStoreStatusAction(
  storeId: string,
  status: "ACTIVE" | "SUSPENDED" | "CANCELLED"
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await assertSuperAdmin()
    await prisma.store.update({ where: { id: storeId }, data: { status } })
    revalidatePath("/super-admin/lojas")
    revalidatePath(`/super-admin/lojas/${storeId}`)
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Erro." }
  }
}

export async function updateStoreDataAction(
  storeId: string,
  input: { name: string; whatsapp: string; primaryColor: string }
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await assertSuperAdmin()
    await prisma.store.update({
      where: { id: storeId },
      data: {
        name: input.name.trim(),
        whatsapp: input.whatsapp.trim(),
        primaryColor: input.primaryColor.trim() || "#000000",
      },
    })
    revalidatePath("/super-admin/lojas")
    revalidatePath(`/super-admin/lojas/${storeId}`)
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Erro." }
  }
}

export async function resetStoreUserPasswordAction(
  userId: string
): Promise<{ success: true; tempPassword: string } | { success: false; error: string }> {
  try {
    await assertSuperAdmin()
    const tempPassword = Math.random().toString(36).slice(-8).toUpperCase()
    const hash = await bcrypt.hash(tempPassword, 12)
    await prisma.user.update({ where: { id: userId }, data: { password: hash } })
    // TODO: enviar email com nova senha
    return { success: true, tempPassword }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Erro." }
  }
}