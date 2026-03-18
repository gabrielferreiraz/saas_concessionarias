import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { redirect } from "next/navigation"
import { LayoutDashboard, Store, LogOut } from "lucide-react"

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session?.user?.role !== "SUPER_ADMIN") {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-lg font-semibold">AutosStock Admin</span>
            <nav className="flex items-center gap-4">
              <Link
                href="/super-admin"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <LayoutDashboard className="size-4" />
                Solicitações
              </Link>
              <Link
                href="/super-admin/lojas"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Store className="size-4" />
                Lojas
              </Link>
            </nav>
          </div>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <LogOut className="size-4" />
            Sair
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}