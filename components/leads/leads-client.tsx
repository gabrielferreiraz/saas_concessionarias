"use client"

import { useState } from "react"
import Image from "next/image"
import {
    MessageCircle, Phone, Clock, Link2, Copy,
    Check, Car, ExternalLink, User, Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog, DialogContent, DialogDescription,
    DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
    updateLeadStatusAction,
    updateLeadAssigneeAction,
} from "@/src/actions/leads"

type AttendanceStatus = "PENDING" | "IN_PROGRESS" | "DONE"

interface LeadData {
    id: string
    contactName: string | null
    contactPhone: string | null
    attendanceStatus: AttendanceStatus
    assignedTo: string | null
    createdAt: string
    vehicle: {
        id: string
        make: string
        model: string
        year: number
        price: number
        km: number
        image: string | null
    } | null
}

const statusConfig: Record<AttendanceStatus, { label: string; className: string }> = {
    PENDING: { label: "Pendente", className: "bg-amber-100 text-amber-700 border-amber-200" },
    IN_PROGRESS: { label: "Em Atendimento", className: "bg-blue-100 text-blue-700 border-blue-200" },
    DONE: { label: "Finalizado", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
}

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

function formatTimeAgo(dateStr: string): string {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    if (diffMins < 60) return `Há ${diffMins} minutos`
    if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? "s" : ""}`
    return `Há ${diffDays} dia${diffDays > 1 ? "s" : ""}`
}

function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 })
}

function formatKm(km: number) {
    return km.toLocaleString("pt-BR") + " km"
}

function QuickResponsePopover({ lead }: { lead: LeadData }) {
    const vehicleName = lead.vehicle
        ? `${lead.vehicle.make} ${lead.vehicle.model}`
        : "veículo"
    const phone = lead.contactPhone?.replace(/\D/g, "") ?? ""

    const handleSend = (message: string) => {
        const text = message.replace("{veiculo}", vehicleName)
        const url = phone.length >= 10
            ? `https://wa.me/55${phone}?text=${encodeURIComponent(text)}`
            : `https://wa.me/?text=${encodeURIComponent(text)}`
        window.open(url, "_blank")
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" className="bg-[#25D366] text-white hover:bg-[#20BD5A]">
                    <MessageCircle className="size-4" />
                    <span className="hidden sm:inline">Responder</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="border-b p-3">
                    <h4 className="text-sm font-medium">Respostas Rápidas</h4>
                    <p className="text-xs text-muted-foreground">Enviar via WhatsApp</p>
                </div>
                <div className="flex flex-col">
                    {quickResponses.map((r) => (
                        <button
                            key={r.id}
                            onClick={() => handleSend(r.message)}
                            className="flex items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-muted"
                        >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10">
                                <MessageCircle className="size-4 text-[#25D366]" />
                            </div>
                            <span>{r.label}</span>
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

function SmartLinkDialog({ lead }: { lead: LeadData }) {
    const [copied, setCopied] = useState(false)
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "autosstock.uk"
    const vehicleUrl = lead.vehicle
        ? `${typeof window !== "undefined" ? window.location.origin : ""}/veiculo/${lead.vehicle.id}`
        : ""

    const handleCopy = async () => {
        await navigator.clipboard.writeText(vehicleUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (!lead.vehicle) return null

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Link2 className="size-4" />
                    <span className="hidden sm:inline">Link</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Link do Veículo</DialogTitle>
                    <DialogDescription>
                        Compartilhe com o cliente para ver os detalhes.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    {lead.vehicle.image && (
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
                                <h3 className="font-semibold">{lead.vehicle.make} {lead.vehicle.model}</h3>
                                <p className="mt-1 text-2xl font-bold">{formatPrice(lead.vehicle.price)}</p>
                                <div className="mt-2 flex gap-2">
                                    <Badge variant="secondary">{lead.vehicle.year}</Badge>
                                    <Badge variant="secondary">{formatKm(lead.vehicle.km)}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 truncate rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground">
                            {vehicleUrl}
                        </div>
                        <Button onClick={handleCopy} size="sm">
                            {copied ? <><Check className="size-4" /> Copiado</> : <><Copy className="size-4" /> Copiar</>}
                        </Button>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => window.open(vehicleUrl, "_blank")}>
                        <ExternalLink className="size-4" />
                        Abrir página do veículo
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function LeadRow({
    lead,
    onStatusChange,
    onAssigneeChange,
    isFirst,
}: {
    lead: LeadData
    onStatusChange: (id: string, status: AttendanceStatus) => void
    onAssigneeChange: (id: string, assignedTo: string) => void
    isFirst: boolean
}) {
    const status = statusConfig[lead.attendanceStatus]
    const imageUrl = lead.vehicle?.image ?? "https://placehold.co/80x60?text=Sem+foto"

    return (
        <div className="flex flex-col gap-4 border-b p-4 last:border-b-0 hover:bg-muted/30 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-start gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg sm:size-20 bg-muted">
                    <Image
                        src={imageUrl}
                        alt={lead.vehicle ? `${lead.vehicle.make} ${lead.vehicle.model}` : "Veículo"}
                        fill
                        className="object-cover"
                        priority={isFirst}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-medium">
                                {lead.contactName ?? "Visitante anônimo"}
                            </h3>
                            {lead.contactPhone && (
                                <div className="mt-0.5 flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="size-3" />
                                    <span>{lead.contactPhone}</span>
                                </div>
                            )}
                        </div>
                        <Badge className={cn("shrink-0", status.className)}>
                            {status.label}
                        </Badge>
                    </div>
                    {lead.vehicle && (
                        <div className="mt-2 flex items-center gap-2">
                            <Car className="size-3 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                {lead.vehicle.make} {lead.vehicle.model}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {formatPrice(lead.vehicle.price)}
                            </span>
                        </div>
                    )}
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        <span>{formatTimeAgo(lead.createdAt)}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                <Select
                    value={lead.attendanceStatus}
                    onValueChange={(v) => onStatusChange(lead.id, v as AttendanceStatus)}
                >
                    <SelectTrigger className="h-8 w-[150px] text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PENDING">Pendente</SelectItem>
                        <SelectItem value="IN_PROGRESS">Em Atendimento</SelectItem>
                        <SelectItem value="DONE">Finalizado</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                    <SmartLinkDialog lead={lead} />
                    <QuickResponsePopover lead={lead} />
                </div>
            </div>
        </div>
    )
}

export function LeadsClient({
    leads: initialLeads,
    storeId,
}: {
    leads: LeadData[]
    storeId: string
}) {
    const [leads, setLeads] = useState(initialLeads)
    const [filter, setFilter] = useState<AttendanceStatus | "todos">("todos")

    const handleStatusChange = async (id: string, status: AttendanceStatus) => {
        setLeads((prev) => prev.map((l) => l.id === id ? { ...l, attendanceStatus: status } : l))
        await updateLeadStatusAction(id, status)
    }

    const handleAssigneeChange = async (id: string, assignedTo: string) => {
        setLeads((prev) => prev.map((l) => l.id === id ? { ...l, assignedTo } : l))
        await updateLeadAssigneeAction(id, assignedTo)
    }

    const filtered = filter === "todos"
        ? leads
        : leads.filter((l) => l.attendanceStatus === filter)

    const counts = {
        todos: leads.length,
        PENDING: leads.filter((l) => l.attendanceStatus === "PENDING").length,
        IN_PROGRESS: leads.filter((l) => l.attendanceStatus === "IN_PROGRESS").length,
        DONE: leads.filter((l) => l.attendanceStatus === "DONE").length,
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Gestão de Leads</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Central de atendimento ao cliente
                </p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    { key: "todos", label: "Total", value: counts.todos, color: "ring-primary" },
                    { key: "PENDING", label: "Pendentes", value: counts.PENDING, color: "ring-amber-500", textColor: "text-amber-600" },
                    { key: "IN_PROGRESS", label: "Em Atendimento", value: counts.IN_PROGRESS, color: "ring-blue-500", textColor: "text-blue-600" },
                    { key: "DONE", label: "Finalizados", value: counts.DONE, color: "ring-emerald-500", textColor: "text-emerald-600" },
                ].map((stat) => (
                    <Card
                        key={stat.key}
                        className={cn(
                            "cursor-pointer transition-all hover:shadow-md",
                            filter === stat.key && `ring-2 ${stat.color}`
                        )}
                        onClick={() => setFilter(stat.key as AttendanceStatus | "todos")}
                    >
                        <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className={cn("text-2xl font-bold", stat.textColor ?? "text-foreground")}>
                                {stat.value}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Lista */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                    <CardTitle className="text-base font-medium">Leads Recebidos</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Filter className="size-4" />
                        <span>{filter === "todos" ? "Todos" : statusConfig[filter as AttendanceStatus]?.label}</span>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <MessageCircle className="size-12 text-muted-foreground/30" />
                            <p className="mt-4 text-muted-foreground">Nenhum lead encontrado</p>
                            {leads.length === 0 && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Os leads aparecem aqui quando visitantes clicam no botão WhatsApp do showroom.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="divide-y">
                            {filtered.map((lead, index) => (
                                <LeadRow
                                    key={lead.id}
                                    lead={lead}
                                    onStatusChange={handleStatusChange}
                                    onAssigneeChange={handleAssigneeChange}
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