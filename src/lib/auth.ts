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
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { store: true },
        })

        if (!user) {
          return null
        }

        const isValid = await compare(credentials.password, user.password)
        if (!isValid) {
          return null
        }

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
