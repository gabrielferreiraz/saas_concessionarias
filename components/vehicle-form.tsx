"use client"

import { useState } from "react"
import { createVehicleAction } from "@/src/actions/vehicles"
import { useToast } from "@/hooks/use-toast"
import { ImageUploader } from "@/components/image-uploader"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field"
import { Car, Loader2, Save, X } from "lucide-react"

interface UploadedImage {
  id: string
  file: File
  preview: string
}

interface VehicleFormData {
  make: string
  model: string
  year: string
  km: string
  price: string
  color: string
  fuelType: string
  highlights: string[]
  description: string
}

const MAKES = [
  "Audi",
  "BMW",
  "Ferrari",
  "Lamborghini",
  "Land Rover",
  "Maserati",
  "Mercedes-Benz",
  "Porsche",
  "Rolls-Royce",
  "Volvo",
]

const FUEL_TYPES = [
  { value: "gasolina", label: "Gasolina" },
  { value: "etanol", label: "Etanol" },
  { value: "flex", label: "Flex" },
  { value: "diesel", label: "Diesel" },
  { value: "eletrico", label: "Elétrico" },
  { value: "hibrido", label: "Híbrido" },
]

const COLORS = [
  "Branco",
  "Preto",
  "Prata",
  "Cinza",
  "Vermelho",
  "Azul",
  "Verde",
  "Marrom",
  "Bege",
  "Amarelo",
  "Laranja",
]

const HIGHLIGHTS = [
  { id: "teto-solar", label: "Teto Solar" },
  { id: "bancos-couro", label: "Bancos em Couro" },
  { id: "blindado", label: "Blindado" },
  { id: "tracao-4x4", label: "Tração 4x4" },
  { id: "multimidia", label: "Multimídia" },
  { id: "camera-re", label: "Câmera de Ré" },
  { id: "piloto-automatico", label: "Piloto Automático" },
  { id: "ar-digital", label: "Ar Digital" },
  { id: "sensor-estacionamento", label: "Sensor de Estacionamento" },
  { id: "farois-led", label: "Faróis LED" },
]

function parsePriceToNumber(value: string): number {
  if (!value) return 0
  const cleaned = value.replace(/\s/g, "").replace("R$", "").replace(/\./g, "").replace(",", ".")
  return parseFloat(cleaned) || 0
}

function parseKmToNumber(value: string): number {
  if (!value) return 0
  return parseInt(value.replace(/\D/g, ""), 10) || 0
}

const INITIAL_FORM_DATA: VehicleFormData = {
  make: "",
  model: "",
  year: "",
  km: "",
  price: "",
  color: "",
  fuelType: "",
  highlights: [],
  description: "",
}

