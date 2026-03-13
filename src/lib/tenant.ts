import { headers } from "next/headers"
import { cache } from "react"
import { prisma } from "./prisma"

const getStoreByHost = cache(async (host: string) => {
  const hostWithoutPort = host.split(":")[0]
  if (!hostWithoutPort) return null

  const rootDomain = process.env.ROOT_DOMAIN?.toLowerCase().trim()
  const lowerHost = hostWithoutPort.toLowerCase()

  // Se for o domínio raiz do SaaS, não resolvemos uma loja específica
  if (rootDomain && lowerHost === rootDomain) {
    return null
  }

  // Domínio customizado bate direto
  try {
    const byCustomDomain = await prisma.store.findUnique({
      where: { customDomain: lowerHost },
    })
    if (byCustomDomain) return byCustomDomain
  } catch {
    return null
  }

  // Subdomínio do tipo loja1.autostock.com.br
  if (rootDomain && lowerHost.endsWith(`.${rootDomain}`)) {
    const sub = lowerHost.slice(0, lowerHost.length - rootDomain.length - 1)
    if (sub && sub !== "www") {
      try {
        const bySub = await prisma.store.findUnique({
          where: { subdomain: sub },
        })
        if (bySub) return bySub
      } catch {
        return null
      }
    }
  }

  return null
})

export async function resolveCurrentStore() {
  const headerList = await headers()
  const host =
    headerList.get("host") ?? headerList.get("x-forwarded-host") ?? ""

  if (!host) return null

  return getStoreByHost(host)
}


