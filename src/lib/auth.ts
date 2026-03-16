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

export const authOptions: NextAuthOptions = {
  debug: true,
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

        if (!email || !password) {
          console.error("[AUTH] Credenciais ausentes.")
          return null
        }

        // Extrai host e subdomínio para vincular o login à loja correta
        const rawHost =
          (req?.headers as Record<string, string> | undefined)?.host ?? ""
        const rootDomain =
          process.env.NEXT_PUBLIC_ROOT_DOMAIN?.toLowerCase().trim() ?? ""

        console.log("--- [AUTH DEBUG] LOGIN CREDENTIALS ---")
        console.log("Email recebido:", email)
        console.log("Host bruto recebido:", rawHost)
        console.log("Root Domain configurado:", rootDomain)

        const currentHost = (rawHost || "").replace(/:.*/, "").toLowerCase()
        console.log("Host normalizado (sem porta):", currentHost)

        let tenantStoreId: string | null = null

        try {
          if (currentHost) {
            // Tenta customDomain primeiro
            const byCustomDomain = await prisma.store.findUnique({
              where: { customDomain: currentHost },
            })
            if (byCustomDomain) {
              console.log(
                "[AUTH DEBUG] Store encontrada por customDomain:",
                byCustomDomain.id
              )
              tenantStoreId = byCustomDomain.id
            } else if (rootDomain && currentHost.endsWith(`.${rootDomain}`)) {
              let subdomain = currentHost.replace(`.${rootDomain}`, "")
              if (subdomain === "www") subdomain = ""
              console.log("Subdomínio extraído final (auth):", subdomain)
              if (subdomain) {
                const bySub = await prisma.store.findUnique({
                  where: { subdomain },
                })
                if (bySub) {
                  console.log(
                    "[AUTH DEBUG] Store encontrada por subdomain:",
                    bySub.id
                  )
                  tenantStoreId = bySub.id
                }
              }
            }
          }
        } catch (err) {
          console.error("[AUTH ERROR] Falha ao resolver tenant no authorize:", err)
          return null
        }

        if (!tenantStoreId) {
          console.error(
            "[AUTH ERROR] Nenhuma store correspondente ao host ao tentar login."
          )
          console.log("--- [AUTH DEBUG] FIM (sem tenant) ---")
          return null
        }

        let user = null
        try {
          user = await prisma.user.findFirst({
            where: {
              email,
              storeId: tenantStoreId,
            },
            include: { store: true },
          })
        } catch (err) {
          console.error("[AUTH ERROR] Falha ao buscar usuário:", err)
          return null
        }

        console.log("[AUTH DEBUG] Usuário encontrado no banco?:", !!user)

        if (!user) {
          console.error(
            "[AUTH ERROR] Nenhum usuário encontrado para este e-mail/tenant."
          )
          console.log("--- [AUTH DEBUG] FIM (user not found) ---")
          return null
        }

        let isValid = false
        try {
          isValid = await compare(password, user.password)
        } catch (err) {
          console.error("[AUTH ERROR] Falha ao comparar hash de senha:", err)
          return null
        }

        console.log("[AUTH DEBUG] Resultado comparação bcrypt:", isValid)

        if (!isValid) {
          console.error(
            "[AUTH ERROR] Senha inválida para o e-mail/tenant informado."
          )
          console.log("--- [AUTH DEBUG] FIM (invalid password) ---")
          return null
        }

        console.log("[AUTH DEBUG] Login autorizado para usuário:", user.id)
        console.log("--- [AUTH DEBUG] FIM (success) ---")

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
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
