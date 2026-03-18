"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { resetStoreUserPasswordAction } from "@/src/actions/super-admin"
import { KeyRound, Loader2, Copy, Check } from "lucide-react"

export function ResetPasswordButton({ userId }: { userId: string }) {
  const [isPending, setIsPending] = useState(false)
  const [newPassword, setNewPassword] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const handleReset = async () => {
    setIsPending(true)
    const result = await resetStoreUserPasswordAction(userId)
    setIsPending(false)
    if (result.success) {
      setNewPassword(result.tempPassword)
    } else {
      alert(result.error)
    }
  }

  const handleCopy = async () => {
    if (newPassword) {
      await navigator.clipboard.writeText(newPassword)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <KeyRound className="size-3.5" />
          Resetar senha
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resetar senha do usuário</DialogTitle>
        </DialogHeader>
        {newPassword ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Nova senha gerada. Envie para o usuário — não será exibida novamente.
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-muted px-3 py-2 text-lg font-bold tracking-widest">
                {newPassword}
              </code>
              <Button size="icon" variant="outline" onClick={handleCopy}>
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
            <Button className="w-full" onClick={() => { setOpen(false); setNewPassword(null) }}>
              Concluído
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Isso vai gerar uma nova senha temporária e invalidar a atual.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={handleReset}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="size-4 animate-spin" /> : "Confirmar reset"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}