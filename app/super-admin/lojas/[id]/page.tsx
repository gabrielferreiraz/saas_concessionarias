import { notFound } from "next/navigation"
import { prisma } from "@/src/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StoreStatusButton } from "@/components/super-admin/store-status-button"
import { StoreEditForm } from "@/components/super-admin/store-edit-form"
import { ResetPasswordButton } from "@/components/super-admin/reset-password-button"

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "autosstock.uk"

const STATUS_CONFIG = {
  ACTIVE: { label: "Ativa", variant: "default" as const },
  SUSPENDED: { label: "Suspensa", variant: "secondary" as const },
  CANCELLED: { label: "Cancelada", variant: "destructive" as const },
}

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const store = await prisma.store.findUnique({
    where: { id },
    include: {
      users: { select: { id: true, name: true, email: true, role: true, createdAt: true } },
      vehicles: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { images: { take: 1, orderBy: { order: "asc" } } },
      },
      _count: { select: { vehicles: true, leadEvents: true, users: true } },
    },
  })

  if (!store) notFound()

  const cfg = STATUS_CONFIG[store.status]

  const leadStats = await prisma.leadEvent.count({
    where: { storeId: id, createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/super-admin/lojas" className="gap-2">
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{store.name}</h1>
            <Badge variant={cfg.variant}>{cfg.label}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              {store.subdomain}.{rootDomain}
            </code>
          </p>
        </div>
        <StoreStatusButton storeId={store.id} currentStatus={store.status} />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Car className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{store._count.vehicles}</p>
              <p className="text-sm text-muted-foreground">Veículos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <MessageCircle className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{leadStats}</p>
              <p className="text-sm text-muted-foreground">Leads (30 dias)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{store._count.users}</p>
              <p className="text-sm text-muted-foreground">Usuários</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editar dados */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dados da Loja</CardTitle>
          </CardHeader>
          <CardContent>
            <StoreEditForm
              storeId={store.id}
              initialData={{
                name: store.name,
                whatsapp: store.whatsapp,
                primaryColor: store.primaryColor,
              }}
            />
          </CardContent>
        </Card>

        {/* Usuários */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usuários</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {store.users.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum usuário.</p>
            ) : (
              store.users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{user.name ?? user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {user.role}
                    </Badge>
                  </div>
                  <ResetPasswordButton userId={user.id} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Últimos veículos */}
      {store.vehicles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Últimos veículos cadastrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {store.vehicles.map((v) => (
                <div key={v.id} className="flex items-center gap-3 py-3">
                  <div className="text-sm">
                    <p className="font-medium">{v.make} {v.model}</p>
                    <p className="text-muted-foreground">{v.year} · {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(v.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}