import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { redirect } from "next/navigation"
import { LeadsClient } from "@/components/leads/leads-client"

export const revalidate = 0

export default async function LeadsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user?.storeId) redirect("/login")

  const leads = await prisma.leadEvent.findMany({
    where: { storeId: user.storeId, type: "WHATSAPP_CLICK" },
    include: {
      vehicle: {
        include: {
          images: { orderBy: { order: "asc" }, take: 1 },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  const serialized = leads.map((lead) => ({
    id: lead.id,
    contactName: lead.contactName ?? null,
    contactPhone: lead.contactPhone ?? null,
    attendanceStatus: lead.attendanceStatus as "PENDING" | "IN_PROGRESS" | "DONE",
    assignedTo: lead.assignedTo ?? null,
    createdAt: lead.createdAt.toISOString(),
    vehicle: lead.vehicle
      ? {
        id: lead.vehicle.id,
        make: lead.vehicle.make,
        model: lead.vehicle.model,
        year: lead.vehicle.year,
        price: lead.vehicle.price,
        km: lead.vehicle.km,
        image: lead.vehicle.images[0]?.url ?? null,
      }
      : null,
  }))

  return <LeadsClient leads={serialized} storeId={user.storeId} />
}