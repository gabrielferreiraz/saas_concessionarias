"use client"

import { useCallback, useState, useRef } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoUploaderProps {
  label: string
  description?: string
  currentImage?: string | null
  onImageChange: (image: { file: File; preview: string } | null) => void
  aspectRatio?: "square" | "wide"
  maxSize?: string
}

export function LogoUploader({
  label,
  description,
  currentImage,
  onImageChange,
  aspectRatio = "wide",
  maxSize = "2MB",
}: LogoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFile = useCallback(
    (file: File | null) => {
      if (!file || !file.type.startsWith("image/")) return

      const reader = new FileReader()
      reader.onloadend = () => {
        const previewUrl = reader.result as string
        setPreview(previewUrl)
        onImageChange({ file, preview: previewUrl })
      }
      reader.readAsDataURL(file)
    },
    [onImageChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      processFile(file)
    },
    [processFile]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        processFile(file)
      }
      e.target.value = ""
    },
    [processFile]
  )

  const removeImage = useCallback(() => {
    setPreview(null)
    onImageChange(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }, [onImageChange])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {preview && (
          <button
            type="button"
            onClick={removeImage}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            Remover
          </button>
        )}
      </div>

      {preview ? (
        <div
          className={cn(
            "relative flex items-center justify-center rounded-lg border bg-muted/30 p-6",
            aspectRatio === "square" ? "aspect-square w-32" : "h-28 w-full"
          )}
        >
          <img
            src={preview}
            alt={label}
            className={cn(
              "max-h-full max-w-full object-contain",
              aspectRatio === "square" ? "h-20 w-20" : "h-16"
            )}
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/50 hover:bg-muted/30",
            aspectRatio === "square" ? "aspect-square w-32" : "h-28 w-full"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 cursor-pointer opacity-0"
          />

          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Upload className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-foreground">
                Arraste ou clique
              </p>
              <p className="text-[10px] text-muted-foreground">
                PNG, JPG (máx. {maxSize})
              </p>
            </div>
          </div>
        </label>
      )}

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
