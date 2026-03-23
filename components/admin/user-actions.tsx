"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
    deleteStoreUserAction,
    resetStoreUserPasswordByAdminAction,
} from "@/src/actions/users"
import { Trash2, KeyRound, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserActions({
    userId,
    userName,
}: {
    userId: string
    userName: string
}) {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const [resetOpen, setResetOpen] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleDelete = async () => {
        if (!confirm(`Remover o usuário "${userName}"? Esta ação não pode ser desfeita.`)) return
        setIsPending(true)
        const result = await deleteStoreUserAction(userId)
        setIsPending(false)
        if (!result.success) alert(result.error)
        else router.refresh()
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        if (newPassword.length < 6) {
            setError("Mínimo 6 caracteres.")
            return
        }
        setIsPending(true)
        const result = await resetStoreUserPasswordByAdminAction(userId, newPassword)
        setIsPending(false)
        if (result.success) {
            setResetOpen(false)
            setNewPassword("")
        } else {
            setError(result.error)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Dialog open={resetOpen} onOpenChange={setResetOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                        <KeyRound className="size-3.5" />
                        Senha
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Redefinir senha de {userName}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Nova senha (mín. 6 caracteres)"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setResetOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="flex-1" disabled={isPending}>
                                {isPending ? <Loader2 className="size-4 animate-spin" /> : "Salvar"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isPending}
                className="gap-2"
            >
                {isPending ? (
                    <Loader2 className="size-3.5 animate-spin" />
                ) : (
                    <Trash2 className="size-3.5" />
                )}
                Remover
            </Button>
        </div>
    )
}