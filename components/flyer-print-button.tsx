"use client"

import { useState } from "react"
import { Download, Link2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FlyerActionsProps {
  publicUrl: string
}

export function FlyerActions({ publicUrl }: FlyerActionsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }

  }

  return (
    <div className="flex items-center gap-2 print:hidden">
      <Button
        type="button"
        className="gap-2"
        onClick={() => window.print()}
      >
        <Download className="size-4" />
        Baixar PDF
      </Button>
      <Button
        type="button"
        variant="outline"
        className="gap-2"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="size-4" />
            Link copiado
          </>
        ) : (
          <>
            <Link2 className="size-4" />
            Copiar link do flyer
          </>
        )}

      </Button>
    </div>
  )
}


