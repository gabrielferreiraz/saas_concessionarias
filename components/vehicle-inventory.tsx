"use client"

import { useState, useMemo, useEffect } from "react"
import { VehicleCard } from "./vehicle-card"
import { FilterSidebar } from "./filter-sidebar"
import { Car } from "lucide-react"

type VehicleImage = {
  url: string
  isCover: boolean
  order: number
}

export type InventoryVehicle = {
  id: string
  make: string
  model: string
  year: number
  price: number
  km: number
  images: VehicleImage[]
}

interface VehicleInventoryProps {
  initialVehicles: InventoryVehicle[]
}

export function VehicleInventory({ initialVehicles }: VehicleInventoryProps) {
  const { minPrice, maxPrice } = useMemo(() => {
    if (initialVehicles.length === 0) {
      return { minPrice: 0, maxPrice: 1_000_000 }
    }

    const prices = initialVehicles.map((v) => v.price)
    let min = Math.min(...prices)
    let max = Math.max(...prices)

    if (min === max) {
      max = min + 10_000
    }

    return { minPrice: min, maxPrice: max }
  }, [initialVehicles])

  const availableMakes = useMemo(
    () => Array.from(new Set(initialVehicles.map((v) => v.make))).sort(),
    [initialVehicles]
  )

  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice])

  useEffect(() => {
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const filteredVehicles = useMemo(() => {
    return initialVehicles.filter((vehicle) => {
      // Make filter
      if (selectedMakes.length > 0) {
        if (!selectedMakes.includes(vehicle.make)) {
          return false
        }
      }

      // Price filter
      if (vehicle.price < priceRange[0] || vehicle.price > priceRange[1]) {
        return false
      }

      return true
    })
  }, [initialVehicles, selectedMakes, priceRange])

  const handleClearFilters = () => {
    setSelectedMakes([])
    setPriceRange([minPrice, maxPrice])
  }

  if (initialVehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Car className="size-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">
          Nenhum veículo no estoque no momento
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Assim que novos veículos forem cadastrados na loja, eles aparecerão aqui.
        </p>
      </div>
    )
  }

  return (
    <div className="flex gap-8">
      <FilterSidebar
        availableMakes={availableMakes}
        selectedMakes={selectedMakes}
        priceRange={priceRange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMakeChange={setSelectedMakes}
        onPriceChange={setPriceRange}
        onClearFilters={handleClearFilters}
      />

      <div className="flex-1">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filteredVehicles.length}</span>{" "}
            {filteredVehicles.length === 1 ? "veículo encontrado" : "veículos encontrados"}
          </p>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => {
              const coverImage =
                vehicle.images.find((img) => img.isCover) ?? vehicle.images[0]

              const imageUrl =
                coverImage?.url ??
                "https://placehold.co/800x600?text=Ve%C3%ADculo+sem+foto"

              return (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={{
                    id: vehicle.id,
                    make: vehicle.make,
                    model: vehicle.model,
                    year: vehicle.year,
                    price: vehicle.price,
                    mileage: vehicle.km,
                    transmission: "Automático",
                    imageUrl,
                  }}
                />
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Car className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">
              Nenhum veículo encontrado
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Tente ajustar os filtros para encontrar o veículo ideal para você.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
