"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createVehicleAction, updateVehicleAction } from "@/src/actions/vehicles"
import { useToast } from "@/hooks/use-toast"
import { ImageUploader } from "@/components/image-uploader"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Field, FieldGroup, FieldLabel,
  FieldSet, FieldLegend,
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
  transmission: string
  featured: boolean
  status: "AVAILABLE" | "RESERVED" | "SOLD"
  highlights: string[]
  description: string
}

interface VehicleFormProps {
  editVehicle?: {
    id: string
    make: string
    model: string
    year: number
    km: number
    price: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null  // ← adicionar esta linha
    featured: boolean
    status: "AVAILABLE" | "RESERVED" | "SOLD"
    description?: string | null
  }
}

const MAKES = [
  "Chevrolet", "Fiat", "Volkswagen", "Toyota", "Honda",
  "Hyundai", "Renault", "Ford", "Nissan", "Jeep",
  "Peugeot", "Citroën", "Mitsubishi", "Kia", "BMW",
  "Mercedes-Benz", "Audi", "Volvo", "Land Rover", "Porsche",
  "Ferrari", "Lamborghini", "Maserati", "Rolls-Royce",
].sort()

const FUEL_TYPES = [
  { value: "flex", label: "Flex" },
  { value: "gasolina", label: "Gasolina" },
  { value: "etanol", label: "Etanol" },
  { value: "diesel", label: "Diesel" },
  { value: "eletrico", label: "Elétrico" },
  { value: "hibrido", label: "Híbrido" },
]

