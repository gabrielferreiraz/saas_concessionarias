"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface ShowroomFilterBarProps {
  makes: string[]
  minPrice: number
  maxPrice: number
  currentMarca: string | null
  currentPrecoMax: string | null
}

export function ShowroomFilterBar({
  makes,
  minPrice,
  maxPrice,
  currentMarca,
  currentPrecoMax,
}: ShowroomFilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParams = useCallback(
    (updates: { marca?: string | null; precoMax?: string | null }) => {
      const next = new URLSearchParams(searchParams.toString())
      if (updates.marca === undefined) {
        next.delete("marca")
      } else if (updates.marca) {
        next.set("marca", updates.marca)
      }
      if (updates.precoMax === undefined) {
        next.delete("precoMax")
      } else if (updates.precoMax) {
        next.set("precoMax", updates.precoMax)
      }
      router.push(next.toString() ? `/?${next.toString()}` : "/")
    },
    [router, searchParams]
  )

  const priceValue = currentPrecoMax ? Number(currentPrecoMax) : maxPrice
  const hasActiveFilters = currentMarca || (currentPrecoMax && Number(currentPrecoMax) < maxPrice)

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Marca</label>
          <Select
            value={currentMarca ?? "all"}
            onValueChange={(v) => updateParams({ marca: v === "all" ? null : v })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as marcas</SelectItem>
              {makes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[160px]">
          <label className="text-xs font-medium text-muted-foreground">
            Preço máximo
          </label>
          <Slider
            min={minPrice}
            max={maxPrice}
            step={Math.max(1000, Math.round((maxPrice - minPrice) / 100))}
            value={[priceValue]}
            onValueChange={([v]) => updateParams({ precoMax: String(v) })}
            className="w-full"
          />
          <span className="text-xs text-muted-foreground">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 0,
            }).format(priceValue)}
          </span>
        </div>
      </div>
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground"
          onClick={() => router.push("/")}
        >
          <X className="size-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  )
}
