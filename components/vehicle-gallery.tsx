"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface VehicleGalleryImage {
  id: string
  url: string
}

interface VehicleGalleryProps {
  images: VehicleGalleryImage[]
  make: string
  model: string
  coverUrl: string
}

export function VehicleGallery({ images, make, model, coverUrl }: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const displayImages = images.length > 0 ? images : [{ id: "fallback", url: coverUrl }]
  const mainUrl = displayImages[selectedIndex]?.url ?? coverUrl
  const total = displayImages.length

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i === 0 ? total - 1 : i - 1))
  }, [total])

  const next = useCallback(() => {
    setSelectedIndex((i) => (i === total - 1 ? 0 : i + 1))
  }, [total])

  return (
    <div className="space-y-3">
      {/* Imagem principal com setas */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted group">
        <Image
          src={mainUrl}
          alt={`${make} ${model} - foto ${selectedIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-200"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Contador */}
        {total > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
            {selectedIndex + 1} / {total}
          </div>
        )}

        {/* Setas */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 focus:outline-none focus:opacity-100"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 focus:outline-none focus:opacity-100"
              aria-label="Próxima foto"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {total > 1 && (
        <div className="-mx-1 overflow-x-auto pb-2 scroll-smooth touch-pan-x">
          <div className="flex gap-2 px-1">
            {displayImages.map((img, index) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative flex-shrink-0 overflow-hidden rounded-md bg-muted transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  "h-[52px] w-[72px] sm:h-[64px] sm:w-[88px]",
                  selectedIndex === index
                    ? "ring-2 ring-primary ring-offset-2 opacity-100"
                    : "opacity-60 hover:opacity-90"
                )}
                aria-label={`Ver foto ${index + 1}`}
                aria-pressed={selectedIndex === index}
              >
                <Image
                  src={img.url}
                  alt={`${make} ${model} miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="88px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}