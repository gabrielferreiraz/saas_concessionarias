import Link from "next/link"
import { prisma } from "@/src/lib/prisma"
import { resolveCurrentStore } from "@/src/lib/tenant"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { WhatsAppTrackedLink } from "@/components/whatsapp-tracked-link"
import { ArrowLeft, MessageCircle } from "lucide-react"
import type { Metadata } from "next"

function cleanWhatsAppNumber(raw: string): string {
  return raw.replace(/\D/g, "")
}

function formatPriceForMeta(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const store = await resolveCurrentStore()
  if (!store) return { title: "Loja não encontrada" }

  const vehicle = await prisma.vehicle.findFirst({
    where: { id, storeId: store.id },
    include: { images: { orderBy: { order: "asc" } } },
  })

  if (!vehicle) {
    return { title: "Veículo não encontrado" }
  }

  const cover =
    vehicle.images.find((i) => i.isCover) ?? vehicle.images[0]
  const ogImage = cover?.url ?? undefined
  const title = `${vehicle.make} ${vehicle.model} - ${formatPriceForMeta(vehicle.price)}`
  const formatKm = (v: number) =>
    new Intl.NumberFormat("pt-BR").format(v)
  const descriptionShort = vehicle.description
    ? vehicle.description.slice(0, 160).replace(/\n/g, " ").trim() + (vehicle.description.length > 160 ? "…" : "")
    : ""
  const description = [vehicle.year, `${formatKm(vehicle.km)} km`, descriptionShort].filter(Boolean).join(" | ")

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: `${vehicle.make} ${vehicle.model}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

export default async function VehicleDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const store = await resolveCurrentStore()

  if (!store) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 py-16 text-center">
            <h1 className="text-xl font-semibold text-foreground">
              Loja não encontrada
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Verifique o endereço ou entre em contato com o suporte.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const vehicle = await prisma.vehicle.findFirst({
    where: { id, storeId: store.id },
    include: {
      images: { orderBy: { order: "asc" } },
      store: true,
    },
  })

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 py-16 text-center">
            <h1 className="text-xl font-semibold text-foreground">
              Veículo não encontrado ou indisponível
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              O anúncio pode ter sido removido ou o link está incorreto.
            </p>
            <Button asChild className="mt-6">
              <Link href="/" className="gap-2">
                <ArrowLeft className="size-4" />
                Voltar para o estoque
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  const formatKm = (value: number) =>
    new Intl.NumberFormat("pt-BR").format(value)

  const coverImage = vehicle.images.find((i) => i.isCover) ?? vehicle.images[0]
  const coverUrl = coverImage?.url ?? "https://placehold.co/1200x675?text=Sem+foto"
  const galleryImages = vehicle.images.map((img) => ({ id: img.id, url: img.url }))

  const whatsappRaw = vehicle.store.whatsapp ?? ""
  const whatsappClean = cleanWhatsAppNumber(whatsappRaw)
  const message = `Olá! Vi o anúncio do ${vehicle.make} ${vehicle.model} (${vehicle.year}) no site e gostaria de mais informações.`
  const whatsappHref =
    whatsappClean.length >= 10
      ? `https://wa.me/${whatsappClean}?text=${encodeURIComponent(message)}`
      : "#"

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Voltar para o estoque
            </Link>
            <span className="text-xs text-muted-foreground">
              Ref: #{vehicle.id.slice(-6).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Galeria interativa */}
          <VehicleGallery
            images={galleryImages}
            make={vehicle.make}
            model={vehicle.model}
            coverUrl={coverUrl}
          />

          {/* Ficha técnica */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {vehicle.make} {vehicle.model}
              </h1>
              <p className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                {formatPrice(vehicle.price)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{vehicle.year}</Badge>
              <Badge variant="secondary">{formatKm(vehicle.km)} km</Badge>
              <Badge variant="outline">{vehicle.status}</Badge>
            </div>

            {vehicle.description && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-foreground">
                    Descrição
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
                    {vehicle.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* CTA WhatsApp — área de toque mínima 44x44px */}
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="min-h-[44px] min-w-[44px] w-full gap-2 bg-[#25D366] py-3 text-white hover:bg-[#20BD5A] sm:w-auto sm:min-w-[240px]"
              >
                <WhatsAppTrackedLink
                  href={whatsappHref}
                  vehicleId={vehicle.id}
                  aria-label="Falar com consultor no WhatsApp"
                  className="inline-flex min-h-[44px] items-center justify-center"
                >
                  <MessageCircle className="size-5 shrink-0" />
                  Falar com Consultor
                </WhatsAppTrackedLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
