import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/src/lib/prisma"
import { resolveCurrentStore } from "@/src/lib/tenant"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { WhatsAppTrackedLink } from "@/components/whatsapp-tracked-link"
import {
  ArrowLeft, MessageCircle, Calendar,
  Gauge, Fuel, Palette,
} from "lucide-react"
import type { Metadata } from "next"

function cleanWhatsApp(raw: string) {
  return raw.replace(/\D/g, "")
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value)
}

function formatKm(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

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

  if (!vehicle) return { title: "Veículo não encontrado" }

  const cover = vehicle.images.find((i) => i.isCover) ?? vehicle.images[0]
  const ogImage = cover?.url
  const title = `${vehicle.make} ${vehicle.model} ${vehicle.year} — ${formatPrice(vehicle.price)} | ${store.name}`
  const description = [
    `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
    `${formatKm(vehicle.km)} km`,
    vehicle.color ? `Cor: ${vehicle.color}` : null,
    vehicle.fuelType ? `Combustível: ${vehicle.fuelType}` : null,
    vehicle.description?.slice(0, 100),
  ].filter(Boolean).join(" · ")

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "autosstock.uk"
  const canonicalUrl = `https://${store.subdomain}.${rootDomain}/veiculo/${id}`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: store.name,
      ...(ogImage && {
        images: [{
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
        }],
      }),
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
  if (!store) notFound()

  const vehicle = await prisma.vehicle.findFirst({
    where: { id, storeId: store.id },
    include: {
      images: { orderBy: { order: "asc" } },
      store: true,
    },
  })

  if (!vehicle) notFound()

  const galleryImages = vehicle.images.map((img) => ({ id: img.id, url: img.url }))
  const coverUrl = vehicle.images.find((i) => i.isCover)?.url
    ?? vehicle.images[0]?.url
    ?? "https://placehold.co/1200x675?text=Sem+foto"

  const whatsappClean = cleanWhatsApp(vehicle.store.whatsapp ?? "")
  const whatsappMessage = `Olá! Vi o anúncio do ${vehicle.make} ${vehicle.model} (${vehicle.year}) no site e gostaria de mais informações.`
  const whatsappHref = whatsappClean.length >= 10
    ? `https://wa.me/${whatsappClean}?text=${encodeURIComponent(whatsappMessage)}`
    : "#"

  // JSON-LD para rich snippets do Google
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "autosstock.uk"
  const canonicalUrl = `https://${store.subdomain}.${rootDomain}/veiculo/${id}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.make} ${vehicle.model}`,
    vehicleModelDate: vehicle.year.toString(),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.km,
      unitCode: "KMT",
    },
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "BRL",
      availability: vehicle.status === "AVAILABLE"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: canonicalUrl,
      seller: {
        "@type": "AutoDealer",
        name: store.name,
      },
    },
    ...(vehicle.color && { color: vehicle.color }),
    ...(vehicle.fuelType && { fuelType: vehicle.fuelType }),
    ...(vehicle.description && { description: vehicle.description }),
    image: vehicle.images.map((i) => i.url),
    url: canonicalUrl,
  }

  const specs = [
    { icon: Calendar, label: "Ano", value: vehicle.year.toString() },
    { icon: Gauge, label: "Quilometragem", value: `${formatKm(vehicle.km)} km` },
    ...(vehicle.color ? [{ icon: Palette, label: "Cor", value: vehicle.color }] : []),
    ...(vehicle.fuelType ? [{ icon: Fuel, label: "Combustível", value: vehicle.fuelType }] : []),
  ]

  return (
    <>
      {/* JSON-LD para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
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
            {/* Galeria */}
            <VehicleGallery
              images={galleryImages}
              make={vehicle.make}
              model={vehicle.model}
              coverUrl={coverUrl}
            />

            {/* Ficha */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {vehicle.make} {vehicle.model}
                </h1>
                <p className="mt-3 text-3xl font-bold sm:text-4xl">
                  {formatPrice(vehicle.price)}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{vehicle.year}</Badge>
                <Badge variant="secondary">{formatKm(vehicle.km)} km</Badge>
                <Badge variant={STATUS_VARIANT[vehicle.status]}>
                  {STATUS_LABEL[vehicle.status] ?? vehicle.status}
                </Badge>
              </div>

              {/* Specs */}
              {specs.length > 0 && (
                <Card>
                  <CardContent className="p-5">
                    <div className="grid grid-cols-2 gap-4">
                      {specs.map((spec) => (
                        <div key={spec.label} className="flex items-start gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <spec.icon className="size-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">{spec.label}</p>
                            <p className="text-sm font-medium capitalize">{spec.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Descrição */}
              {vehicle.description && (
                <Card>
                  <CardHeader>
                    <h2 className="text-base font-semibold">Descrição</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
                      {vehicle.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* CTA WhatsApp */}
              <Button
                asChild
                size="lg"
                className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#20BD5A] sm:w-auto sm:min-w-[240px]"
              >
                <WhatsAppTrackedLink
                  href={whatsappHref}
                  vehicleId={vehicle.id}
                >
                  <MessageCircle className="size-5 shrink-0" />
                  Falar com Consultor
                </WhatsAppTrackedLink>
              </Button>
            </div>
          </div>
        </div>
        {/* Botão flutuante mobile */}
        {whatsappClean.length >= 10 && (
          <WhatsAppTrackedLink
            href={whatsappHref}
            vehicleId={vehicle.id}
            className="fixed bottom-6 right-6 z-50 flex min-h-[44px] min-w-[44px] size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 lg:hidden"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="size-7" />
          </WhatsAppTrackedLink>
        )}
      </main>
    </>
  )
}