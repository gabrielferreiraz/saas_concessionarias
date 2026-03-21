// app/robots.ts
import { resolveCurrentStore } from "@/src/lib/tenant"
import type { MetadataRoute } from "next"

export default async function robots(): Promise<MetadataRoute.Robots> {
    const store = await resolveCurrentStore()
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "autosstock.uk"

    if (!store) {
        return {
            rules: { userAgent: "*", disallow: "/" },
        }
    }

    const baseUrl = `https://${store.subdomain}.${rootDomain}`

    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}