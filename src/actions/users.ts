"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcryptjs"

async function assertStoreAdmin() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Não autorizado.")
    if (session.user.role !== "STORE_ADMIN") throw new Error("Apenas admins podem gerenciar usuários.")
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })
    if (!user?.storeId) throw new Error("Usuário não vinculado a uma loja.")
    return { session, user }
}

export async function createStoreUserAction(input: {
    name: string
    email: string
    password: string
}): Promise<{ success: true } | { success: false; error: string }> {
    try {
        const { user } = await assertStoreAdmin()

        const existing = await prisma.user.findUnique({
            where: { email: input.email.toLowerCase().trim() },
        })
        if (existing) {
            return { success: false, error: "Este email já está em uso." }
        }

        const hash = await bcrypt.hash(input.password, 12)

        await prisma.user.create({
            data: {
                name: input.name.trim(),
                email: input.email.toLowerCase().trim(),
                password: hash,
                role: "STORE_USER",
                storeId: user.storeId,
            },
        })

        revalidatePath("/admin/usuarios")
        return { success: true }
    } catch (e) {
        return { success: false, error: e instanceof Error ? e.message : "Erro." }
    }
}

export async function deleteStoreUserAction(
    userId: string
): Promise<{ success: true } | { success: false; error: string }> {
    try {
        const { user } = await assertStoreAdmin()

        const target = await prisma.user.findUnique({
            where: { id: userId },
            select: { storeId: true, role: true },
        })

        if (!target || target.storeId !== user.storeId) {
            return { success: false, error: "Usuário não encontrado." }
        }

        if (target.role === "STORE_ADMIN") {
            return { success: false, error: "Não é possível remover o admin da loja." }
        }

        await prisma.user.delete({ where: { id: userId } })
        revalidatePath("/admin/usuarios")
        return { success: true }
    } catch (e) {
        return { success: false, error: e instanceof Error ? e.message : "Erro." }
    }
}

export async function resetStoreUserPasswordByAdminAction(
    userId: string,
    newPassword: string
): Promise<{ success: true } | { success: false; error: string }> {
    try {
        const { user } = await assertStoreAdmin()

        const target = await prisma.user.findUnique({
            where: { id: userId },
            select: { storeId: true },
        })

        if (!target || target.storeId !== user.storeId) {
            return { success: false, error: "Usuário não encontrado." }
        }

        const hash = await bcrypt.hash(newPassword, 12)
        await prisma.user.update({
            where: { id: userId },
            data: { password: hash },
        })

        revalidatePath("/admin/usuarios")
        return { success: true }
    } catch (e) {
        return { success: false, error: e instanceof Error ? e.message : "Erro." }
    }
}