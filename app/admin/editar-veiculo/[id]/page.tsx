import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { VehicleForm } from "@/components/vehicle-form"

export default async function EditarVeiculoPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) notFound()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user?.storeId) notFound()

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: params.id },
  })

  // Garante que o veículo pertence à loja do usuário logado
  if (!vehicle || vehicle.storeId !== user.storeId) notFound()

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <VehicleForm
          editVehicle={{
            id: vehicle.id,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            km: vehicle.km,
            price: vehicle.price,
            color: vehicle.color,
            fuelType: vehicle.fuelType,
            featured: vehicle.featured,
            status: vehicle.status as "AVAILABLE" | "RESERVED" | "SOLD",
            description: vehicle.description,
          }}
        />
      </div>
    </main>
  )
}