"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prisma"
import { resolveCurrentStore } from "@/src/lib/tenant"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"

export async function trackLeadClick(vehicleId?: string) {
  try {
    const store = await resolveCurrentStore()
    if (!store) return

    let validatedVehicleId: string | null = null
    if (vehicleId) {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId, storeId: store.id },
        select: { id: true },
      })
      validatedVehicleId = vehicle?.id ?? null
    }

    await prisma.leadEvent.create({
      data: {
        storeId: store.id,
        vehicleId: validatedVehicleId,
        type: "WHATSAPP_CLICK",
      },
    })
  } catch {
    // silencioso
  }
}

export async function updateLeadStatusAction(
  leadId: string,
  attendanceStatus: "PENDING" | "IN_PROGRESS" | "DONE"
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

  const lead = await prisma.leadEvent.findUnique({
    where: { id: leadId },
    select: { storeId: true },
  })

  if (!lead || lead.storeId !== user.storeId) {
    return { success: false, error: "Lead não encontrado." }
  }

  await prisma.leadEvent.update({
    where: { id: leadId },
    data: { attendanceStatus },
  })

  revalidatePath("/admin/leads")
  return { success: true }
}

export async function updateLeadAssigneeAction(
  leadId: string,
  assignedTo: string
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

  const lead = await prisma.leadEvent.findUnique({
    where: { id: leadId },
    select: { storeId: true },
  })

  if (!lead || lead.storeId !== user.storeId) {
    return { success: false, error: "Lead não encontrado." }
  }

  await prisma.leadEvent.update({
    where: { id: leadId },
    data: { assignedTo },
  })

  revalidatePath("/admin/leads")
  return { success: true }
}