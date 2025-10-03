"use client"

import type * as React from "react"
import {
  Calendar,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Sparkles,
  FileText,
  Brain,
  Stethoscope,
  Home,
  Shield,
  MessageSquare,
  BookOpen,
  Mic,
  Target,
  TrendingUp,
  UserCheck,
  Zap,
  DollarSign,
  FileSearch,
  Wand2,
  ClipboardList,
  BrainCircuit,
  Microscope,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Panel Principal",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Home,
          isActive: true,
        },
        {
          title: "Pacientes",
          url: "/pacientes",
          icon: Users,
          badge: "12",
        },
        {
          title: "Agenda",
          url: "/agenda",
          icon: Calendar,
          badge: "3",
        },
      ],
    },
    {
      title: "Herramientas Terapéuticas",
      items: [
        {
          title: "Actividades IA",
          url: "/actividades",
          icon: Sparkles,
          badge: "IA",
          badgeVariant: "secondary" as const,
        },
        {
          title: "Evaluaciones",
          url: "/evaluaciones",
          icon: ClipboardList,
        },
        {
          title: "Ejercicios de Voz",
          url: "/ejercicios-voz",
          icon: Mic,
        },
        {
          title: "Análisis del Habla",
          url: "/analisis-habla",
          icon: Brain,
          badge: "IA",
          badgeVariant: "secondary" as const,
        },
      ],
    },
    {
      title: "Herramientas Neurológicas",
      items: [
        {
          title: "NeuroNomina",
          url: "/neuronoma",
          icon: BrainCircuit,
          badge: "Nuevo",
          badgeVariant: "accent" as const,
        },
        {
          title: "Laboratorio de Voz",
          url: "/laboratorio-voz",
          icon: Microscope,
          badge: "Pro",
          badgeVariant: "accent" as const,
        },
      ],
    },
    {
      title: "Herramientas IA Avanzadas",
      items: [
        {
          title: "Analizar Informe",
          url: "/analizar-informe",
          icon: FileSearch,
          badge: "IA",
          badgeVariant: "secondary" as const,
        },
        {
          title: "Asistente Intervención",
          url: "/intervencion",
          icon: Wand2,
          badge: "Premium",
          badgeVariant: "accent" as const,
        },
      ],
    },
    {
      title: "Seguimiento y Reportes",
      items: [
        {
          title: "Progreso de Pacientes",
          url: "/progreso",
          icon: TrendingUp,
        },
        {
          title: "Estadísticas",
          url: "/estadisticas",
          icon: BarChart3,
        },
        {
          title: "Reportes",
          url: "/reportes",
          icon: FileText,
        },
        {
          title: "Informe de Derivación",
          url: "/informe-derivacion",
          icon: FileText,
          badge: "Nuevo",
          badgeVariant: "accent" as const,
        },
        {
          title: "Informe de Reporte",
          url: "/informe-reporte",
          icon: FileText,
          badge: "Nuevo",
          badgeVariant: "accent" as const,
        },
        {
          title: "Objetivos Terapéuticos",
          url: "/objetivos",
          icon: Target,
        },
        {
          title: "Gestión Financiera",
          url: "/finanzas",
          icon: DollarSign,
          badge: "Pro",
          badgeVariant: "accent" as const,
        },
      ],
    },
    {
      title: "Recursos Profesionales",
      items: [
        {
          title: "Biblioteca de Recursos",
          url: "/biblioteca",
          icon: BookOpen,
        },
        {
          title: "Protocolos Clínicos",
          url: "/protocolos",
          icon: Stethoscope,
        },
        {
          title: "Formación Continua",
          url: "/formacion",
          icon: UserCheck,
        },
        {
          title: "Consultas Rápidas",
          url: "/consultas",
          icon: Zap,
          badge: "Nuevo",
          badgeVariant: "accent" as const,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "/configuracion",
      icon: Settings,
    },
    {
      title: "Ayuda y Soporte",
      url: "/ayuda",
      icon: HelpCircle,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageSquare,
    },
    {
      title: "Admin Panel",
      url: "/admin",
      icon: Shield,
      badge: "Admin",
      badgeVariant: "destructive" as const,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">TuFonoAyuda</span>
            <span className="truncate text-xs text-muted-foreground">Asistente Profesional</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant={item.badgeVariant || "default"} className="ml-auto h-5 px-1.5 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {data.navSecondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm" tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant={item.badgeVariant || "default"} className="ml-auto h-4 px-1 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
