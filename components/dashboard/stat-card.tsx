"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Car, Eye, MessageCircle, CheckCircle } from "lucide-react"

const iconMap = {
  car: Car,
  eye: Eye,
  messageCircle: MessageCircle,
  checkCircle: CheckCircle,
} as const

type IconName = keyof typeof iconMap

interface StatCardProps {
  title: string
  value: string | number
  iconName: IconName
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatCard({
  title,
  value,
  iconName,
  description,
  trend,
  className,
}: StatCardProps) {
  const Icon = iconMap[iconName]
  return (
    <Card className={cn("py-5", className)}>
      <CardContent className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </span>
            {trend && (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-emerald-600" : "text-red-500"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            )}
          </div>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
