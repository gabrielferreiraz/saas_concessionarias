import Image from "next/image"
import Link from "next/link"
import { headers } from "next/headers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export const revalidate = 0

export default async function FlyerEstoquePage() {
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
    select: { storeId: true },
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

  const store = await prisma.store.findUnique({
    where: { id: user.storeId },
    select: { name: true, logoUrl: true, customDomain: true, subdomain: true },
  })

  const vehicles = await prisma.vehicle.findMany({
    where: { storeId: user.storeId, status: "AVAILABLE" },
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  })

  const headerList = await headers()
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "autosstock.uk"
  const host =
    store?.customDomain ??
    (store?.subdomain ? `${store.subdomain}.${rootDomain}` : null) ??
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    ""
  const proto = headerList.get("x-forwarded-proto") ?? "https"
  const origin = host ? `${proto}://${host}` : ""

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body {
            background: #050505 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="mb-6 flex items-center justify-between gap-3 print:hidden">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-foreground">
            Catálogo de Estoque
          </h1>
          <p className="text-sm text-muted-foreground">
            Geração de cartaz em grade para impressão/PDF
          </p>
        </div>
        <Link
          href="/admin/estoque"
          className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          Voltar
        </Link>
      </div>

      <section
        className="mx-auto w-full max-w-[900px] rounded-xl border border-white/10 bg-[#050505] px-6 pb-6 pt-5 text-white shadow-lg print:border-0"
        style={{
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        <header className="mb-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              CONFIRA NOSSO ESTOQUE ATUALIZADO
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
              {store?.name ?? "Sua Loja de Veículos"}
            </h2>
          </div>
          {store?.logoUrl && (
            <div className="relative h-10 w-32 rounded-lg border border-white/20 bg-white/5 px-2 py-1 shadow-[0_0_18px_rgba(0,0,0,0.7)]">
              <Image
                src={store.logoUrl}
                alt={store.name}
                fill
                sizes="128px"
                className="object-contain object-right"
                unoptimized
              />
            </div>
          )}
        </header>

        {/* Grade de veículos - 3 por linha no A4 */}
        <div className="mt-2 grid gap-4 md:grid-cols-3">
          {vehicles.map((vehicle) => {
            const img =
              vehicle.images[0]?.url ??
              "https://placehold.co/400x260?text=Sem+foto"
            const url = origin
              ? `${origin}/veiculo/${vehicle.id}`
              : `/veiculo/${vehicle.id}`

            return (
              <article
                key={vehicle.id}
                className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-[1px]"
              >
                <div className="relative h-28 w-full overflow-hidden rounded-[0.6rem] bg-black">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={img}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      fill
                      sizes="280px"
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </a>
                </div>
                <div className="mt-2 flex flex-1 flex-col justify-between rounded-[0.6rem] bg-black/50 p-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-neutral-200">
                      {vehicle.make}
                    </p>
                    <p className="truncate text-[11px] text-neutral-400">
                      {vehicle.model}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-neutral-400">
                      {vehicle.year}
                    </span>
                    <span className="text-sm font-semibold text-[color:var(--primary)]">
                      {formatPrice(vehicle.price)}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}

