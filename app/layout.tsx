import type { Metadata } from "next"
import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { NextAuthSessionProvider } from "@/components/providers/session-provider"
import { resolveCurrentStore } from "@/src/lib/tenant"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Premium Motors | Veículos de Luxo Seminovos',
  description: 'Encontre o veículo de luxo dos seus sonhos. Os melhores seminovos premium com qualidade garantida.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

function hexToOkColor(hex: string): string | null {
  const cleaned = hex.replace("#", "").trim()
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null
  const r = parseInt(cleaned.slice(0, 2), 16) / 255
  const g = parseInt(cleaned.slice(2, 4), 16) / 255
  const b = parseInt(cleaned.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  const H = Math.round(h * 360)
  const S = Math.round(s * 100)
  const L = Math.round(l * 100)
  // Approximate OKLCH using HSL lightness as L and modest chroma
  const lightness = L / 100
  const chroma = 0.1
  return `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${H})`
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const store = await resolveCurrentStore()
  const primaryHex = store?.primaryColor
  const primaryOk = primaryHex ? hexToOkColor(primaryHex) : null

  const bodyStyle: React.CSSProperties = primaryOk
    ? {
        // Mantém todos os tokens em cima de primary para refletir o branding
        ["--primary" as string]: primaryOk,
        ["--sidebar-primary" as string]: primaryOk,
        ["--ring" as string]: primaryOk,
      }
    : {}

  return (
    <html lang="en">
      <body className="font-sans antialiased" style={bodyStyle}>
        <NextAuthSessionProvider>
          {children}
          <Toaster />
          <Analytics />
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
