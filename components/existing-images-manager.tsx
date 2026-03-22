"use client"

import { useState } from "react"
import { X, Star, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    deleteVehicleImageAction,
    setCoverImageAction,
} from "@/src/actions/vehicles"

interface ExistingImage {
    id: string
    url: string
    isCover: boolean
    order: number
}

interface ExistingImagesManagerProps {
    vehicleId: string
    initialImages: ExistingImage[]
}

export function ExistingImagesManager({
    vehicleId,
    initialImages,
}: ExistingImagesManagerProps) {
    const [images, setImages] = useState(initialImages)
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleDelete = async (imageId: string) => {
        if (!confirm("Remover esta foto permanentemente?")) return
        setLoadingId(imageId)
        const result = await deleteVehicleImageAction(imageId)
        setLoadingId(null)
        if (result.success) {
            setImages((prev) => prev.filter((img) => img.id !== imageId))
        } else {
            alert(result.error)
        }
    }

    const handleSetCover = async (imageId: string) => {
        setLoadingId(imageId)
        const result = await setCoverImageAction(imageId, vehicleId)
        setLoadingId(null)
        if (result.success) {
            setImages((prev) =>
                prev.map((img) => ({ ...img, isCover: img.id === imageId }))
            )
        } else {
            alert(result.error)
        }
    }

    if (images.length === 0) {
        return (
            <p className="text-xs text-muted-foreground">
                Nenhuma foto cadastrada.
            </p>
        )
    }

    return (
        <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
                Fotos atuais — clique na estrela para definir a capa, no X para remover
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {images
                    .sort((a, b) => a.order - b.order)
                    .map((img) => (
                        <div
                            key={img.id}
                            className={cn(
                                "group relative aspect-square overflow-hidden rounded-md bg-muted",
                                img.isCover && "ring-2 ring-primary ring-offset-1"
                            )}
                        >
                            <img
                                src={img.url}
                                alt="Foto do veículo"
                                className="h-full w-full object-cover"
                            />

                            {img.isCover && (
                                <span className="absolute bottom-1 left-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                                    Capa
                                </span>
                            )}

                            {loadingId === img.id ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <Loader2 className="size-5 animate-spin text-white" />
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                    {!img.isCover && (
                                        <button
                                            type="button"
                                            onClick={() => handleSetCover(img.id)}
                                            className="flex size-7 items-center justify-center rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                                            title="Definir como capa"
                                        >
                                            <Star className="size-3.5" />
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(img.id)}
                                        className="flex size-7 items-center justify-center rounded-full bg-card text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                        title="Remover foto"
                                    >
                                        <X className="size-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}