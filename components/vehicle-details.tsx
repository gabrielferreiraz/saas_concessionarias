"use client"

import { VehicleGallery } from "@/components/vehicle-gallery"
import { WhatsAppButton } from "@/components/whatsapp-button"
import {
  Calendar,
  Gauge,
  Cog,
  Palette,
  Fuel,
  Shield,
  Sun,
  Sofa,
  Mountain,
  Monitor,
  Camera,
  Navigation,
  Wind,
  ParkingCircle,
  Lightbulb,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface VehicleOption {
  id: string
  label: string
  icon?: React.ElementType
}

export interface VehicleDetailsData {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  transmission: string
  color: string
  fuelType: string
  images: string[]
  options: string[]
  description: string
}

const OPTION_ICONS: Record<string, React.ElementType> = {
  "teto-solar": Sun,
  "bancos-couro": Sofa,
  blindado: Shield,
  "tracao-4x4": Mountain,
  multimidia: Monitor,
  "camera-re": Camera,
  "piloto-automatico": Navigation,
  "ar-digital": Wind,
  "sensor-estacionamento": ParkingCircle,
  "farois-led": Lightbulb,
}

const OPTION_LABELS: Record<string, string> = {
  "teto-solar": "Teto Solar",
  "bancos-couro": "Bancos em Couro",
  blindado: "Blindado",
  "tracao-4x4": "Tração 4x4",
  multimidia: "Multimídia",
  "camera-re": "Câmera de Ré",
  "piloto-automatico": "Piloto Automático",
  "ar-digital": "Ar Digital",
  "sensor-estacionamento": "Sensor de Estacionamento",
  "farois-led": "Faróis LED",
}

interface VehicleDetailsProps {
  vehicle: VehicleDetailsData
  whatsappNumber: string
}

export function VehicleDetails({ vehicle, whatsappNumber }: VehicleDetailsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("pt-BR").format(mileage)
  }

  const vehicleName = `${vehicle.make} ${vehicle.model} ${vehicle.year}`

  const specs = [
    { icon: Calendar, label: "Ano", value: vehicle.year.toString() },
    { icon: Gauge, label: "Quilometragem", value: `${formatMileage(vehicle.mileage)} km` },
    { icon: Cog, label: "Câmbio", value: vehicle.transmission },
    { icon: Palette, label: "Cor", value: vehicle.color },
    { icon: Fuel, label: "Combustível", value: vehicle.fuelType },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-3">
            <VehicleGallery images={vehicle.images} alt={vehicleName} />
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl">
                {vehicle.make}{" "}
                <span className="font-normal text-muted-foreground">{vehicle.model}</span>
              </h1>
              <p className="mt-3 text-3xl font-bold text-foreground tracking-tight sm:text-4xl">
                {formatPrice(vehicle.price)}
              </p>
            </div>

            {/* WhatsApp Button - Desktop */}
            <div className="hidden lg:block">
              <WhatsAppButton
                phoneNumber={whatsappNumber}
                vehicleName={vehicleName}
                className="w-full"
              />
            </div>

            {/* Specifications Grid */}
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Especificações
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <spec.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{spec.label}</p>
                      <p className="text-sm font-medium text-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Options/Features */}
            {vehicle.options.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-5">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Opcionais
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {vehicle.options.map((optionId) => {
                    const Icon = OPTION_ICONS[optionId] || Check
                    const label = OPTION_LABELS[optionId] || optionId
                    return (
                      <div
                        key={optionId}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span>{label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Description */}
            {vehicle.description && (
              <div className="rounded-lg border border-border bg-card p-5">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Descrição
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed WhatsApp Button - Mobile */}
      <WhatsAppButton
        phoneNumber={whatsappNumber}
        vehicleName={vehicleName}
        variant="fixed"
      />
    </div>
  )
}
