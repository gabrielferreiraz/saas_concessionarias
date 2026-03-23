import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { CreateUserForm } from "@/components/admin/create-user-form"
import { UserActions } from "@/components/admin/user-actions"

const ROLE_LABEL: Record<string, string> = {
    STORE_ADMIN: "Admin",
    STORE_USER: "Vendedor",
}

const ROLE_VARIANT: Record<string, "default" | "secondary"> = {
    STORE_ADMIN: "default",
    STORE_USER: "secondary",
}

export default async function UsuariosPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) redirect("/login")
    if (session.user.role !== "STORE_ADMIN") redirect("/admin")

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })
    if (!user?.storeId) redirect("/login")

    const users = await prisma.user.findMany({
        where: { storeId: user.storeId },
        orderBy: { createdAt: "asc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    })

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
            <div>
                <h1 className="text-2xl font-semibold">Usuários</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Gerencie os usuários com acesso ao painel da sua loja
                </p>
            </div>

            {/* Lista de usuários */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                        <Users className="size-4 text-muted-foreground" />
                        <CardTitle className="text-base">
                            {users.length} {users.length === 1 ? "usuário" : "usuários"}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y">
                        {users.map((u) => (
                            <div
                                key={u.id}
                                className="flex items-center justify-between px-6 py-4"
                            >
                                <div>
                                    <p className="font-medium">{u.name ?? u.email}</p>
                                    <p className="text-sm text-muted-foreground">{u.email}</p>
                                    <Badge
                                        variant={ROLE_VARIANT[u.role] ?? "secondary"}
                                        className="mt-1"
                                    >
                                        {ROLE_LABEL[u.role] ?? u.role}
                                    </Badge>
                                </div>
                                {u.role !== "STORE_ADMIN" && (
                                    <UserActions userId={u.id} userName={u.name ?? u.email} />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Criar novo usuário */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Adicionar Vendedor</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateUserForm />
                </CardContent>
            </Card>
        </div>
    )
}