const COLORS = [
  "Branco", "Preto", "Prata", "Cinza", "Vermelho",
  "Azul", "Verde", "Marrom", "Bege", "Amarelo", "Laranja",
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

function formatCurrency(value: string): string {
  const numbers = value.replace(/\D/g, "")
  if (!numbers) return ""
  const amount = parseInt(numbers, 10) / 100
  return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function formatKm(value: string): string {
  const numbers = value.replace(/\D/g, "")
  if (!numbers) return ""
  return parseInt(numbers, 10).toLocaleString("pt-BR")
}

function numberToCurrencyString(value: number): string {
  return formatCurrency(String(Math.round(value * 100)))
}

function numberToKmString(value: number): string {
  return formatKm(String(value))
}

export function VehicleForm({ editVehicle }: VehicleFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const isEditing = !!editVehicle

  const [images, setImages] = useState<UploadedImage[]>([])
  const [isPending, setIsPending] = useState(false)
  const [formData, setFormData] = useState<VehicleFormData>({
    make: editVehicle?.make ?? "",
    model: editVehicle?.model ?? "",
    year: editVehicle?.year?.toString() ?? "",
    km: editVehicle ? numberToKmString(editVehicle.km) : "",
    price: editVehicle ? numberToCurrencyString(editVehicle.price) : "",
    color: editVehicle?.color ?? "",
    fuelType: editVehicle?.fuelType ?? "",
    transmission: editVehicle?.transmission ?? "",
    featured: editVehicle?.featured ?? false,
    status: editVehicle?.status ?? "AVAILABLE",
    highlights: [],
    description: editVehicle?.description ?? "",
  })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 35 }, (_, i) => currentYear + 1 - i)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isEditing && images.length === 0) {
      toast({
        title: "Selecione pelo menos uma foto",
        description: "A primeira imagem será usada como capa.",
        variant: "destructive",
      })
      return
    }

    setIsPending(true)

    try {
      if (isEditing) {
        const result = await updateVehicleAction({
          id: editVehicle.id,
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year, 10),
          price: parsePriceToNumber(formData.price),
          km: parseKmToNumber(formData.km),
          color: formData.color || undefined,
          fuelType: formData.fuelType || undefined,
          transmission: formData.transmission || undefined,
          description: formData.description || undefined,
          featured: formData.featured,
          status: formData.status,
        })

        if (!result.success) throw new Error(result.error)

        toast({ title: "Veículo atualizado com sucesso!" })
      } else {
        await createVehicleAction({
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year, 10) || currentYear,
          price: parsePriceToNumber(formData.price),
          km: parseKmToNumber(formData.km),
          color: formData.color || undefined,
          fuelType: formData.fuelType || undefined,
          transmission: formData.transmission || undefined,
          description: formData.description || undefined,
          featured: formData.featured,
          status: formData.status,
          imageFiles: images.map((img) => img.file),
        })

        toast({ title: "Veículo cadastrado com sucesso!" })
      }

      router.push("/admin/estoque")
      router.refresh()
    } catch (err) {
      toast({
        title: "Erro ao salvar",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Car className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            {isEditing ? "Editar Veículo" : "Novo Veículo"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEditing
              ? "Atualize as informações do veículo"
              : "Preencha as informações para adicionar ao estoque"}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Coluna 1: Fotos (só no cadastro) */}
        {!isEditing && (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium">Fotos do Veículo</h2>
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
        )}

        {/* Coluna 2: Campos */}
        <div className={`space-y-6 ${isEditing ? "lg:col-span-2" : ""}`}>
          <FieldGroup>
            {/* Marca e Modelo */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="make">Marca *</FieldLabel>
                <Select
                  value={formData.make}
                  onValueChange={(v) => setFormData((p) => ({ ...p, make: v }))}
                >
                  <SelectTrigger id="make">
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
                <FieldLabel htmlFor="model">Modelo *</FieldLabel>
                <Input
                  id="model"
                  placeholder="Ex: Onix, Gol, Corolla..."
                  value={formData.model}
                  onChange={(e) => setFormData((p) => ({ ...p, model: e.target.value }))}
                  required
                />
              </Field>
            </div>

            {/* Ano e KM */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="year">Ano *</FieldLabel>
                <Select
                  value={formData.year}
                  onValueChange={(v) => setFormData((p) => ({ ...p, year: v }))}
                >
                  <SelectTrigger id="year">
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
                <FieldLabel htmlFor="km">Quilometragem *</FieldLabel>
                <Input
                  id="km"
                  placeholder="0"
                  value={formData.km}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, km: formatKm(e.target.value) }))
                  }
                  required
                />
              </Field>
            </div>

            {/* Preço */}
            <Field>
              <FieldLabel htmlFor="price">Preço *</FieldLabel>
              <Input
                id="price"
                placeholder="R$ 0,00"
                value={formData.price}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, price: formatCurrency(e.target.value) }))
                }
                className="text-lg font-semibold"
                required
              />
            </Field>

            {/* Cor e Combustível */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="color">Cor</FieldLabel>
                <Select
                  value={formData.color}
                  onValueChange={(v) => setFormData((p) => ({ ...p, color: v }))}
                >
                  <SelectTrigger id="color">
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
                  onValueChange={(v) => setFormData((p) => ({ ...p, fuelType: v }))}
                >
                  <SelectTrigger id="fuel">
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

              <Field>
                <FieldLabel htmlFor="transmission">Câmbio</FieldLabel>
                <Select
                  value={formData.transmission}
                  onValueChange={(v) => setFormData((p) => ({ ...p, transmission: v }))}
                >
                  <SelectTrigger id="transmission">
                    <SelectValue placeholder="Selecione o câmbio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatico">Automático</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                    <SelectItem value="automatizado">Automatizado</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Status */}
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select
                value={formData.status}
                onValueChange={(v) =>
                  setFormData((p) => ({
                    ...p,
                    status: v as "AVAILABLE" | "RESERVED" | "SOLD",
                  }))
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AVAILABLE">Disponível</SelectItem>
                  <SelectItem value="RESERVED">Reservado</SelectItem>
                  <SelectItem value="SOLD">Vendido</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Destaque */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Veículo em Destaque</p>
                <p className="text-xs text-muted-foreground">
                  Aparece na seção de destaques do showroom
                </p>
              </div>
              <Switch
                checked={formData.featured}
                onCheckedChange={(v) => setFormData((p) => ({ ...p, featured: v }))}
              />
            </div>
          </FieldGroup>

          {/* Destaques/Opcionais */}
          <FieldSet>
            <FieldLegend variant="label">Opcionais</FieldLegend>
            <p className="text-xs text-muted-foreground -mt-2 mb-3">
              Selecione os opcionais do veículo
            </p>
            <div className="grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((highlight) => (
                <label
                  key={highlight.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <Checkbox
                    checked={formData.highlights.includes(highlight.id)}
                    onCheckedChange={() =>
                      setFormData((p) => ({
                        ...p,
                        highlights: p.highlights.includes(highlight.id)
                          ? p.highlights.filter((id) => id !== highlight.id)
                          : [...p.highlights, highlight.id],
                      }))
                    }
                  />
                  <span className="text-sm">{highlight.label}</span>
                </label>
              ))}
            </div>
          </FieldSet>

          {/* Descrição */}
          <Field>
            <FieldLabel htmlFor="description">Descrição Adicional</FieldLabel>
            <Textarea
              id="description"
              placeholder="Descreva detalhes adicionais, histórico do veículo, estado de conservação..."
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
              className="min-h-[120px] resize-none"
            />
          </Field>
        </div>
      </div>

      {/* Botões */}
      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/estoque")}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Cancelar
        </Button>
        <Button type="submit" className="gap-2" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {isEditing ? "Salvar Alterações" : "Cadastrar Veículo"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}