import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "@/src/lib/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: string
      storeId: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    storeId: string | null
  }
}

const isDev = process.env.NODE_ENV === "development"

export const authOptions: NextAuthOptions = {
  debug: isDev,
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email?.toLowerCase().trim()
        const password = credentials?.password

        if (!email || !password) return null

        const rawHost =
          (req?.headers as Record<string, string> | undefined)?.host ?? ""
        const rootDomain =
          process.env.NEXT_PUBLIC_ROOT_DOMAIN?.toLowerCase().trim() ?? ""

        const currentHost = rawHost.replace(/:.*/, "").toLowerCase()

        let tenantStoreId: string | null = null

        try {
          if (currentHost) {
            const byCustomDomain = await prisma.store.findUnique({
              where: { customDomain: currentHost, status: "ACTIVE" },
            })
            if (byCustomDomain) {
              tenantStoreId = byCustomDomain.id
            } else if (rootDomain && currentHost.endsWith(`.${rootDomain}`)) {
              let subdomain = currentHost.replace(`.${rootDomain}`, "")
              if (subdomain === "www") subdomain = ""
              if (subdomain) {
                const bySub = await prisma.store.findUnique({
                  where: { subdomain, status: "ACTIVE" },
                })
                if (bySub) tenantStoreId = bySub.id
              }
            }
          }
        } catch (err) {
          console.error("[AUTH] Falha ao resolver tenant:", err)
          return null
        }

        if (!tenantStoreId) return null

        let user = null
        try {
          user = await prisma.user.findFirst({
            where: { email, storeId: tenantStoreId },
            include: { store: true },
          })
        } catch (err) {
          console.error("[AUTH] Falha ao buscar usuário:", err)
          return null
        }

        if (!user) return null

        let isValid = false
        try {
          isValid = await compare(password, user.password)
        } catch (err) {
          console.error("[AUTH] Falha ao comparar senha:", err)
          return null
        }

        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
          storeId: user.storeId ?? null,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role ?? "USER"
        token.storeId = (user as { storeId?: string | null }).storeId ?? null
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.storeId = token.storeId
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}