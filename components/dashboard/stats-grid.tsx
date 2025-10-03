"use client"

import type React from "react"

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { Users, Calendar, TrendingUp, DollarSign, Activity, Clock, CheckCircle2 } from "lucide-react"

interface StatItem {
  title: string
  value: number
  change: number
  icon: React.ReactNode
  color: string
  prefix?: string
  suffix?: string
}

const stats: StatItem[] = [
  {
    title: "Pacientes Activos",
    value: 127,
    change: 12,
    icon: <Users className="h-5 w-5" />,
    color: "text-blue-600",
  },
  {
    title: "Citas Esta Semana",
    value: 34,
    change: 8,
    icon: <Calendar className="h-5 w-5" />,
    color: "text-green-600",
  },
  {
    title: "Ingresos del Mes",
    value: 2450000,
    change: 15,
    icon: <DollarSign className="h-5 w-5" />,
    color: "text-emerald-600",
    prefix: "$",
  },
  {
    title: "Actividades Generadas",
    value: 89,
    change: 23,
    icon: <Activity className="h-5 w-5" />,
    color: "text-purple-600",
  },
  {
    title: "Horas de Terapia",
    value: 156,
    change: 5,
    icon: <Clock className="h-5 w-5" />,
    color: "text-orange-600",
    suffix: "h",
  },
  {
    title: "Sesiones Completadas",
    value: 78,
    change: 18,
    icon: <CheckCircle2 className="h-5 w-5" />,
    color: "text-teal-600",
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <EnhancedCard key={stat.title} hover glow gradient>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={stat.color}>{stat.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                duration={1500 + index * 200}
              />
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{stat.change}% desde el mes pasado
            </div>
          </CardContent>
        </EnhancedCard>
      ))}
    </div>
  )
}
