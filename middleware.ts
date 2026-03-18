import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware() {
    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) return false

        if (req.nextUrl.pathname.startsWith("/super-admin")) {
          return token.role === "SUPER_ADMIN"
        }

        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token.storeId
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/super-admin/:path*"],
}