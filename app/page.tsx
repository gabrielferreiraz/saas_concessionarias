import Link from "next/link"
import { Suspense } from "react"
import Image from "next/image"
import { prisma } from "@/src/lib/prisma"
import { resolveCurrentStore } from "@/src/lib/tenant"
import { Button } from "@/components/ui/button"
import { ShowroomFilterBar } from "@/components/showroom-filter-bar"
import { VehicleShowroomCard } from "@/components/vehicle-showroom-card"
import { WhatsAppTrackedLink } from "@/components/whatsapp-tracked-link"
import { Car, MessageCircle } from "lucide-react"
import type { Metadata } from "next"

function cleanWhatsAppNumber(raw: string): string {
  return raw.replace(/\D/g, "")
}

export async function generateMetadata(): Promise<Metadata> {
  const store = await resolveCurrentStore()
  const title = store ? `${store.name} | Veículos` : "Showroom | Veículos"
  return {
    title,
    description: store
      ? `Showroom ${store.name}. Transparência, qualidade e os melhores modelos ao seu alcance.`
      : "Showroom de veículos.",
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ marca?: string; modelo?: string; precoMax?: string }>
}) {
  const params = await searchParams
  const store = await resolveCurrentStore()

  if (!store) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="max-w-md space-y-3 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Nenhuma loja configurada
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure uma loja no painel administrativo para exibir o showroom.
          </p>
        </div>
      </main>
    )
  }

  const { minPrice, maxPrice } = await prisma.vehicle
    .aggregate({
      where: { storeId: store.id },
      _min: { price: true },
      _max: { price: true },
    })
    .then((a) => ({
      minPrice: a._min.price ?? 0,
      maxPrice: a._max.price ?? 10_000_000,
    }))

  const makes = await prisma.vehicle
    .findMany({
      where: { storeId: store.id },
      select: { make: true },
      distinct: ["make"],
      orderBy: { make: "asc" },
    })
    .then((rows) => rows.map((r) => r.make))

  const precoMaxNum = params.precoMax ? Number(params.precoMax) : undefined
  const where = {
    storeId: store.id,
    ...(params.marca && { make: params.marca }),
    ...(params.modelo?.trim() && {
      model: { contains: params.modelo.trim(), mode: "insensitive" as const },
    }),
    ...(precoMaxNum != null &&
      !Number.isNaN(precoMaxNum) && { price: { lte: precoMaxNum } }),
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  })

  const whatsappClean = cleanWhatsAppNumber(store.whatsapp)
  const whatsappHref =
    whatsappClean.length >= 10
      ? `https://wa.me/${whatsappClean}`
      : "#"

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-foreground to-foreground/95 text-primary-foreground"
        style={
          store.primaryColor
            ? { backgroundColor: store.primaryColor }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header da Home: logo/nome com link para / */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-2 py-1 transition-colors hover:bg-white/10"
              aria-label="Ir para a página inicial"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/10">
                {store.logoUrl ? (
                  <div className="relative h-7 w-24">
                    <Image
                      src={store.logoUrl}
                      alt={store.name}
                      fill
                      sizes="96px"
                      className="object-contain object-left"
                    />
                  </div>
                ) : (
                  <Car className="size-5" />
                )}
              </div>
              {!store.logoUrl && (
                <span className="text-sm font-semibold">{store.name}</span>
              )}
            </Link>

            <Link
              href="/admin"
              className="text-sm font-medium text-white/90 hover:text-white"
            >
              Painel
            </Link>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 md:pb-20 lg:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {store.name} — Sua nova experiência em veículos
            </h1>
            <p className="mt-4 text-lg opacity-90 sm:text-xl">
              Transparência, qualidade e os melhores modelos do mercado ao seu
              alcance.
            </p>
            <form
              method="GET"
              action="/"
              className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center"
            >
              <input
                type="hidden"
                name="marca"
                value={params.marca ?? ""}
              />
              <input
                type="hidden"
                name="precoMax"
                value={params.precoMax ?? ""}
              />
              <input
                name="modelo"
                defaultValue={params.modelo ?? ""}
                placeholder="Buscar por modelo..."
                className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/70 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 sm:max-w-xs"
                aria-label="Buscar por modelo"
              />
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                className="bg-white text-foreground hover:bg-white/90"
              >
                Buscar
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Barra de filtros */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="h-20 animate-pulse rounded-lg bg-muted" />}>
            <ShowroomFilterBar
              makes={makes}
              minPrice={minPrice === maxPrice ? 0 : minPrice}
              maxPrice={minPrice === maxPrice ? minPrice + 10000 : maxPrice}
              currentMarca={params.marca ?? null}
              currentPrecoMax={params.precoMax ?? null}
            />
          </Suspense>
        </div>
      </section>

      {/* Grid Showroom */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <Car className="size-8 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              Nenhum veículo encontrado
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {params.marca || params.modelo || params.precoMax
                ? "Tente ajustar os filtros para ver mais resultados."
                : "Ainda não há veículos cadastrados no showroom."}
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/">Limpar filtros</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{vehicles.length}</span>{" "}
              {vehicles.length === 1 ? "veículo" : "veículos"}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {vehicles.map((vehicle) => {
                const cover =
                  vehicle.images.find((i) => i.isCover) ?? vehicle.images[0]
                const coverUrl =
                  cover?.url ??
                  "https://placehold.co/800x450?text=Sem+foto"

                return (
                  <VehicleShowroomCard
                    key={vehicle.id}
                    id={vehicle.id}
                    make={vehicle.make}
                    model={vehicle.model}
                    year={vehicle.year}
                    price={vehicle.price}
                    km={vehicle.km}
                    status={vehicle.status}
                    coverImageUrl={coverUrl}
                  />
                )
              })}
            </div>
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div
                className={`flex size-10 items-center justify-center rounded-lg text-primary-foreground ${!store.primaryColor ? "bg-primary" : ""}`}
                style={
                  store.primaryColor
                    ? { backgroundColor: store.primaryColor }
                    : undefined
                }
              >
                <Car className="size-5" />
              </div>
              <span className="text-sm text-muted-foreground">
                {store.name} © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {whatsappClean.length >= 10 && (
                <Button
                  asChild
                  size="sm"
                  className="min-h-[44px] gap-2 bg-[#25D366] px-4 text-white hover:bg-[#20BD5A]"
                >
                  <WhatsAppTrackedLink
                    href={whatsappHref}
                    aria-label="Contato WhatsApp"
                    className="inline-flex min-h-[44px] items-center"
                  >
                    <MessageCircle className="size-4 shrink-0" />
                    WhatsApp
                  </WhatsAppTrackedLink>
                </Button>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp — área de toque mínima 44x44px */}
      {whatsappClean.length >= 10 && (
        <WhatsAppTrackedLink
          href={whatsappHref}
          className="fixed bottom-6 right-6 z-50 flex min-h-[44px] min-w-[44px] size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:bottom-8 md:right-8"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle className="size-7" aria-hidden />
        </WhatsAppTrackedLink>
      )}
    </main>
  )
}
