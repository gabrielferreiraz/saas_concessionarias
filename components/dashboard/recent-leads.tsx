"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

interface Lead {
  id: string
  vehicle: string
  time: string
  price: string
}

const recentLeads: Lead[] = [
  {
    id: "1",
    vehicle: "BMW X5 M50i",
    time: "Há 12 minutos",
    price: "R$ 589.900",
  },
  {
    id: "2",
    vehicle: "Mercedes-Benz GLE 450",
    time: "Há 45 minutos",
    price: "R$ 549.000",
  },
  {
    id: "3",
    vehicle: "Porsche Cayenne S",
    time: "Há 1 hora",
    price: "R$ 729.900",
  },
  {
    id: "4",
    vehicle: "Audi Q8 55 TFSI",
    time: "Há 2 horas",
    price: "R$ 619.000",
  },
  {
    id: "5",
    vehicle: "Range Rover Sport",
    time: "Há 3 horas",
    price: "R$ 899.000",
  },
]

export function RecentLeads() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">
          Leads Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-y divide-border">
          {recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center gap-4 px-6 py-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-whatsapp/10">
                <MessageCircle className="size-4 text-whatsapp" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-medium text-foreground">
                  {lead.vehicle}
                </span>
                <span className="text-xs text-muted-foreground">
                  {lead.price}
                </span>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {lead.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
