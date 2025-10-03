"use client"

import Link from "next/link"
import {
  BarChart2,
  FileText,
  Plus,
  Search,
  Users,
  Calendar,
  Brain,
  Target,
  Clock,
  CheckCircle2,
  Stethoscope,
  BrainCircuit,
  Microscope,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { patients } from "@/lib/mock-data"
import { AiActivityGenerator } from "@/components/dashboard/ai-activity-generator"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { ThemeAwareBackground } from "@/components/ui/theme-aware-background"
import { FloatingElements } from "@/components/ui/floating-elements"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="relative">
      <ThemeAwareBackground />
      <FloatingElements />

      <div className="flex flex-col gap-8 relative z-10">
        <EnhancedCard gradient glow className="border-primary/20 overflow-hidden">
          <div className="flex items-center justify-between p-6 relative">
            <div className="space-y-2 z-10">
              <CardTitle className="text-3xl text-balance bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ¡Bienvenido a TuFonoAyuda!
              </CardTitle>
              <CardDescription className="text-muted-foreground text-pretty text-lg">
                Tu asistente personal para la práctica fonoaudiológica profesional.
              </CardDescription>
              <div className="pt-4 space-y-2">
                <Progress
                  value={85}
                  className="bg-muted [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary"
                />
                <p className="text-sm text-muted-foreground">85% de los objetivos semanales completados.</p>
              </div>
            </div>
            <div className="hidden md:block">
              <Stethoscope className="h-24 w-24 text-primary/20" />
            </div>
          </div>
        </EnhancedCard>

        <StatsGrid />

        <EnhancedCard gradient glow className="border-blue-200 dark:border-blue-800" icon={<BrainCircuit />}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <BrainCircuit className="h-5 w-5" />
              Nuevas Herramientas Neurológicas
            </CardTitle>
            <CardDescription>
              Accede a evaluaciones especializadas y análisis avanzados para pacientes neurológicos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                asChild
                variant="outline"
                className="h-auto p-4 justify-start bg-white/50 hover:bg-white/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80 transition-all duration-300 hover:scale-105"
              >
                <Link href="/neuronoma">
                  <div className="flex items-center gap-3">
                    <BrainCircuit className="h-8 w-8 text-blue-600" />
                    <div className="text-left">
                      <div className="font-semibold">NeuroNomina</div>
                      <div className="text-sm text-muted-foreground">Tests de Boston, MAST, MoCA y Disartria</div>
                    </div>
                    <Badge variant="secondary" className="ml-auto animate-pulse">
                      Nuevo
                    </Badge>
                  </div>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto p-4 justify-start bg-white/50 hover:bg-white/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80 transition-all duration-300 hover:scale-105"
              >
                <Link href="/laboratorio-voz">
                  <div className="flex items-center gap-3">
                    <Microscope className="h-8 w-8 text-purple-600" />
                    <div className="text-left">
                      <div className="font-semibold">Laboratorio de Voz</div>
                      <div className="text-sm text-muted-foreground">Análisis acústico en tiempo real</div>
                    </div>
                    <Badge variant="accent" className="ml-auto">
                      Pro
                    </Badge>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </EnhancedCard>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EnhancedCard hover glow>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gestión de Pacientes
                </CardTitle>
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar pacientes..." className="pl-10" />
                  </div>
                  <Button
                    asChild
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    <Link href="/pacientes/nuevo">
                      <Plus className="mr-2 h-4 w-4" /> Nuevo Paciente
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {patients && patients.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Diagnóstico</TableHead>
                        <TableHead className="hidden sm:table-cell">Progreso</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow key={patient.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="ring-2 ring-primary/20">
                                <AvatarImage src={patient.avatarUrl || "/placeholder.svg"} alt={patient.name} />
                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{patient.name}</div>
                                <div className="text-sm text-muted-foreground">{patient.age} años</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {patient.diagnoses.slice(0, 2).map((diagnosis, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {diagnosis}
                                </Badge>
                              ))}
                              {patient.diagnoses.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{patient.diagnoses.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                                  style={{ width: `${patient.progress[patient.progress.length - 1].score}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">
                                {patient.progress[patient.progress.length - 1].score}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                              <CheckCircle2 className="h-3 w-3" />
                              Activo
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="hover:scale-105 transition-transform bg-transparent"
                              >
                                <Link href={`/pacientes/${patient.id}`}>Ver</Link>
                              </Button>
                              <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="hidden sm:flex hover:scale-105 transition-transform"
                              >
                                <Link href={`/pacientes/${patient.id}/editar`}>Editar</Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No hay pacientes registrados</p>
                    <Button asChild className="mt-4">
                      <Link href="/pacientes/nuevo">
                        <Plus className="mr-2 h-4 w-4" /> Agregar Primer Paciente
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </EnhancedCard>
          </div>

          <div className="space-y-8">
            <AiActivityGenerator />

            <EnhancedCard hover glow>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Acciones Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/agenda/nueva-cita">
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar Nueva Cita
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/evaluaciones/nueva">
                    <FileText className="mr-2 h-4 w-4" />
                    Nueva Evaluación
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/actividades">
                    <Brain className="mr-2 h-4 w-4" />
                    Generar Actividad IA
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/neuronoma">
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    NeuroNomina
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/laboratorio-voz">
                    <Microscope className="mr-2 h-4 w-4" />
                    Laboratorio de Voz
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/reportes">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Ver Reportes
                  </Link>
                </Button>
              </CardContent>
            </EnhancedCard>

            <EnhancedCard hover glow>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Agenda de Hoy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300">
                  <div>
                    <p className="font-medium">Ana García</p>
                    <p className="text-sm text-muted-foreground">Terapia Individual</p>
                  </div>
                  <Badge variant="secondary" className="animate-pulse">
                    09:00
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-500/5 to-transparent hover:from-blue-500/10 transition-all duration-300">
                  <div>
                    <p className="font-medium">Carlos Mendoza</p>
                    <p className="text-sm text-muted-foreground">Terapia de Fluidez</p>
                  </div>
                  <Badge variant="secondary">10:00</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-500/5 to-transparent hover:from-amber-500/10 transition-all duration-300">
                  <div>
                    <p className="font-medium">Sofía Ramírez</p>
                    <p className="text-sm text-muted-foreground">Estimulación</p>
                  </div>
                  <Badge variant="secondary">15:30</Badge>
                </div>
                <Button asChild variant="ghost" className="w-full hover:bg-muted/50 transition-all duration-300">
                  <Link href="/agenda">Ver Agenda Completa</Link>
                </Button>
              </CardContent>
            </EnhancedCard>
          </div>
        </div>
      </div>
    </div>
  )
}
