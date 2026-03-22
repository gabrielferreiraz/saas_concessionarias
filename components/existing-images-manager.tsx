"use client"

import { useState } from "react"
import { X, Star, Loader2, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
    deleteVehicleImageAction,
    setCoverImageAction,
    reorderVehicleImagesAction,
} from "@/src/actions/vehicles"

interface ExistingImage {
    id: string
    url: string
    isCover: boolean
    order: number
}

function SortableImage({
    img,
    onDelete,
    onSetCover,
    loadingId,
}: {
    img: ExistingImage
    onDelete: (id: string) => void
    onSetCover: (id: string) => void
    loadingId: string | null
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: img.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
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
                    {/* Drag handle */}
                    <button
                        type="button"
                        className="flex size-7 cursor-grab items-center justify-center rounded-full bg-card text-foreground active:cursor-grabbing"
                        {...attributes}
                        {...listeners}
                        title="Arrastar para reordenar"
                    >
                        <GripVertical className="size-3.5" />
                    </button>

                    {!img.isCover && (
                        <button
                            type="button"
                            onClick={() => onSetCover(img.id)}
                            className="flex size-7 items-center justify-center rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                            title="Definir como capa"
                        >
                            <Star className="size-3.5" />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => onDelete(img.id)}
                        className="flex size-7 items-center justify-center rounded-full bg-card text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        title="Remover foto"
                    >
                        <X className="size-3.5" />
                    </button>
                </div>
            )}
        </div>
    )
}

interface ExistingImagesManagerProps {
    vehicleId: string
    initialImages: ExistingImage[]
}

export function ExistingImagesManager({
    vehicleId,
    initialImages,
}: ExistingImagesManagerProps) {
    const [images, setImages] = useState(
        [...initialImages].sort((a, b) => a.order - b.order)
    )
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = images.findIndex((img) => img.id === active.id)
        const newIndex = images.findIndex((img) => img.id === over.id)
        const newImages = arrayMove(images, oldIndex, newIndex)

        setImages(newImages)

        // Salva automaticamente
        await reorderVehicleImagesAction(
            vehicleId,
            newImages.map((img) => img.id)
        )
    }

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
            <p className="text-xs text-muted-foreground">Nenhuma foto cadastrada.</p>
        )
    }

    return (
        <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
                Arraste para reordenar · ⭐ para definir capa · ✕ para remover
            </p>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={images.map((img) => img.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {images.map((img) => (
                            <SortableImage
                                key={img.id}
                                img={img}
                                onDelete={handleDelete}
                                onSetCover={handleSetCover}
                                loadingId={loadingId}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}