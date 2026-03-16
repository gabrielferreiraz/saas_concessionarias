import { headers } from "next/headers"
import { cache } from "react"
import { prisma } from "./prisma"

const getStoreByHost = cache(async (rawHost: string) => {
  const rootDomain =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN?.toLowerCase().trim() ?? ""

  // Logs mínimos para depuração em produção (Easypanel / logs da plataforma)
  console.log("--- [TENANT DEBUG] ANALISE DE DOMINIO ---")
  console.log("Host bruto recebido:", rawHost)
  console.log("Root Domain configurado:", rootDomain)

  // 1) Remove a porta se existir (ex.: ":3000")
  const currentHost = (rawHost || "").replace(/:.*/, "").toLowerCase()
  console.log("Host normalizado (sem porta):", currentHost)

  if (!currentHost) {
    console.log("[TENANT DEBUG] Host vazio após normalização; abortando.")
    console.log("--- [TENANT DEBUG] FIM ---")
    return null
  }

  // Se for o domínio raiz do SaaS, não resolvemos tenant (landing / login)
  if (rootDomain && currentHost === rootDomain) {
    console.log("[TENANT DEBUG] Host é o rootDomain; sem store associada.")
    console.log("--- [TENANT DEBUG] FIM ---")
    return null
  }

  try {
    // 2) Tenta bater com customDomain exato (multi-domain)
    const byCustomDomain = await prisma.store.findUnique({
      where: { customDomain: currentHost },
    })
    if (byCustomDomain) {
      console.log("[TENANT DEBUG] Store encontrada por customDomain:", byCustomDomain.id)
      console.log("--- [TENANT DEBUG] FIM ---")
      return byCustomDomain
    }

    // 3) Subdomínio do tipo loja1.autostock.com.br
    let subdomain = ""
    if (rootDomain && currentHost !== rootDomain) {
      if (currentHost.endsWith(`.${rootDomain}`)) {
        subdomain = currentHost.replace(`.${rootDomain}`, "")
      }
    }
    console.log("Subdomínio extraído final:", subdomain)

    if (subdomain && subdomain !== "www") {
      const bySub = await prisma.store.findUnique({
        where: { subdomain },
      })
      if (bySub) {
        console.log("[TENANT DEBUG] Store encontrada por subdomain:", bySub.id)
        console.log("--- [TENANT DEBUG] FIM ---")
        return bySub
      }
    }
  } catch (error) {
    console.error("[TENANT DEBUG] Erro ao resolver store por host:", error)
  }

  console.log("[TENANT DEBUG] Nenhuma store encontrada para host.")
  console.log("--- [TENANT DEBUG] FIM ---")
  return null
})

export async function resolveCurrentStore() {
  const headerList = await headers()
  const host =
    headerList.get("host") ?? headerList.get("x-forwarded-host") ?? ""

  if (!host) return null

  return getStoreByHost(host)
}