export function VehicleForm() {
  const { toast } = useToast()
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isPending, setIsPending] = useState(false)
  const [formData, setFormData] = useState<VehicleFormData>(INITIAL_FORM_DATA)

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (!numbers) return ""
    const amount = parseInt(numbers, 10) / 100
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const formatKm = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (!numbers) return ""
    return parseInt(numbers, 10).toLocaleString("pt-BR")
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setFormData((prev) => ({ ...prev, price: formatted }))
  }

  const handleKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatKm(e.target.value)
    setFormData((prev) => ({ ...prev, km: formatted }))
  }

  const handleHighlightToggle = (highlightId: string) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.includes(highlightId)
        ? prev.highlights.filter((id) => id !== highlightId)
        : [...prev.highlights, highlightId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const filesToUpload = images.map((img) => img.file)

    if (filesToUpload.length === 0) {
      toast({
        title: "Selecione pelo menos uma foto",
        description: "A primeira imagem será usada como capa do veículo.",
        variant: "destructive",
      })
      return
    }

    if (filesToUpload.length > 10) {
      toast({
        title: "Limite de imagens excedido",
        description: "Você pode enviar no máximo 10 fotos por veículo.",
        variant: "destructive",
      })
      return
    }

    setIsPending(true)
    try {
      await createVehicleAction({
        make: formData.make || "",
        model: formData.model || "",
        year: formData.year ? parseInt(formData.year, 10) : new Date().getFullYear(),
        price: parsePriceToNumber(formData.price),
        km: parseKmToNumber(formData.km),
        description: formData.description || undefined,
        featured: false,
        status: "AVAILABLE",
        imageFiles: filesToUpload,
      })
      setFormData(INITIAL_FORM_DATA)
      images.forEach((img) => URL.revokeObjectURL(img.preview))
      setImages([])
      toast({
        title: "Veículo cadastrado com sucesso!",
      })
    } catch (err) {
      toast({
        title: "Erro ao cadastrar",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  const handleCancel = () => {
    setFormData(INITIAL_FORM_DATA)
    images.forEach((img) => URL.revokeObjectURL(img.preview))
    setImages([])
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Car className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Novo Veículo</h1>
          <p className="text-sm text-muted-foreground">
            Preencha as informações do veículo para adicionar ao estoque
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Column 1: Image Upload */}
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-foreground">Fotos do Veículo</h2>
            <p className="text-xs text-muted-foreground mt-1">
              A primeira imagem será usada como capa
            </p>
          </div>
          <ImageUploader
            images={images}
            onImagesChange={setImages}
            maxImages={10}
          />
        </div>

        {/* Column 2: Form Fields */}
        <div className="space-y-6">
          <FieldGroup>
            {/* Make & Model Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="make">Marca</FieldLabel>
                <Select
                  value={formData.make}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, make: value }))
                  }
                >
                  <SelectTrigger id="make" className="w-full">
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {MAKES.map((make) => (
                      <SelectItem key={make} value={make.toLowerCase()}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="model">Modelo</FieldLabel>
                <Input
                  id="model"
                  placeholder="Ex: X5, Classe C, 911..."
                  value={formData.model}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, model: e.target.value }))
                  }
                />
              </Field>
            </div>

            {/* Year & KM Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="year">Ano</FieldLabel>
                <Select
                  value={formData.year}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, year: value }))
                  }
                >
                  <SelectTrigger id="year" className="w-full">
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="km">Quilometragem</FieldLabel>
                <Input
                  id="km"
                  placeholder="0"
                  value={formData.km}
                  onChange={handleKmChange}
                />
              </Field>
            </div>

            {/* Price */}
            <Field>
              <FieldLabel htmlFor="price">Preço</FieldLabel>
              <Input
                id="price"
                placeholder="R$ 0,00"
                value={formData.price}
                onChange={handlePriceChange}
                className="text-lg font-semibold"
              />
            </Field>

            {/* Color & Fuel Type Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="color">Cor</FieldLabel>
                <Select
                  value={formData.color}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, color: value }))
                  }
                >
                  <SelectTrigger id="color" className="w-full">
                    <SelectValue placeholder="Selecione a cor" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((color) => (
                      <SelectItem key={color} value={color.toLowerCase()}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="fuel">Combustível</FieldLabel>
                <Select
                  value={formData.fuelType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, fuelType: value }))
                  }
                >
                  <SelectTrigger id="fuel" className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUEL_TYPES.map((fuel) => (
                      <SelectItem key={fuel.value} value={fuel.value}>
                        {fuel.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </FieldGroup>

          {/* Highlights Section */}
          <FieldSet>
            <FieldLegend variant="label">Destaques</FieldLegend>
            <p className="text-xs text-muted-foreground -mt-2 mb-3">
              Selecione os opcionais e características do veículo
            </p>
            <div className="grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((highlight) => (
                <label
                  key={highlight.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <Checkbox
                    checked={formData.highlights.includes(highlight.id)}
                    onCheckedChange={() => handleHighlightToggle(highlight.id)}
                  />
                  <span className="text-sm text-foreground">{highlight.label}</span>
                </label>
              ))}
            </div>
          </FieldSet>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description">Descrição Adicional</FieldLabel>
            <Textarea
              id="description"
              placeholder="Descreva detalhes adicionais, histórico do veículo, estado de conservação..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="min-h-[120px] resize-none"
            />
          </Field>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Cancelar
        </Button>
        <Button type="submit" className="gap-2" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Veículo
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
