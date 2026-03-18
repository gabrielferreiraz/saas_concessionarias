"use server"

import { prisma } from "@/src/lib/prisma"
import { resolveCurrentStore } from "@/src/lib/tenant"

export async function trackLeadClick(vehicleId?: string) {
  try {
    const store = await resolveCurrentStore()
    if (!store) return

    // Se veio vehicleId, valida que o veículo pertence à loja atual
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
    // Silencioso: não atrapalha a experiência do usuário
  }
}