"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  approveStoreRequestAction,
  rejectStoreRequestAction,
} from "@/src/actions/store-request"
import { CheckCircle, XCircle, Loader2, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export function ApproveRejectButtons({ requestId }: { requestId: string }) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [rejectNote, setRejectNote] = useState("")
  const [rejectOpen, setRejectOpen] = useState(false)
  const [approvedPassword, setApprovedPassword] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleApprove = async () => {
    setIsPending(true)
    const result = await approveStoreRequestAction(requestId)
    setIsPending(false)

    if (result.success) {
      setApprovedPassword(result.tempPassword)
    } else {
      alert(result.error)
    }
  }

  const handleReject = async () => {
    setIsPending(true)
    const result = await rejectStoreRequestAction(requestId, rejectNote)
    setIsPending(false)

    if (result.success) {
      setRejectOpen(false)
      router.refresh()
    } else {
      alert(result.error)
    }
  }

  const handleCopy = async () => {
    if (approvedPassword) {
      await navigator.clipboard.writeText(approvedPassword)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Modal de senha após aprovação
  if (approvedPassword) {
    return (
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loja criada com sucesso!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Envie as credenciais abaixo para o lojista. Esta senha não será
              exibida novamente.
            </p>
            <div className="rounded-lg border bg-muted p-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Senha temporária:</span>
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-background px-3 py-2 text-lg font-bold tracking-widest">
                  {approvedPassword}
                </code>
                <Button size="icon" variant="outline" onClick={handleCopy}>
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              TODO: Implementar envio automático por email com Resend ou similar.
            </p>
            <Button
              className="w-full"
              onClick={() => {
                setApprovedPassword(null)
                router.refresh()
              }}
            >
              Concluído
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="flex shrink-0 gap-2">
      <Button
        onClick={handleApprove}
        disabled={isPending}
        className="gap-2 bg-emerald-600 hover:bg-emerald-700"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <CheckCircle className="size-4" />
        )}
        Aprovar
      </Button>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="gap-2" disabled={isPending}>
            <XCircle className="size-4" />
            Rejeitar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar solicitação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Opcional: informe o motivo da rejeição.
            </p>
            <Textarea
              placeholder="Ex: Subdomínio já está reservado, informações incompletas..."
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setRejectOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleReject}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Confirmar Rejeição"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}