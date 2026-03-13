import { VehicleForm } from "@/components/vehicle-form"

export const metadata = {
  title: "Novo Veículo | Premium Motors Admin",
  description: "Adicionar novo veículo ao estoque",
}

export default function NovoVeiculoPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <VehicleForm />
      </div>
    </main>
  )
}
