import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { QRCodeSVG } from "qrcode.react"
import { Calendar, Gauge, Fuel } from "lucide-react"
import { prisma } from "@/src/lib/prisma"
import { FlyerActions } from "@/components/flyer-print-button"

export default async function FlyerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: "asc" } },
      store: { select: { name: true, logoUrl: true, domain: true, slug: true } },
    },
  })

  if (!vehicle) return notFound()

  const cover =
    vehicle.images.find((i) => i.isCover) ?? vehicle.images[0]
  const coverUrl =
    cover?.url ?? "https://placehold.co/1200x675?text=Sem+foto"

  const headerList = await headers()
  const host =
    vehicle.store.domain ??
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    ""
  const proto = headerList.get("x-forwarded-proto") ?? "https"
  const origin = host ? `${proto}://${host}` : ""
  const publicUrl = origin ? `${origin}/veiculo/${vehicle.id}` : `/veiculo/${vehicle.id}`

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
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 bg-[#050505]">
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 1cm; }
          html, body {
            background: #050505 !important;
            margin: 0 !important;
            padding: 0 !important;
            color: #ffffff !important;
          }
          a { text-decoration: none; color: inherit; }
        }
      `}</style>

      <div className="mb-6 flex items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/estoque"
            className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Voltar
          </Link>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-foreground">
              Flyer (PDF)
            </h1>
            <p className="text-sm text-muted-foreground">
              Otimizado para impressão/compartilhamento
            </p>
          </div>
        </div>
        <FlyerActions publicUrl={publicUrl} />
      </div>

      {/* Área imprimível */}
      <section
        className="mx-auto w-full max-w-[850px] overflow-hidden rounded-xl border border-white/10 bg-[#050505] text-white shadow-[0_24px_80px_rgba(0,0,0,0.8)] print:border-0"
        style={{
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        <div className="relative">
          {/* Foto de capa com hyperlink para a página pública do veículo */}
          <a href={publicUrl} target="_blank" rel="noopener noreferrer">
            <div className="relative aspect-[16/7] w-full bg-black">
              <Image
                src={coverUrl}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                sizes="794px"
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
          </a>

          {/* Logo da loja */}
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-lg border border-[color:var(--primary)]/50 bg-black/50 px-3 py-2 shadow-[0_0_24px_rgba(0,0,0,0.9)]">
            {vehicle.store.logoUrl ? (
              <div className="relative h-8 w-28">
                <Image
                  src={vehicle.store.logoUrl}
                  alt={vehicle.store.name}
                  fill
                  sizes="112px"
                  className="object-contain object-right"
                  unoptimized
                />
              </div>
            ) : (
              <span className="text-sm font-semibold text-foreground">
                {vehicle.store.name}
              </span>
            )}
          </div>

          {/* Título + preço + CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)]">
              {vehicle.make} {vehicle.model}
            </h2>
            <p
              className="mt-2 text-3xl font-extrabold drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]"
              style={{ color: "var(--primary)" }}
            >
              {formatPrice(vehicle.price)}
            </p>
            <p className="mt-2 text-xs font-medium text-neutral-200 print:text-neutral-200">
              Clique na imagem para abrir a ficha completa.
            </p>
          </div>
        </div>

        {/* Infos + detalhes */}
        <div className="grid gap-6 p-6 lg:grid-cols-4">
          <div className="space-y-3 lg:col-span-3">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
              <div className="rounded-lg border border-white/15 bg-white/5 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                    <Calendar className="h-3.5 w-3.5 text-[color:var(--primary)]" />
                  </div>
                  <p className="text-[11px] font-medium text-neutral-300">
                    Ano
                  </p>
                </div>
                <p className="mt-2 text-xl font-semibold text-white">
                  {vehicle.year}
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/5 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                    <Gauge className="h-3.5 w-3.5 text-[color:var(--primary)]" />
                  </div>
                  <p className="text-[11px] font-medium text-neutral-300">
                    Quilometragem
                  </p>
                </div>
                <p className="mt-2 text-xl font-semibold text-white">
                  {formatKm(vehicle.km)} km
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/5 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                    <Fuel className="h-3.5 w-3.5 text-[color:var(--primary)]" />
                  </div>
                  <p className="text-[11px] font-medium text-neutral-300">
                    Combustível
                  </p>
                </div>
                <p className="mt-2 text-sm font-semibold text-white">
                  Gasolina / Flex
                </p>
              </div>
            </div>

            {/* Espaço reservado para futuras características extras sem poluir o layout */}
          </div>

          {/* Bloco de contato + QR */}
          <div className="flex flex-col justify-between rounded-lg border border-white/15 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-medium text-neutral-300">
                  Ver anúncio completo
                </p>
                <p className="break-all text-xs font-medium text-neutral-100">
                  {publicUrl}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <QRCodeSVG value={publicUrl} size={96} level="M" />
              </div>
            </div>
            <p className="mt-3 text-[11px] text-neutral-300 text-center">
              Aponte a câmera do celular para acessar ficha completa,
              <br />
              mais fotos e contato direto com a loja.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
