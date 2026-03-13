"use client"

import { useState, useCallback } from "react"
import { Pipette } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  description?: string
}

export function ColorPicker({
  label,
  value,
  onChange,
  description,
}: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value)

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      onChange(newValue)
    },
    [onChange]
  )

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value
      
      // Auto-add # if missing
      if (newValue && !newValue.startsWith("#")) {
        newValue = "#" + newValue
      }
      
      setInputValue(newValue)
      
      // Only update if valid hex
      if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
        onChange(newValue)
      }
    },
    [onChange]
  )

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      <div className="flex items-center gap-3">
        {/* Color Preview & Picker */}
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={handleColorChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm transition-all hover:scale-105"
            style={{ backgroundColor: value }}
          >
            <Pipette className="h-4 w-4 text-white drop-shadow-md" />
          </div>
        </div>

        {/* Hex Input */}
        <div className="flex-1">
          <Input
            value={inputValue}
            onChange={handleTextChange}
            placeholder="#000000"
            className="font-mono text-sm uppercase"
            maxLength={7}
          />
        </div>
      </div>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
