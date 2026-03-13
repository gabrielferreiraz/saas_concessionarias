"use client"

import { useState } from "react"
import Image from "next/image"
import {
  MessageCircle,
  Phone,
  Clock,
  Link2,
  Copy,
  Check,
  ChevronDown,
  Car,
  ExternalLink,
  User,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type LeadStatus = "pendente" | "em_atendimento" | "finalizado"

interface Lead {
  id: string
  name: string
  phone: string
  vehicle: {
    id: string
    make: string
    model: string
    year: number
    price: number
    km: number
    image: string
  }
  timestamp: Date
  status: LeadStatus
  vendedor: string | null
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Carlos Silva",
    phone: "(41) 99999-1234",
    vehicle: {
      id: "bmw-x5",
      make: "BMW",
      model: "X5 M50i",
      year: 2023,
      price: 589900,
      km: 12000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    },
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    status: "pendente",
    vendedor: null,
  },
  {
    id: "2",
    name: "Ana Oliveira",
    phone: "(41) 98888-5678",
    vehicle: {
      id: "mercedes-gle",
      make: "Mercedes-Benz",
      model: "GLE 450",
      year: 2023,
      price: 549000,
      km: 8000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    },
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    status: "em_atendimento",
    vendedor: "Ricardo",
  },
  {
    id: "3",
    name: "Pedro Santos",
    phone: "(41) 97777-9012",
    vehicle: {
      id: "porsche-cayenne",
      make: "Porsche",
      model: "Cayenne S",
      year: 2022,
      price: 729900,
      km: 18000,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "em_atendimento",
    vendedor: "Mariana",
  },
  {
    id: "4",
    name: "Fernanda Lima",
    phone: "(41) 96666-3456",
    vehicle: {
      id: "audi-q8",
      make: "Audi",
      model: "Q8 55 TFSI",
      year: 2023,
      price: 619000,
      km: 5000,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    status: "finalizado",
    vendedor: "Ricardo",
  },
  {
    id: "5",
    name: "Roberto Mendes",
    phone: "(41) 95555-7890",
    vehicle: {
      id: "range-rover",
      make: "Land Rover",
      model: "Range Rover Sport",
      year: 2023,
      price: 899000,
      km: 3000,
      image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=400&h=300&fit=crop",
    },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "finalizado",
    vendedor: "Mariana",
  },
]

const vendedores = ["Ricardo", "Mariana", "João", "Camila"]

const quickResponses = [
  {
    id: "1",
    label: "Interesse no veículo",
    message: "Olá! Vi que você se interessou no {veiculo}. Posso te enviar a ficha técnica completa?",
  },
  {
    id: "2",
    label: "Agendar visita",
    message: "Olá! Que bom que você gostou do {veiculo}! Gostaria de agendar uma visita para conhecê-lo pessoalmente?",
  },
  {
    id: "3",
    label: "Condições de pagamento",
    message: "Olá! Sobre o {veiculo}, temos ótimas condições de financiamento. Posso te explicar as opções?",
  },
  {
    id: "4",
    label: "Test drive",
    message: "Olá! Que tal agendar um test drive com o {veiculo}? Tenho certeza que você vai adorar!",
  },
]

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `Há ${diffMins} minutos`
  if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? "s" : ""}`
  return `Há ${diffDays} dia${diffDays > 1 ? "s" : ""}`
}

function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  })
}

function formatKm(km: number): string {
  return km.toLocaleString("pt-BR") + " km"
}

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  pendente: {
    label: "Pendente",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  em_atendimento: {
    label: "Em Atendimento",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  finalizado: {
    label: "Finalizado",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
}

function QuickResponsePopover({ lead }: { lead: Lead }) {
  const vehicleName = `${lead.vehicle.make} ${lead.vehicle.model}`

  const handleSendMessage = (message: string) => {
    const formattedMessage = message.replace("{veiculo}", vehicleName)
    const phoneNumber = lead.phone.replace(/\D/g, "")
    const whatsappUrl = `https://wa.me/55${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
        >
          <MessageCircle className="size-4" />
          <span className="hidden sm:inline">Responder</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b border-border p-3">
          <h4 className="text-sm font-medium">Respostas Rápidas</h4>
          <p className="text-xs text-muted-foreground">
            Selecione uma mensagem para enviar via WhatsApp
          </p>
        </div>
        <div className="flex flex-col">
          {quickResponses.map((response) => (
            <button
              key={response.id}
              onClick={() => handleSendMessage(response.message)}
              className="flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-whatsapp/10">
                <MessageCircle className="size-4 text-whatsapp" />
              </div>
              <span>{response.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function SmartLinkDialog({ lead }: { lead: Lead }) {
  const [copied, setCopied] = useState(false)
  const vehicleUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/veiculo/${lead.vehicle.id}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(vehicleUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Link2 className="size-4" />
          <span className="hidden sm:inline">Smart Link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Link do Veículo</DialogTitle>
          <DialogDescription>
            Compartilhe este link com o cliente para que ele veja os detalhes do veículo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={lead.vehicle.image}
                alt={`${lead.vehicle.make} ${lead.vehicle.model}`}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground">
                {lead.vehicle.make} {lead.vehicle.model}
              </h3>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatPrice(lead.vehicle.price)}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">{lead.vehicle.year}</Badge>
                <Badge variant="secondary">{formatKm(lead.vehicle.km)}</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2">
            <div className="flex-1 truncate rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
              {vehicleUrl}
            </div>
            <Button onClick={handleCopy} variant="default" size="sm">
              {copied ? (
                <>
                  <Check className="size-4" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copiar
                </>
              )}
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(vehicleUrl, "_blank")}
          >
            <ExternalLink className="size-4" />
            Abrir Página do Veículo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LeadRow({
  lead,
  onStatusChange,
  onVendedorChange,
  isFirst = false,
}: {
  lead: Lead
  onStatusChange: (id: string, status: LeadStatus) => void
  onVendedorChange: (id: string, vendedor: string) => void
  isFirst?: boolean
}) {
  const status = statusConfig[lead.status]

  return (
    <div className="flex flex-col gap-4 border-b border-border p-4 transition-colors last:border-b-0 hover:bg-muted/30 sm:flex-row sm:items-center">
      {/* Lead Info */}
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg sm:size-20">
          <Image
            src={lead.vehicle.image}
            alt={`${lead.vehicle.make} ${lead.vehicle.model}`}
            fill
            className="object-cover"
            priority={isFirst}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-foreground">{lead.name}</h3>
              <div className="mt-0.5 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-3" />
                <span>{lead.phone}</span>
              </div>
            </div>
            <Badge className={cn("shrink-0", status.className)}>
              {status.label}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Car className="size-3 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {lead.vehicle.make} {lead.vehicle.model}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatPrice(lead.vehicle.price)}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="size-3" />
            <span>{formatTimeAgo(lead.timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
        {/* Status Selector */}
        <Select
          value={lead.status}
          onValueChange={(value) => onStatusChange(lead.id, value as LeadStatus)}
        >
          <SelectTrigger className="h-8 w-[140px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="em_atendimento">Em Atendimento</SelectItem>
            <SelectItem value="finalizado">Finalizado</SelectItem>
          </SelectContent>
        </Select>

        {/* Vendedor Selector */}
        <Select
          value={lead.vendedor || ""}
          onValueChange={(value) => onVendedorChange(lead.id, value)}
        >
          <SelectTrigger className="h-8 w-[130px] text-xs">
            <User className="size-3" />
            <SelectValue placeholder="Vendedor" />
          </SelectTrigger>
          <SelectContent>
            {vendedores.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <SmartLinkDialog lead={lead} />
          <QuickResponsePopover lead={lead} />
        </div>
      </div>
    </div>
  )
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [filter, setFilter] = useState<LeadStatus | "todos">("todos")

  const handleStatusChange = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    )
  }

  const handleVendedorChange = (id: string, vendedor: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, vendedor } : lead))
    )
  }

  const filteredLeads =
    filter === "todos" ? leads : leads.filter((lead) => lead.status === filter)

  const counts = {
    todos: leads.length,
    pendente: leads.filter((l) => l.status === "pendente").length,
    em_atendimento: leads.filter((l) => l.status === "em_atendimento").length,
    finalizado: leads.filter((l) => l.status === "finalizado").length,
  }

  return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Gestão de Leads
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Central de atendimento ao cliente
          </p>
        </div>
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              filter === "todos" && "ring-2 ring-primary"
            )}
            onClick={() => setFilter("todos")}
          >
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-foreground">
                {counts.todos}
              </p>
            </CardContent>
          </Card>
          <Card
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              filter === "pendente" && "ring-2 ring-amber-500"
            )}
            onClick={() => setFilter("pendente")}
          >
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold text-amber-600">
                {counts.pendente}
              </p>
            </CardContent>
          </Card>
          <Card
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              filter === "em_atendimento" && "ring-2 ring-blue-500"
            )}
            onClick={() => setFilter("em_atendimento")}
          >
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Em Atendimento</p>
              <p className="text-2xl font-bold text-blue-600">
                {counts.em_atendimento}
              </p>
            </CardContent>
          </Card>
          <Card
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              filter === "finalizado" && "ring-2 ring-emerald-500"
            )}
            onClick={() => setFilter("finalizado")}
          >
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Finalizados</p>
              <p className="text-2xl font-bold text-emerald-600">
                {counts.finalizado}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leads List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
            <CardTitle className="text-base font-medium">
              Leads Recebidos
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="size-4" />
              <span>
                {filter === "todos"
                  ? "Todos"
                  : statusConfig[filter as LeadStatus].label}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageCircle className="size-12 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">
                  Nenhum lead encontrado
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredLeads.map((lead, index) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    onStatusChange={handleStatusChange}
                    onVendedorChange={handleVendedorChange}
                    isFirst={index === 0}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
  )
}
