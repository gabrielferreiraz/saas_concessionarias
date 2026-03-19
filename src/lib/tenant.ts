import { headers } from "next/headers"
import { unstable_cache } from "next/cache"
import { prisma } from "./prisma"

// A chave do cache DEVE incluir o host para ser única por subdomínio
function getStoreByHost(currentHost: string) {
  return unstable_cache(
    async () => {
      const rootDomain =
        process.env.NEXT_PUBLIC_ROOT_DOMAIN?.toLowerCase().trim() ?? ""

      if (!currentHost) return null
      if (rootDomain && currentHost === rootDomain) return null

      try {
        const byCustomDomain = await prisma.store.findUnique({
          where: { customDomain: currentHost, status: "ACTIVE" },
        })
        if (byCustomDomain) return byCustomDomain

        let subdomain = ""
        if (rootDomain && currentHost.endsWith(`.${rootDomain}`)) {
          subdomain = currentHost.replace(`.${rootDomain}`, "")
        }

        if (subdomain && subdomain !== "www") {
          const bySub = await prisma.store.findUnique({
            where: { subdomain, status: "ACTIVE" },
          })
          if (bySub) return bySub
        }
      } catch (error) {
        console.error("[TENANT] Erro ao resolver store:", error)
      }

      return null
    },
    [`tenant-by-host-${currentHost}`], // chave única por host
    { revalidate: 300 }
  )()
}

export async function resolveCurrentStore() {
  const headerList = await headers()
  const rawHost =
    headerList.get("host") ?? headerList.get("x-forwarded-host") ?? ""

  if (!rawHost) return null

  const currentHost = rawHost.replace(/:.*/, "").toLowerCase()
  return getStoreByHost(currentHost)
}