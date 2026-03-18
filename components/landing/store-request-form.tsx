"use client"

import { useState } from "react"
import { createStoreRequestAction } from "@/src/actions/store-request"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Loader2 } from "lucide-react"

export function StoreRequestForm() {
  const [isPending, setIsPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [subdomain, setSubdomain] = useState("")

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/^-+/, "")
    setSubdomain(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsPending(true)

    const formData = new FormData(e.currentTarget)

    const result = await createStoreRequestAction({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      whatsapp: formData.get("whatsapp") as string,
      storeName: formData.get("storeName") as string,
      subdomain,
      message: formData.get("message") as string,
    })

    setIsPending(false)

    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.error)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="size-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          Solicitação enviada!
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Recebemos seu pedido. Nossa equipe vai analisar e entrar em contato
          em até 24 horas pelo email ou WhatsApp informado.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="name">
            Seu nome *
          </label>
          <Input
            id="name"
            name="name"
            placeholder="João Silva"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="email">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="joao@concessionaria.com"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="whatsapp">
            WhatsApp *
          </label>
          <Input
            id="whatsapp"
            name="whatsapp"
            placeholder="(67) 99999-0000"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="storeName">
            Nome da concessionária *
          </label>
          <Input
            id="storeName"
            name="storeName"
            placeholder="Auto Premium"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="subdomain">
          Endereço do seu showroom *
        </label>
        <div className="flex items-center gap-0">
          <Input
            id="subdomain"
            name="subdomain"
            placeholder="autopremium"
            value={subdomain}
            onChange={handleSubdomainChange}
            className="rounded-r-none"
            required
          />
          <span className="flex h-10 items-center rounded-r-md border border-l-0 bg-muted px-3 text-sm text-muted-foreground whitespace-nowrap">
            .autosstock.uk
          </span>
        </div>
        {subdomain && (
          <p className="text-xs text-muted-foreground">
            Seu showroom ficará em:{" "}
            <span className="font-medium text-foreground">
              {subdomain}.autosstock.uk
            </span>
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="message">
          Mensagem (opcional)
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Conte um pouco sobre sua concessionária..."
          className="min-h-[80px] resize-none"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full gap-2" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar solicitação"
        )}
      </Button>
    </form>
  )
}