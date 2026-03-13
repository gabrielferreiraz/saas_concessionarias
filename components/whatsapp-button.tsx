"use client"

import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  vehicleName?: string
  className?: string
  variant?: "fixed" | "inline"
}

export function WhatsAppButton({
  phoneNumber,
  message,
  vehicleName,
  className,
  variant = "inline",
}: WhatsAppButtonProps) {
  const defaultMessage = vehicleName
    ? `Olá! Tenho interesse no veículo ${vehicleName}. Poderia me enviar mais informações?`
    : "Olá! Gostaria de mais informações sobre os veículos disponíveis."

  const encodedMessage = encodeURIComponent(message || defaultMessage)
  const cleanPhone = phoneNumber.replace(/\D/g, "")
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`

  if (variant === "fixed") {
    return (
      <>
        {/* Mobile Fixed Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3.5 font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl lg:hidden",
            "bg-whatsapp text-whatsapp-foreground",
            className
          )}
        >
          <MessageCircle className="h-5 w-5" />
          <span>WhatsApp</span>
        </a>
      </>
    )
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-lg px-6 py-3.5 font-semibold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        "bg-whatsapp text-whatsapp-foreground",
        className
      )}
    >
      <MessageCircle className="h-5 w-5" />
      <span>Chamar no WhatsApp</span>
    </a>
  )
}
