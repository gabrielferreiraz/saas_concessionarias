import { prisma } from "@/src/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Store, ExternalLink, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StoreStatusButton } from "@/components/super-admin/store-status-button"

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "autosstock.uk"

const STATUS_CONFIG = {
  ACTIVE: { label: "Ativa", variant: "default" as const },
  SUSPENDED: { label: "Suspensa", variant: "secondary" as const },
  CANCELLED: { label: "Cancelada", variant: "destructive" as const },
}

export default async function SuperAdminLojasPage() {
  const stores = await prisma.store.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { vehicles: true, users: true, leadEvents: true } },
    },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Lojas Cadastradas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {stores.length} {stores.length === 1 ? "loja" : "lojas"} no total
        </p>
      </div>

      {stores.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
          <Store className="size-12 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">Nenhuma loja cadastrada.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {stores.map((store) => {
            const cfg = STATUS_CONFIG[store.status]
            return (
              <Card key={store.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{store.name}</h3>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                          {store.subdomain}.{rootDomain}
                        </code>
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{store._count.vehicles} veículos</span>
                        <span>{store._count.users} usuários</span>
                        <span>{store._count.leadEvents} leads</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <StoreStatusButton
                        storeId={store.id}
                        currentStatus={store.status}
                      />
                      <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link href={`/super-admin/lojas/${store.id}`}>
                          <Eye className="size-4" />
                          Detalhes
                        </Link>
                      </Button>
                      
                      <a
                        href={`https://${store.subdomain}.${rootDomain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="size-4" />
                        Ver showroom
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}