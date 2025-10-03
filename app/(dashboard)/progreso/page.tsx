"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  Award,
  BarChart3,
  LineChart,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

export default function ProgresoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedPatient, setSelectedPatient] = useState("all")

  const progressData = [
    {
      id: 1,
      name: "María González",
      condition: "Disfasia",
      progress: 78,
      trend: "up",
      sessions: 12,
      lastSession: "2024-01-15",
      objectives: [
        { name: "Comprensión auditiva", progress: 85, status: "completed" },
        { name: "Expresión oral", progress: 70, status: "in-progress" },
        { name: "Vocabulario", progress: 90, status: "completed" },
      ],
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      condition: "Tartamudez",
      progress: 65,
      trend: "up",
      sessions: 8,
      lastSession: "2024-01-14",
      objectives: [
        { name: "Fluidez verbal", progress: 60, status: "in-progress" },
        { name: "Técnicas respiratorias", progress: 80, status: "completed" },
        { name: "Confianza comunicativa", progress: 55, status: "in-progress" },
      ],
    },
    {
      id: 3,
      name: "Ana Martín",
      condition: "Disartria",
      progress: 45,
      trend: "stable",
      sessions: 15,
      lastSession: "2024-01-13",
      objectives: [
        { name: "Articulación", progress: 50, status: "in-progress" },
        { name: "Intensidad vocal", progress: 40, status: "in-progress" },
        { name: "Inteligibilidad", progress: 45, status: "in-progress" },
      ],
    },
  ]

  const overallStats = {
    totalPatients: 24,
    activePatients: 18,
    completedSessions: 156,
    averageProgress: 72,
    improvementRate: 85,
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progreso de Pacientes</h1>
          <p className="text-muted-foreground">Seguimiento detallado del progreso terapéutico de tus pacientes</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 días</SelectItem>
              <SelectItem value="30d">30 días</SelectItem>
              <SelectItem value="90d">90 días</SelectItem>
              <SelectItem value="1y">1 año</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.activePatients}</div>
            <p className="text-xs text-muted-foreground">75% del total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sesiones Completadas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.completedSessions}</div>
            <p className="text-xs text-muted-foreground">+12 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">+5% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Mejora</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.improvementRate}%</div>
            <p className="text-xs text-muted-foreground">Excelente rendimiento</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient Progress Details */}
      <Tabs defaultValue="individual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="individual">Progreso Individual</TabsTrigger>
          <TabsTrigger value="comparative">Análisis Comparativo</TabsTrigger>
          <TabsTrigger value="objectives">Objetivos Terapéuticos</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Seleccionar paciente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los pacientes</SelectItem>
                {progressData.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {progressData.map((patient) => (
              <Card key={patient.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {patient.name}
                        {patient.trend === "up" && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Mejorando
                          </Badge>
                        )}
                        {patient.trend === "stable" && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Estable
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {patient.condition} • {patient.sessions} sesiones • Última: {patient.lastSession}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{patient.progress}%</div>
                      <div className="text-sm text-muted-foreground">Progreso general</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progreso General</span>
                        <span className="text-sm text-muted-foreground">{patient.progress}%</span>
                      </div>
                      <Progress value={patient.progress} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Objetivos Específicos</h4>
                      {patient.objectives.map((objective, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{objective.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{objective.progress}%</span>
                              {objective.status === "completed" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                              {objective.status === "in-progress" && <Clock className="h-4 w-4 text-yellow-600" />}
                            </div>
                          </div>
                          <Progress value={objective.progress} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparative" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Comparativo de Progreso</CardTitle>
              <CardDescription>Comparación del progreso entre diferentes pacientes y condiciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <LineChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Gráfico comparativo de progreso</p>
                  <p className="text-sm">Visualización de datos en desarrollo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Objetivos Terapéuticos Globales</CardTitle>
              <CardDescription>Estado general de los objetivos terapéuticos de todos los pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Objetivos Completados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">24</div>
                    <p className="text-xs text-muted-foreground">+6 este mes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">En Progreso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">18</div>
                    <p className="text-xs text-muted-foreground">Activos</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Pendientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <p className="text-xs text-muted-foreground">Por iniciar</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
