import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { BarChart3 } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { AdminLeadsChart } from "@/components/dashboard/admin-leads-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const revalidate = 0

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-muted-foreground">Não autorizado.</p>
      </div>
    )
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

  const storeId = user.storeId

  const now = Date.now()
  const last7 = new Date(now - 7 * 24 * 60 * 60 * 1000)
  const last30 = new Date(now - 30 * 24 * 60 * 60 * 1000)

  const [
    store,
    totalVehicles,
    totalClicks,
    clicksLast7Days,
    clicksLast30Days,
    topVehicles,
    recentClicks7,
    recentClicks30,
  ] = await Promise.all([
    prisma.store.findUnique({
      where: { id: storeId },
      select: { name: true },
    }),
    prisma.vehicle.count({ where: { storeId } }),
    prisma.leadEvent.count({
      where: { storeId, type: "WHATSAPP_CLICK" },
    }),
    prisma.leadEvent.count({
      where: { storeId, type: "WHATSAPP_CLICK", createdAt: { gte: last7 } },
    }),
    prisma.leadEvent.count({
      where: { storeId, type: "WHATSAPP_CLICK", createdAt: { gte: last30 } },
    }),
    prisma.leadEvent.groupBy({
      by: ["vehicleId"],
      where: {
        storeId,
        type: "WHATSAPP_CLICK",
        vehicleId: { not: null },
      },
      _count: { vehicleId: true },
      orderBy: { _count: { vehicleId: "desc" } },
      take: 5,
    }),
    prisma.leadEvent.findMany({
      where: { storeId, type: "WHATSAPP_CLICK", createdAt: { gte: last7 } },
      select: { createdAt: true },
    }),
    prisma.leadEvent.findMany({
      where: { storeId, type: "WHATSAPP_CLICK", createdAt: { gte: last30 } },
      select: { createdAt: true },
    }),
  ])

  const vehicleIds = (topVehicles.map((g) => g.vehicleId).filter(Boolean) ??
    []) as string[]
  const vehicles =
    vehicleIds.length > 0
      ? await prisma.vehicle.findMany({
          where: { id: { in: vehicleIds } },
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            images: {
              select: { url: true, isCover: true, order: true },
              orderBy: [{ isCover: "desc" }, { order: "asc" }],
              take: 1,
            },
          },
        })
      : []
  const vehicleMap = Object.fromEntries(vehicles.map((v) => [v.id, v]))
  const topList = topVehicles
    .filter((g) => g.vehicleId)
    .map((g) => ({
      vehicleId: g.vehicleId!,
      count: g._count.vehicleId,
      vehicle: vehicleMap[g.vehicleId!],
    }))
    .filter((t) => t.vehicle)

  const today = new Date()
  const buildTrend = (days: number, events: { createdAt: Date }[]) => {
    const labels: string[] = []
    const byDay = new Map<string, number>()
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const label = d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })
      labels.push(label)
      byDay.set(label, 0)
    }
    for (const ev of events) {
      const label = ev.createdAt.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })
      if (byDay.has(label)) byDay.set(label, (byDay.get(label) ?? 0) + 1)
    }
    return labels.map((label) => ({ date: label, leads: byDay.get(label) ?? 0 }))
  }

  const trend7 = buildTrend(7, recentClicks7)
  const trend30 = buildTrend(30, recentClicks30)

  const maxClicks = topList.reduce(
    (max, item) => (item.count > max ? item.count : max),
    0
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão geral do seu estoque e performance de leads
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="deep">Análise Detalhada</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total de Veículos"
              value={totalVehicles}
              iconName="car"
            />
            <StatCard
              title="Cliques no WhatsApp (Total)"
              value={totalClicks}
              iconName="messageCircle"
              description="Todos os cliques registrados"
            />
          </div>
        </TabsContent>

        <TabsContent value="deep" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard
                  title="Cliques nos últimos 30 dias"
                  value={clicksLast30Days}
                  iconName="messageCircle"
                  description="Últimos 30 dias"
                />
              </div>
              <AdminLeadsChart
                title="Tendência de cliques (Últimos 7 dias)"
                data={trend7}
              />
              <AdminLeadsChart
                title="Tendência de cliques (Últimos 30 dias)"
                data={trend30}
              />
            </div>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="size-5 text-muted-foreground" />
                  <CardTitle className="text-base font-medium">
                    Top 5 veículos — cliques WhatsApp
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {topList.length === 0 || maxClicks === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    Nenhum clique por veículo ainda.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {topList.map((item) => {
                      const vehicle = item.vehicle
                      const imageUrl =
                        vehicle.images[0]?.url ??
                        "https://placehold.co/160x90?text=Sem+foto"
                      const percent = (item.count / maxClicks) * 100

                      return (
                        <li key={item.vehicleId}>
                          <Link
                            href={`/veiculo/${item.vehicleId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-3 rounded-md p-2 transition-colors hover:bg-muted/60"
                          >
                            <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                              <Image
                                src={imageUrl}
                                alt={`${vehicle.make} ${vehicle.model}`}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-foreground">
                                    {vehicle.make} {vehicle.model}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {vehicle.year}
                                  </p>
                                </div>
                                <span className="shrink-0 text-xs font-semibold text-primary">
                                  {item.count}{" "}
                                  {item.count === 1 ? "clique" : "cliques"}
                                </span>
                              </div>
                              <Progress
                                value={percent}
                                className="h-1.5 bg-muted/80"
                              />
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
