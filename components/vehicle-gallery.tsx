"use client"

import { useState } from "react"
import Image from "next/image"
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

export function VehicleGallery({
  images,
  make,
  model,
  coverUrl,
}: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const displayImages = images.length > 0 ? images : [{ id: "fallback", url: coverUrl }]
  const mainUrl = displayImages[selectedIndex]?.url ?? coverUrl

  return (
    <div className="space-y-4">
      {/* Imagem principal */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={mainUrl}
          alt={`${make} ${model} - foto ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Miniaturas: carrossel horizontal touch-friendly */}
      {displayImages.length > 1 && (
        <div className="-mx-1 overflow-x-auto pb-2 scroll-smooth touch-pan-x">
          <div className="flex gap-2 min-w-0">
            {displayImages.map((img, index) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative flex-shrink-0 overflow-hidden rounded-md bg-muted transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 touch-manipulation",
                  "min-h-[44px] min-w-[44px] w-[72px] h-[52px] sm:w-[88px] sm:h-[64px]",
                  selectedIndex === index
                    ? "ring-2 ring-primary ring-offset-2 opacity-100"
                    : "opacity-70 hover:opacity-90"
                )}
                aria-label={`Ver foto ${index + 1} de ${displayImages.length}`}
                aria-pressed={selectedIndex === index}
              >
                <Image
                  src={img.url}
                  alt={`${make} ${model} - miniatura ${index + 1}`}
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
