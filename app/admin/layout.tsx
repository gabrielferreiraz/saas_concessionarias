import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { AdminNav } from "@/components/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let storeName = "Admin"
  let logoUrl: string | null = null
  let userRole: string | undefined
  const session = await getServerSession(authOptions)
  if (session?.user?.email) {
    userRole = session.user.role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { storeId: true, role: true },
    })
    if (user?.role) userRole = user.role
    if (user?.storeId) {
      const store = await prisma.store.findUnique({
        where: { id: user.storeId },
        select: { name: true, logoUrl: true },
      })
      if (store) {
        storeName = store.name
        logoUrl = store.logoUrl
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav storeName={storeName} logoUrl={logoUrl ?? undefined} userRole={userRole} />
      {children}
    </div>
  )
}