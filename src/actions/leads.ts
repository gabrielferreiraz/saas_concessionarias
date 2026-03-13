"use server";

import { prisma } from "@/src/lib/prisma";
import { resolveCurrentStore } from "@/src/lib/tenant";

export async function trackLeadClick(vehicleId?: string) {
  try {
    let storeId: string | null = null;

    if (vehicleId) {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
        select: { storeId: true },
      });
      storeId = vehicle?.storeId ?? null;
    }

    if (!storeId) {
      const store = await resolveCurrentStore();
      storeId = store?.id ?? null;
    }

    if (!storeId) return;

    await prisma.leadEvent.create({
      data: {
        storeId,
        vehicleId: vehicleId ?? null,
        type: "WHATSAPP_CLICK",
      },
    });
  } catch {
    // Silencioso: não atrapalha a experiência do usuário
  }
}
