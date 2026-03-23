"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createStoreUserAction } from "@/src/actions/users"
import { Loader2, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

export function CreateUserForm() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({ name: "", email: "", password: "" })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (form.password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.")
            return
        }

        setIsPending(true)
        const result = await createStoreUserAction(form)
        setIsPending(false)

        if (result.success) {
            setSuccess(true)
            setForm({ name: "", email: "", password: "" })
            router.refresh()
            setTimeout(() => setSuccess(false), 3000)
        } else {
            setError(result.error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium">Nome</label>
                    <Input
                        placeholder="João Silva"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                        type="email"
                        placeholder="joao@loja.com"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium">Senha</label>
                    <Input
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={form.password}
                        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                        required
                    />
                </div>
            </div>

            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
            {success && (
                <p className="text-sm text-emerald-600">Usuário criado com sucesso!</p>
            )}

            <Button type="submit" disabled={isPending} className="gap-2">
                {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <UserPlus className="size-4" />
                )}
                Adicionar Vendedor
            </Button>
        </form>
    )
}