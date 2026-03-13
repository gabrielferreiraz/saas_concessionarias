"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Sun,
  Sofa,
  Shield,
  Mountain,
  Monitor,
  Camera,
  Navigation,
  Wind,
  ParkingCircle,
  Lightbulb,
  Check,
  Download,
  Calendar,
  Gauge,
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

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

export interface VehicleFlyerData {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  image: string
  options: string[]
}

interface VehicleFlyerProps {
  vehicle: VehicleFlyerData
  dealerLogo?: string
  dealerName?: string
  siteUrl: string
}

export function VehicleFlyer({
  vehicle,
  dealerLogo,
  dealerName = "Premium Motors",
  siteUrl,
}: VehicleFlyerProps) {
  const flyerRef = useRef<HTMLDivElement>(null)

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

  const vehicleUrl = `${siteUrl}/veiculo/${vehicle.id}`
  const topOptions = vehicle.options.slice(0, 6)

  const handleGenerateImage = () => {
    // Placeholder for image generation logic
    // This would typically use html2canvas or similar library
    alert("Funcionalidade de geração de imagem será implementada em breve!")
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Flyer Preview */}
      <div
        ref={flyerRef}
        className="relative w-full max-w-[375px] overflow-hidden rounded-xl border border-border bg-card shadow-lg"
        style={{ aspectRatio: "9/16" }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-card to-card" />

        {/* Content */}
        <div className="relative flex h-full flex-col">
          {/* Car Image - Top Section */}
          <div className="relative h-[45%] w-full overflow-hidden">
            <Image
              src={vehicle.image}
              alt={`${vehicle.make} ${vehicle.model}`}
              fill
              className="object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>

          {/* Vehicle Info */}
          <div className="flex flex-1 flex-col justify-between px-5 pb-5 pt-4">
            {/* Make/Model & Price */}
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {vehicle.make}{" "}
                  <span className="font-normal text-muted-foreground">
                    {vehicle.model}
                  </span>
                </h2>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {formatPrice(vehicle.price)}
                </p>
              </div>

              {/* Year & KM Badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {vehicle.year}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1.5">
                  <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {formatMileage(vehicle.mileage)} km
                  </span>
                </div>
              </div>

              {/* Options/Highlights */}
              {topOptions.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Destaques
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {topOptions.map((optionId) => {
                      const Icon = OPTION_ICONS[optionId] || Check
                      const label = OPTION_LABELS[optionId] || optionId
                      return (
                        <div
                          key={optionId}
                          className="flex items-center gap-2 text-xs text-foreground"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10">
                            <Icon className="h-3 w-3 text-primary" />
                          </div>
                          <span className="truncate">{label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Logo & QR Code */}
            <div className="mt-auto flex items-end justify-between pt-4">
              {/* Dealer Logo/Name */}
              <div className="flex items-center gap-2">
                {dealerLogo ? (
                  <Image
                    src={dealerLogo}
                    alt={dealerName}
                    width={40}
                    height={40}
                    className="rounded-md object-contain"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                    <span className="text-lg font-bold text-primary-foreground">
                      {dealerName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {dealerName}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Veículos Premium
                  </p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center gap-1">
                <div className="rounded-lg bg-white p-2">
                  <QRCodeSVG
                    value={vehicleUrl}
                    size={64}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <p className="text-[9px] text-muted-foreground">
                  Escaneie para ver
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Image Button */}
      <Button
        onClick={handleGenerateImage}
        className="w-full max-w-[375px] gap-2"
        size="lg"
      >
        <Download className="h-4 w-4" />
        Gerar Imagem para Compartilhar
      </Button>
    </div>
  )
}
