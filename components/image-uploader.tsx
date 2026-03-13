"use client"

import { useCallback, useState } from "react"
import { Upload, X, ImageIcon, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedImage {
  id: string
  file: File
  preview: string
}

interface ImageUploaderProps {
  images: UploadedImage[]
  onImagesChange: (images: UploadedImage[]) => void
  maxImages?: number
}

export function ImageUploader({ 
  images, 
  onImagesChange, 
  maxImages = 10 
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return

    const newImages: UploadedImage[] = []
    const remainingSlots = maxImages - images.length

    Array.from(files).slice(0, remainingSlots).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newImages.push({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          file,
          preview: URL.createObjectURL(file),
        })
      }
    })

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages])
    }
  }, [images, maxImages, onImagesChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }, [processFiles])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files)
    e.target.value = ""
  }, [processFiles])

  const removeImage = useCallback((id: string) => {
    const imageToRemove = images.find(img => img.id === id)
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview)
    }
    onImagesChange(images.filter(img => img.id !== id))
  }, [images, onImagesChange])

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50 hover:bg-muted/30",
          images.length >= maxImages && "pointer-events-none opacity-50"
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={images.length >= maxImages}
        />
        
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Arraste as imagens aqui
            </p>
            <p className="text-xs text-muted-foreground">
              ou clique para selecionar
            </p>
          </div>
          
          <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5">
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              PNG, JPG ou WEBP (máx. {maxImages} imagens)
            </span>
          </div>
        </div>
      </label>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              Imagens ({images.length}/{maxImages})
            </p>
            {images.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  images.forEach(img => URL.revokeObjectURL(img.preview))
                  onImagesChange([])
                }}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Remover todas
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
              >
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                
                {/* First image badge */}
                {index === 0 && (
                  <div className="absolute left-1.5 top-1.5 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                    Capa
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-foreground/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="flex h-7 w-7 cursor-grab items-center justify-center rounded-full bg-card text-foreground"
                  >
                    <GripVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
