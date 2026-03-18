import { prisma } from "@/src/lib/prisma"
import { ApproveRejectButtons } from "@/components/super-admin/approve-reject-buttons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle, XCircle, Building2 } from "lucide-react"

const STATUS_CONFIG = {
  PENDING: { label: "Pendente", icon: Clock, variant: "secondary" as const },
  APPROVED: { label: "Aprovado", icon: CheckCircle, variant: "default" as const },
  REJECTED: { label: "Rejeitado", icon: XCircle, variant: "destructive" as const },
}

export default async function SuperAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const statusFilter = params.status as "PENDING" | "APPROVED" | "REJECTED" | undefined

  const requests = await prisma.storeRequest.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: "desc" },
  })

  const counts = await prisma.storeRequest.groupBy({
    by: ["status"],
    _count: true,
  })

  const countMap = counts.reduce(
    (acc, c) => ({ ...acc, [c.status]: c._count }),
    {} as Record<string, number>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Solicitações de Cadastro</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie as solicitações de novas concessionárias
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-2">
      {[
  { label: "Todas", value: undefined },
  { label: "Pendentes", value: "PENDING" },
  { label: "Aprovadas", value: "APPROVED" },
  { label: "Rejeitadas", value: "REJECTED" },
].map((f) => (
  <a
    key={f.label}
    href={f.value ? `/super-admin?status=${f.value}` : "/super-admin"}
  >
    <Badge
      variant={statusFilter === f.value ? "default" : "outline"}
      className="cursor-pointer px-3 py-1 text-sm"
    >
      {f.label}{" "}
      {f.value
        ? `(${countMap[f.value] ?? 0})`
        : `(${Object.values(countMap).reduce((a, b) => a + b, 0)})`}
    </Badge>
  </a>
))}
      </div>

      {/* Lista */}
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
          <Building2 className="size-12 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">Nenhuma solicitação encontrada.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => {
            const cfg = STATUS_CONFIG[req.status]
            const Icon = cfg.icon
            return (
              <Card key={req.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{req.storeName}</h3>
                        <Badge variant={cfg.variant} className="gap-1">
                          <Icon className="size-3" />
                          {cfg.label}
                        </Badge>
                      </div>
                      <div className="grid gap-1 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium text-foreground">Responsável:</span>{" "}
                          {req.name}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">Email:</span>{" "}
                          {req.email}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">WhatsApp:</span>{" "}
                          {req.whatsapp}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">Subdomínio:</span>{" "}
                          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                            {req.subdomain}.autosstock.uk
                          </code>
                        </p>
                        {req.message && (
                          <p>
                            <span className="font-medium text-foreground">Mensagem:</span>{" "}
                            {req.message}
                          </p>
                        )}
                        {req.rejectedNote && (
                          <p className="text-destructive">
                            <span className="font-medium">Motivo rejeição:</span>{" "}
                            {req.rejectedNote}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Solicitado em{" "}
                        {new Date(req.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {req.status === "PENDING" && (
                      <ApproveRejectButtons requestId={req.id} />
                    )}
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