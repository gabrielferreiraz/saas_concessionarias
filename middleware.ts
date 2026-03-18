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
        // Garante que usuário admin sempre tem storeId no token
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token.storeId
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"],
}