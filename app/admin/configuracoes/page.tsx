import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { StoreSettingsForm } from "@/components/store-settings-form"

export default async function ConfiguracoesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user?.storeId) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-muted-foreground">
          Erro: Usuário não vinculado a uma loja.
        </p>
      </div>
    )
  }

  const store = await prisma.store.findUnique({
    where: { id: user.storeId },
    select: {
      name: true,
      whatsapp: true,
      primaryColor: true,
      logoUrl: true,
    },
  })

  if (!store) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-muted-foreground">Loja não encontrada.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Configurações da loja
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edite o nome da loja, WhatsApp, cor e logo
        </p>
      </div>

      <StoreSettingsForm
        initialValues={{
          name: store.name,
          whatsapp: store.whatsapp,
          primaryColor: store.primaryColor ?? "#000000",
          logoUrl: store.logoUrl ?? "",
        }}
      />
    </div>
  )
}
