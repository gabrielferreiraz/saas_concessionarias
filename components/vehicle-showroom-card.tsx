import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface VehicleShowroomCardProps {
  id: string
  make: string
  model: string
  year: number
  price: number
  km: number
  status: string
  coverImageUrl: string
}

export function VehicleShowroomCard({
  id,
  make,
  model,
  year,
  price,
  km,
  status,
  coverImageUrl,
}: VehicleShowroomCardProps) {
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
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
      <Link href={`/veiculo/${id}`} className="block flex-1">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={coverImageUrl}
            alt={`${make} ${model}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-xs">
              {year}
            </Badge>
            <Badge variant="outline" className="border-background/80 bg-background/60 text-xs backdrop-blur-sm">
              {formatKm(km)} km
            </Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h2 className="font-semibold tracking-tight text-foreground">
            {make}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{model}</p>
          <p className="mt-3 text-lg font-medium text-primary">
            {formatPrice(price)}
          </p>
        </div>
      </Link>
      <div className="border-t border-border px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
          asChild
        >
          <Link href={`/veiculo/${id}`}>
            Ver detalhes
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </article>
  )
}
