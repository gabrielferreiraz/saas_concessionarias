import { headers } from "next/headers"
import { cache } from "react"
import { prisma } from "./prisma"

const getStoreByHostCached = cache(async (currentHost: string) => {
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
})

export async function resolveCurrentStore() {
  const headerList = await headers()
  const rawHost =
    headerList.get("host") ?? headerList.get("x-forwarded-host") ?? ""

  if (!rawHost) return null

  const currentHost = rawHost.replace(/:.*/, "").toLowerCase()
  return getStoreByHostCached(currentHost)
}