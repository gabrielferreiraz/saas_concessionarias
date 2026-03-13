"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Car } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button asChild size="lg" className="w-full justify-start gap-3">
          <Link href="/admin/novo-veiculo">
            <Plus className="size-4" />
            Adicionar Novo Veículo
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full justify-start gap-3"
        >
          <Link href="/">
            <Car className="size-4" />
            Ver Estoque
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
