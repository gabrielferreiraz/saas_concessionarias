"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateStoreDataAction } from "@/src/actions/super-admin"
import { Loader2, Save } from "lucide-react"
import { useRouter } from "next/navigation"

export function StoreEditForm({
  storeId,
  initialData,
}: {
  storeId: string
  initialData: { name: string; whatsapp: string; primaryColor: string }
}) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [data, setData] = useState(initialData)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    setSuccess(false)
    const result = await updateStoreDataAction(storeId, data)
    setIsPending(false)
    if (result.success) {
      setSuccess(true)
      router.refresh()
    } else {
      alert(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Nome da loja</label>
        <Input
          value={data.name}
          onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">WhatsApp</label>
        <Input
          value={data.whatsapp}
          onChange={(e) => setData((p) => ({ ...p, whatsapp: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Cor principal</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={data.primaryColor}
            onChange={(e) => setData((p) => ({ ...p, primaryColor: e.target.value }))}
            className="h-10 w-14 cursor-pointer rounded-md border"
          />
          <Input
            value={data.primaryColor}
            onChange={(e) => setData((p) => ({ ...p, primaryColor: e.target.value }))}
            placeholder="#000000"
          />
        </div>
      </div>
      <Button type="submit" disabled={isPending} className="w-full gap-2">
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Save className="size-4" />
        )}
        {success ? "Salvo!" : "Salvar alterações"}
      </Button>
    </form>
  )
}