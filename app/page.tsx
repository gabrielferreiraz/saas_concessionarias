import Link from "next/link"
import { Suspense } from "react"
import Image from "next/image"
import { prisma } from "@/src/lib/prisma"
import { resolveCurrentStore } from "@/src/lib/tenant"
import { Button } from "@/components/ui/button"
import { ShowroomFilterBar } from "@/components/showroom-filter-bar"
import { VehicleShowroomCard } from "@/components/vehicle-showroom-card"
import { WhatsAppTrackedLink } from "@/components/whatsapp-tracked-link"
import { StoreRequestForm } from "@/components/landing/store-request-form"
import {
  Car, MessageCircle, CheckCircle, ArrowRight,
  BarChart3, Smartphone, Zap, Globe
} from "lucide-react"
import type { Metadata } from "next"

function cleanWhatsAppNumber(raw: string): string {
  return raw.replace(/\D/g, "")
}

export async function generateMetadata(): Promise<Metadata> {
  const store = await resolveCurrentStore()
  if (store) {
    return {
      title: `${store.name} | Veículos`,
      description: `Showroom ${store.name}. Transparência, qualidade e os melhores modelos ao seu alcance.`,
    }
  }
  return {
    title: "AutosStock — Showroom Digital para Concessionárias",
    description: "Crie o showroom digital da sua concessionária em minutos. Gerencie estoque, capture leads e venda mais pelo WhatsApp.",
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ marca?: string; modelo?: string; precoMax?: string }>
}) {
  const params = await searchParams
  const store = await resolveCurrentStore()

  // ─── LANDING PAGE (domínio raiz sem tenant) ───────────────────────────────
  if (!store) {
    return (
      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <Car className="size-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">AutosStock</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="#como-funciona"
                className="hidden text-sm text-muted-foreground hover:text-foreground sm:block"
              >
                Como funciona
              </Link>
              <Link
                href="#formulario"
                className="hidden text-sm text-muted-foreground hover:text-foreground sm:block"
              >
                Quero meu showroom
              </Link>
              <Button asChild size="sm" variant="outline">
                <Link href="/login">Entrar</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80">
                <Zap className="size-3.5 text-primary" />
                Showroom digital pronto em minutos
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Sua concessionária no digital,{" "}
                <span className="text-primary">do jeito certo</span>
              </h1>
              <p className="mt-6 text-lg text-white/70 sm:text-xl">
                Crie um showroom profissional com seu próprio endereço,
                gerencie seu estoque e receba leads direto no WhatsApp.
                Sem complicação.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto gap-2">
                  <Link href="#formulario">
                    Quero meu showroom grátis
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Como funciona
              </h2>
              <p className="mt-3 text-muted-foreground">
                Do cadastro ao primeiro lead em menos de 24 horas
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Preencha o formulário",
                  description:
                    "Informe os dados da sua concessionária e escolha o endereço do seu showroom.",
                },
                {
                  step: "02",
                  title: "Aprovamos em até 24h",
                  description:
                    "Nossa equipe analisa e cria seu showroom com seu endereço personalizado.",
                },
                {
                  step: "03",
                  title: "Comece a vender",
                  description:
                    "Cadastre seus veículos, compartilhe o link e receba leads no WhatsApp.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-xl border bg-card p-8"
                >
                  <span className="text-5xl font-black text-primary/20">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Tudo que sua concessionária precisa
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Globe,
                  title: "Endereço próprio",
                  description: "Seu showroom em suaconcessionaria.autosstock.uk",
                },
                {
                  icon: Smartphone,
                  title: "100% mobile",
                  description: "Seus clientes acessam pelo celular com facilidade.",
                },
                {
                  icon: MessageCircle,
                  title: "Leads no WhatsApp",
                  description: "Botão de contato direto em cada veículo do estoque.",
                },
                {
                  icon: BarChart3,
                  title: "Dashboard de leads",
                  description: "Acompanhe cliques e interesse por veículo.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border bg-card p-6 space-y-3"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section id="formulario" className="py-20 bg-muted/30">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Quero meu showroom
              </h2>
              <p className="mt-3 text-muted-foreground">
                Preencha os dados abaixo e entraremos em contato em até 24 horas.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-8">
              <StoreRequestForm />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-card py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-md bg-primary">
                  <Car className="size-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold">AutosStock</span>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} AutosStock. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>
    )
  }

  // ─── SHOWROOM DA LOJA (subdomínio com tenant) ─────────────────────────────
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
    whatsappClean.length >= 10 ? `https://wa.me/${whatsappClean}` : "#"

  return (
    <main className="min-h-screen bg-background">
      <section
        className="relative overflow-hidden bg-gradient-to-b from-foreground to-foreground/95 text-primary-foreground"
        style={store.primaryColor ? { backgroundColor: store.primaryColor } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-2 py-1 transition-colors hover:bg-white/10"
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
              Transparência, qualidade e os melhores modelos do mercado ao seu alcance.
            </p>
            <form
              method="GET"
              action="/"
              className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center"
            >
              <input type="hidden" name="marca" value={params.marca ?? ""} />
              <input type="hidden" name="precoMax" value={params.precoMax ?? ""} />
              <input
                name="modelo"
                defaultValue={params.modelo ?? ""}
                placeholder="Buscar por modelo..."
                className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/70 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 sm:max-w-xs"
              />
              <Button type="submit" size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90">
                Buscar
              </Button>
            </form>
          </div>
        </div>
      </section>

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

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <Car className="size-8 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Nenhum veículo encontrado</h2>
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
                const cover = vehicle.images.find((i) => i.isCover) ?? vehicle.images[0]
                const coverUrl = cover?.url ?? "https://placehold.co/800x450?text=Sem+foto"
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

      <footer className="mt-12 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div
                className={`flex size-10 items-center justify-center rounded-lg text-primary-foreground ${!store.primaryColor ? "bg-primary" : ""}`}
                style={store.primaryColor ? { backgroundColor: store.primaryColor } : undefined}
              >
                <Car className="size-5" />
              </div>
              <span className="text-sm text-muted-foreground">
                {store.name} © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {whatsappClean.length >= 10 && (
                <Button asChild size="sm" className="min-h-[44px] gap-2 bg-[#25D366] px-4 text-white hover:bg-[#20BD5A]">
                  <WhatsAppTrackedLink href={whatsappHref} className="inline-flex min-h-[44px] items-center">
                    <MessageCircle className="size-4 shrink-0" />
                    WhatsApp
                  </WhatsAppTrackedLink>
                </Button>
              )}
            </div>
          </div>
        </div>
      </footer>

      {whatsappClean.length >= 10 && (
        <WhatsAppTrackedLink
          href={whatsappHref}
          className="fixed bottom-6 right-6 z-50 flex min-h-[44px] min-w-[44px] size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:bottom-8 md:right-8"
        >
          <MessageCircle className="size-7" />
        </WhatsAppTrackedLink>
      )}
    </main>
  )
}