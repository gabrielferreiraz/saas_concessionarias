import { LRUCache } from "lru-cache"

type RateLimitOptions = {
    interval: number // ms
    limit: number
}

const cache = new LRUCache<string, number[]>({
    max: 500, // máximo de 500 IPs/chaves em memória
    ttl: 60 * 1000, // limpa entradas após 1 minuto
})

export function rateLimit({ interval, limit }: RateLimitOptions) {
    return function check(key: string): { success: boolean; remaining: number } {
        const now = Date.now()
        const windowStart = now - interval

        const timestamps = (cache.get(key) ?? []).filter((t) => t > windowStart)

        if (timestamps.length >= limit) {
            return { success: false, remaining: 0 }
        }

        timestamps.push(now)
        cache.set(key, timestamps)

        return { success: true, remaining: limit - timestamps.length }
    }
}

// Limitadores pré-configurados
export const loginRateLimit = rateLimit({
    interval: 15 * 60 * 1000, // 15 minutos
    limit: 10, // 10 tentativas por IP
})

export const storeRequestRateLimit = rateLimit({
    interval: 60 * 60 * 1000, // 1 hora
    limit: 3, // 3 solicitações por IP
})