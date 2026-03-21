// app/sitemap.ts
import { prisma } from "@/src/lib/prisma"
import { resolveCurrentStore } from "@/src/lib/tenant"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const store = await resolveCurrentStore()
    if (!store) return []

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "autosstock.uk"
    const baseUrl = `https://${store.subdomain}.${rootDomain}`

    const vehicles = await prisma.vehicle.findMany({
        where: { storeId: store.id, status: "AVAILABLE" },
        select: { id: true, updatedAt: true },
        orderBy: { createdAt: "desc" },
    })

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        ...vehicles.map((v) => ({
            url: `${baseUrl}/veiculo/${v.id}`,
            lastModified: v.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })),
    ]
}