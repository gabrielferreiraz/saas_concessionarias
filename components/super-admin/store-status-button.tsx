"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateStoreStatusAction } from "@/src/actions/super-admin"
import { ChevronDown, Loader2, CheckCircle, PauseCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

type Status = "ACTIVE" | "SUSPENDED" | "CANCELLED"

const OPTIONS: { value: Status; label: string; icon: React.ElementType }[] = [
  { value: "ACTIVE", label: "Ativar", icon: CheckCircle },
  { value: "SUSPENDED", label: "Suspender", icon: PauseCircle },
  { value: "CANCELLED", label: "Cancelar", icon: XCircle },
]

export function StoreStatusButton({
  storeId,
  currentStatus,
}: {
  storeId: string
  currentStatus: Status
}) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleChange = async (status: Status) => {
    if (status === currentStatus) return
    setIsPending(true)
    const result = await updateStoreStatusAction(storeId, status)
    setIsPending(false)
    if (!result.success) alert(result.error)
    else router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isPending} className="gap-2">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ChevronDown className="size-4" />
          )}
          Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.filter((o) => o.value !== currentStatus).map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => handleChange(opt.value)}
            className="gap-2"
          >
            <opt.icon className="size-4" />
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}