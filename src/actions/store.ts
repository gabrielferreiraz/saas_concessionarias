"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export type UpdateStoreInput = {
  name: string;
  whatsapp: string;
  primaryColor: string;
  logoUrl: string;
};

export async function updateStoreAction(
  input: UpdateStoreInput
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, error: "Não autorizado. Faça login para continuar." };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user?.storeId) {
    return { success: false, error: "Usuário não vinculado a uma loja." };
  }

  const name = input.name.trim();
  const whatsapp = input.whatsapp.trim();
  if (!name) return { success: false, error: "Nome da loja é obrigatório." };
  if (!whatsapp) return { success: false, error: "WhatsApp de contato é obrigatório." };

  const hexRegex = /^#[0-9A-Fa-f]{6}$/;
  const primaryColor = input.primaryColor.trim();
  if (primaryColor && !hexRegex.test(primaryColor)) {
    return { success: false, error: "Cor primária deve ser um hexadecimal (ex: #000000)." };
  }

  try {
    await prisma.store.update({
      where: { id: user.storeId },
      data: {
        name,
        whatsapp,
        primaryColor: primaryColor || "#000000",
        logoUrl: input.logoUrl.trim() || null,
      },
    });
  } catch (e) {
    console.error("Erro ao atualizar loja:", e);
    return { success: false, error: "Falha ao salvar alterações." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/configuracoes");
  revalidatePath("/");
  return { success: true };
}
