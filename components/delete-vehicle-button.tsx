"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteVehicle } from "@/src/actions/vehicles"

interface DeleteVehicleButtonProps {
  vehicleId: string
  vehicleLabel: string
}

export function DeleteVehicleButton({ vehicleId, vehicleLabel }: DeleteVehicleButtonProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleConfirm() {
    setIsLoading(true)
    try {
      const result = await deleteVehicle(vehicleId)
      if (result.success) {
        toast({
          title: "Veículo excluído",
          description: "O veículo e as fotos foram removidos do servidor.",
        })
        setOpen(false)
      } else {
        toast({
          title: "Erro ao excluir",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Erro inesperado",
        description: "Não foi possível excluir o veículo. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          aria-label="Excluir veículo"
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir veículo?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza? Esta ação apagará as fotos do servidor definitivamente e removerá o
            veículo &quot;{vehicleLabel}&quot; do estoque. Não é possível desfazer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleConfirm()
            }}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
