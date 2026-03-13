"use client"

import { useState } from "react"
import { ChevronDown, X, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// As listas de marcas e preços são derivadas dinamicamente pelos componentes pais.

interface FilterSidebarProps {
  className?: string
  availableMakes: string[]
  selectedMakes: string[]
  priceRange: [number, number]
  minPrice: number
  maxPrice: number
  onMakeChange: (makes: string[]) => void
  onPriceChange: (range: [number, number]) => void
  onClearFilters: () => void
}

function FilterContent({
  availableMakes,
  selectedMakes,
  priceRange,
  minPrice,
  maxPrice,
  onMakeChange,
  onPriceChange,
  onClearFilters,
}: Omit<FilterSidebarProps, "className">) {
  const [openSections, setOpenSections] = useState({
    make: true,
    price: true,
  })

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleMakeChange = (makeId: string, checked: boolean) => {
    if (checked) {
      onMakeChange([...selectedMakes, makeId])
    } else {
      onMakeChange(selectedMakes.filter((m) => m !== makeId))
    }
  }

  const hasActiveFilters =
    selectedMakes.length > 0 ||
    priceRange[0] > minPrice ||
    priceRange[1] < maxPrice

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <X className="size-3" />
            Limpar
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {/* Make Filter */}
        <Collapsible open={openSections.make} onOpenChange={() => toggleSection("make")}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
            Marca
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform duration-200",
                openSections.make && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4">
            <div className="flex flex-col gap-2.5 pt-1">
              {availableMakes.map((make) => (
                <label
                  key={make}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    checked={selectedMakes.includes(make)}
                    onCheckedChange={(checked) =>
                      handleMakeChange(make, checked as boolean)
                    }
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {make}
                  </span>
                </label>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range Filter */}
        <Collapsible
          open={openSections.price}
          onOpenChange={() => toggleSection("price")}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors border-t border-border">
            Faixa de Preço
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform duration-200",
                openSections.price && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4">
            <div className="pt-4 px-1">
              <Slider
                value={priceRange}
                onValueChange={(value) => onPriceChange(value as [number, number])}
                min={minPrice}
                max={maxPrice}
                step={Math.max(1000, Math.round((maxPrice - minPrice) / 100))}
                disabled={minPrice === maxPrice}
                className="w-full"
              />
              <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

export function FilterSidebar(props: FilterSidebarProps) {
  const { className, ...filterProps } = props
  const hasActiveFilters =
    props.selectedMakes.length > 0 ||
    props.priceRange[0] > props.minPrice ||
    props.priceRange[1] < props.maxPrice

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col w-64 shrink-0 p-5 bg-card rounded-lg border border-border h-fit sticky top-6",
          className
        )}
      >
        <FilterContent {...filterProps} />
      </aside>

      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="rounded-full shadow-lg px-6 gap-2">
              <SlidersHorizontal className="size-4" />
              Filtros
              {hasActiveFilters && (
                <span className="size-5 flex items-center justify-center bg-primary-foreground text-primary text-xs font-medium rounded-full">
                  {props.selectedMakes.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-6">
            <SheetHeader className="sr-only">
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <FilterContent {...filterProps} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
