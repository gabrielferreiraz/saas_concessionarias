import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DeleteVehicleButton } from "@/components/delete-vehicle-button"
import { Car, ExternalLink, Plus, FileDown, Pencil } from "lucide-react"

const STATUS_LABEL: Record<string, string> = {
  AVAILABLE: "Disponível",
  RESERVED: "Reservado",
  SOLD: "Vendido",
}

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  AVAILABLE: "default",
  RESERVED: "secondary",
  SOLD: "destructive",
}

export default async function AdminEstoquePage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
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
        <p className="text-muted-foreground">Usuário não vinculado a uma loja.</p>
      </div>
    )
  }

  const statusFilter = searchParams?.status as "AVAILABLE" | "RESERVED" | "SOLD" | undefined

  const vehicles = await prisma.vehicle.findMany({
    where: {
      storeId: user.storeId,
      ...(statusFilter ? { status: statusFilter } : {}),
    },
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  })

  const allVehicles = await prisma.vehicle.groupBy({
    by: ["status"],
    where: { storeId: user.storeId },
    _count: true,
  })

  const countByStatus = allVehicles.reduce(
    (acc, v) => ({ ...acc, [v.status]: v._count }),
    {} as Record<string, number>
  )

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value)

  const formatKm = (value: number) =>
    new Intl.NumberFormat("pt-BR").format(value)

  const totalVehicles = Object.values(countByStatus).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gestão de Estoque</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalVehicles} {totalVehicles === 1 ? "veículo" : "veículos"} no total
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/flyer/estoque" className="gap-2">
              <FileDown className="size-4" />
              Gerar Catálogo
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/novo-veiculo" className="gap-2">
              <Plus className="size-4" />
              Novo Veículo
            </Link>
          </Button>
        </div>
      </div>

      {/* Filtros por status */}
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/estoque">
          <Badge
            variant={!statusFilter ? "default" : "outline"}
            className="cursor-pointer px-3 py-1 text-sm"
          >
            Todos ({totalVehicles})
          </Badge>
        </Link>
        {(["AVAILABLE", "RESERVED", "SOLD"] as const).map((s) => (
          <Link key={s} href={`/admin/estoque?status=${s}`}>
            <Badge
              variant={statusFilter === s ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-sm"
            >
              {STATUS_LABEL[s]} ({countByStatus[s] ?? 0})
            </Badge>
          </Link>
        ))}
      </div>

      {/* Tabela */}
      {vehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <Car className="size-7 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-lg font-medium">Nenhum veículo encontrado</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {statusFilter
              ? "Nenhum veículo com esse status."
              : "Adicione o primeiro veículo para aparecer aqui."}
          </p>
          {!statusFilter && (
            <Button asChild className="mt-4">
              <Link href="/admin/novo-veiculo" className="gap-2">
                <Plus className="size-4" />
                Novo Veículo
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Foto</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead className="text-right">KM</TableHead>
                <TableHead className="w-[120px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => {
                const coverImage =
                  vehicle.images.find((i) => i.isCover) ?? vehicle.images[0]
                const imageUrl =
                  coverImage?.url ?? "https://placehold.co/80x60?text=Sem+foto"

                return (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <div className="relative size-14 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={imageUrl}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                      {vehicle.color && (
                        <p className="text-xs text-muted-foreground capitalize">{vehicle.color}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[vehicle.status]}>
                        {STATUS_LABEL[vehicle.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatPrice(vehicle.price)}
                    </TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell className="text-right">
                      {formatKm(vehicle.km)} km
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                          aria-label="Editar veículo"
                          asChild
                        >
                          <Link href={`/admin/editar-veiculo/${vehicle.id}`}>
                            <Pencil className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                          aria-label="Gerar flyer"
                          asChild
                        >
                          <Link href={`/admin/flyer/${vehicle.id}`}>
                            <FileDown className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                          aria-label="Ver anúncio"
                          asChild
                        >
                          <Link
                            href={`/veiculo/${vehicle.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="size-4" />
                          </Link>
                        </Button>
                        <DeleteVehicleButton
                          vehicleId={vehicle.id}
                          vehicleLabel={`${vehicle.make} ${vehicle.model}`}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}