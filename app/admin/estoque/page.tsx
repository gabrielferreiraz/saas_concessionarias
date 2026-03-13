import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DeleteVehicleButton } from "@/components/delete-vehicle-button"
import { Car, ExternalLink, Plus, FileDown } from "lucide-react"

export default async function AdminEstoquePage() {
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

  const vehicles = await prisma.vehicle.findMany({
    where: { storeId: user.storeId },
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  })

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  const formatKm = (value: number) =>
    new Intl.NumberFormat("pt-BR").format(value)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Gestão de Estoque
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {vehicles.length} {vehicles.length === 1 ? "veículo" : "veículos"} no estoque
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
              Novo veículo
            </Link>
          </Button>
        </div>
      </div>

      {vehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 py-16">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <Car className="size-7 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-lg font-medium text-foreground">
            Nenhum veículo cadastrado
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Adicione o primeiro veículo para aparecer aqui.
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/novo-veiculo" className="gap-2">
              <Plus className="size-4" />
              Novo veículo
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Foto</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead className="text-right">KM</TableHead>
                <TableHead className="w-[100px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => {
                const coverImage =
                  vehicle.images.find((i) => i.isCover) ?? vehicle.images[0]
                const imageUrl =
                  coverImage?.url ??
                  "https://placehold.co/80x60?text=Sem+foto"

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
                    <TableCell className="font-medium">{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
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
                          aria-label="Gerar flyer (PDF)"
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
                          aria-label="Ver anúncio em nova aba"
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
