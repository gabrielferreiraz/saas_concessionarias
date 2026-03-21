import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/src/lib/prisma"
import { resolveCurrentStore } from "@/src/lib/tenant"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { WhatsAppTrackedLink } from "@/components/whatsapp-tracked-link"
import {
  ArrowLeft, MessageCircle, Calendar, Gauge,
  Fuel, Palette, Cog, Sun, Sofa, Shield,
  Mountain, Monitor, Camera, Navigation,
  Wind, ParkingCircle, Lightbulb, Check,
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

const OPTION_ICONS: Record<string, React.ElementType> = {
  "teto-solar": Sun,
  "bancos-couro": Sofa,
  "blindado": Shield,
  "tracao-4x4": Mountain,
  "multimidia": Monitor,
  "camera-re": Camera,
  "piloto-automatico": Navigation,
  "ar-digital": Wind,
  "sensor-estacionamento": ParkingCircle,
  "farois-led": Lightbulb,
}

const OPTION_LABELS: Record<string, string> = {
  "teto-solar": "Teto Solar",
  "bancos-couro": "Bancos em Couro",
  "blindado": "Blindado",
  "tracao-4x4": "Tração 4x4",
  "multimidia": "Multimídia",
  "camera-re": "Câmera de Ré",
  "piloto-automatico": "Piloto Automático",
  "ar-digital": "Ar Digital",
  "sensor-estacionamento": "Sensor de Estacionamento",
  "farois-led": "Faróis LED",
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
        images: [{ url: ogImage, width: 1200, height: 630, alt: `${vehicle.make} ${vehicle.model}` }],
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

  // Veículos relacionados (mesma marca, exceto o atual)
  const related = await prisma.vehicle.findMany({
    where: {
      storeId: store.id,
      status: "AVAILABLE",
      make: vehicle.make,
      id: { not: vehicle.id },
    },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
    take: 4,
  })

  const galleryImages = vehicle.images.map((img) => ({ id: img.id, url: img.url }))
  const coverUrl = vehicle.images.find((i) => i.isCover)?.url
    ?? vehicle.images[0]?.url
    ?? "https://placehold.co/1200x675?text=Sem+foto"

  const whatsappClean = cleanWhatsApp(vehicle.store.whatsapp ?? "")
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "autosstock.uk"
  const vehicleUrl = `https://${store.subdomain}.${rootDomain}/veiculo/${vehicle.id}`
  const whatsappMessage = `Olá! Vi o ${vehicle.make} ${vehicle.model} (${vehicle.year}) e tenho interesse. Veja o anúncio: ${vehicleUrl}`
  const whatsappHref = whatsappClean.length >= 10
    ? `https://wa.me/${whatsappClean}?text=${encodeURIComponent(whatsappMessage)}`
    : "#"

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
      url: vehicleUrl,
      seller: { "@type": "AutoDealer", name: store.name },
    },
    ...(vehicle.color && { color: vehicle.color }),
    ...(vehicle.fuelType && { fuelType: vehicle.fuelType }),
    ...(vehicle.description && { description: vehicle.description }),
    image: vehicle.images.map((i) => i.url),
    url: vehicleUrl,
  }

  const specs = [
    { icon: Calendar, label: "Ano", value: vehicle.year.toString() },
    { icon: Gauge, label: "Quilometragem", value: `${formatKm(vehicle.km)} km` },
    ...(vehicle.color ? [{ icon: Palette, label: "Cor", value: vehicle.color }] : []),
    ...(vehicle.fuelType ? [{ icon: Fuel, label: "Combustível", value: vehicle.fuelType }] : []),
    ...(vehicle.transmission ? [{ icon: Cog, label: "Câmbio", value: vehicle.transmission }] : []),
  ]

  // Opcionais salvos na descrição como JSON ou lista separada por vírgula
  const optionals: string[] = vehicle.description
    ? Object.keys(OPTION_LABELS).filter((key) =>
      vehicle.description?.toLowerCase().includes(key)
    )
    : []

  return (
    <>
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
                  <CardHeader className="pb-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Especificações
                    </h2>
                  </CardHeader>
                  <CardContent className="pt-0">
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

              {/* Opcionais */}
              {optionals.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Opcionais
                    </h2>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-3">
                      {optionals.map((key) => {
                        const Icon = OPTION_ICONS[key] ?? Check
                        return (
                          <div key={key} className="flex items-center gap-2 text-sm">
                            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                              <Icon className="size-3.5 text-primary" />
                            </div>
                            <span>{OPTION_LABELS[key]}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Descrição */}
              {vehicle.description && (
                <Card>
                  <CardHeader className="pb-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Descrição
                    </h2>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
                      {vehicle.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* CTA desktop */}
              <Button
                asChild
                size="lg"
                className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#20BD5A] sm:w-auto sm:min-w-[240px]"
              >
                <WhatsAppTrackedLink href={whatsappHref} vehicleId={vehicle.id}>
                  <MessageCircle className="size-5 shrink-0" />
                  Falar com Consultor
                </WhatsAppTrackedLink>
              </Button>
            </div>
          </div>

          {/* Veículos relacionados */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-xl font-semibold">
                Outros {vehicle.make} disponíveis
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((v) => {
                  const img = v.images[0]?.url ?? "https://placehold.co/400x250?text=Sem+foto"
                  return (
                    <Link
                      key={v.id}
                      href={`/veiculo/${v.id}`}
                      className="group rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-video bg-muted">
                        <Image
                          src={img}
                          alt={`${v.make} ${v.model}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 25vw"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-medium">{v.make} {v.model}</p>
                        <p className="text-sm text-muted-foreground">{v.year} · {formatKm(v.km)} km</p>
                        <p className="mt-2 font-bold text-foreground">{formatPrice(v.price)}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
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