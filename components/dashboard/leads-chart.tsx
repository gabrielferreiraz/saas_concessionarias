"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

const generateLast15Days = () => {
  const data = []
  const today = new Date()
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      leads: Math.floor(Math.random() * 15) + 3,
    })
  }
  
  return data
}

const data = generateLast15Days()

export function LeadsChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Leads por Dia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{
                  color: "hsl(var(--foreground))",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "hsl(var(--muted-foreground))",
                  fontSize: "13px",
                }}
                formatter={(value: number) => [`${value} leads`, "Cliques WhatsApp"]}
              />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "hsl(var(--primary))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
