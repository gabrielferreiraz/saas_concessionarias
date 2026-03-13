"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  transmission: string
  imageUrl: string
}

interface VehicleCardProps {
  vehicle: Vehicle
  className?: string
}

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
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

  return (
    <article
      className={cn(
        "group relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Make & Model */}
        <h3 className="text-lg font-semibold text-foreground tracking-tight">
          {vehicle.make}{" "}
          <span className="font-normal text-muted-foreground">{vehicle.model}</span>
        </h3>

        {/* Price */}
        <p className="mt-2 text-2xl font-bold text-foreground tracking-tight">
          {formatPrice(vehicle.price)}
        </p>

        {/* Badges */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="px-2 py-1 bg-muted rounded">{vehicle.year}</span>
          <span className="text-border">|</span>
          <span className="px-2 py-1 bg-muted rounded">
            {formatMileage(vehicle.mileage)} km
          </span>
          <span className="text-border">|</span>
          <span className="px-2 py-1 bg-muted rounded">{vehicle.transmission}</span>
        </div>

        {/* CTA Button */}
        <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-primary-foreground bg-primary rounded transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          Ver Detalhes
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  )
}
