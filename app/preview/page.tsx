"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  ArrowRight,
  Play,
  Mic,
  MessageSquare,
  FileText,
} from "lucide-react"
import { patients, sessions } from "@/lib/enhanced-mock-data"
import { AIActivityDemo } from "@/components/demo/ai-activity-demo"
import { PatientManagementDemo } from "@/components/demo/patient-management-demo"
import Link from "next/link"

export default function PreviewPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Calculate some stats
  const totalPatients = patients.length
  const completedSessions = sessions.filter((s) => s.status === "Completada").length
  const upcomingSessions = sessions.filter((s) => s.status === "Programada").length
  const totalRevenue = sessions.filter((s) => s.paymentStatus === "Pagado").reduce((sum, s) => sum + s.price, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-8 w-8 text-primary" />
            <span>TuFonoAyuda</span>
          </Link>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm">
              <Play className="mr-2 h-4 w-4" />
              Vista Previa
            </Badge>
            <Button asChild>
              <Link href="/register">Comenzar Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-balance">
            Explora <span className="text-primary">TuFonoAyuda</span> en acción
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Descubre cómo nuestra plataforma puede transformar tu práctica fonoaudiológica con herramientas
            profesionales y IA avanzada.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="patients">Pacientes</TabsTrigger>
            <TabsTrigger value="activities">Actividades IA</TabsTrigger>
            <TabsTrigger value="calendar">Agenda</TabsTrigger>
            <TabsTrigger value="analytics">Análisis</TabsTrigger>
            <TabsTrigger value="pricing">Precios</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pacientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPatients}</div>
                  <p className="text-xs text-muted-foreground">+2 este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sesiones Completadas</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedSessions}</div>
                  <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próximas Citas</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingSessions}</div>
                  <p className="text-xs text-muted-foreground">Esta semana</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8% vs mes anterior</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pacientes Recientes</CardTitle>
                  <CardDescription>Últimos pacientes agregados al sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {patients.slice(0, 3).map((patient) => (
                    <div key={patient.id} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={patient.avatarUrl || "/placeholder.svg"} />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.age} años</p>
                      </div>
                      <Badge variant="outline">{patient.diagnoses[0]}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progreso Semanal</CardTitle>
                  <CardDescription>Actividades completadas por día</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day, index) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-16 text-sm">{day}</div>
                        <Progress value={(index + 1) * 20} className="flex-1" />
                        <div className="text-sm text-muted-foreground">{(index + 1) * 2} actividades</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <PatientManagementDemo />
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <AIActivityDemo />
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agenda de Sesiones</CardTitle>
                <CardDescription>Gestión completa de citas y sesiones terapéuticas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Pago</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.date}</TableCell>
                        <TableCell>{session.time}</TableCell>
                        <TableCell className="font-medium">{session.patientName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{session.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              session.status === "Completada"
                                ? "default"
                                : session.status === "Programada"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {session.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${session.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              session.paymentStatus === "Pagado"
                                ? "default"
                                : session.paymentStatus === "Pendiente"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {session.paymentStatus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis del Habla</CardTitle>
                  <CardDescription>Herramientas de evaluación objetiva</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mic className="h-5 w-5 text-primary" />
                      <span>Análisis Acústico</span>
                    </div>
                    <Badge>Disponible</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <span>Métricas de Progreso</span>
                    </div>
                    <Badge>Activo</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Reportes Automáticos</span>
                    </div>
                    <Badge>Pro</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Uso</CardTitle>
                  <CardDescription>Métricas de tu práctica profesional</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sesiones este mes</span>
                      <span className="font-medium">{completedSessions + upcomingSessions}</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Actividades generadas</span>
                      <span className="font-medium">24</span>
                    </div>
                    <Progress value={60} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Reportes creados</span>
                      <span className="font-medium">8</span>
                    </div>
                    <Progress value={40} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Planes y Precios</h2>
              <p className="text-muted-foreground">Elige el plan que mejor se adapte a tu práctica profesional</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Estudiante Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Estudiante
                  </CardTitle>
                  <CardDescription>Perfecto para estudiantes de fonoaudiología</CardDescription>
                  <div className="text-3xl font-bold">
                    $9.990<span className="text-sm font-normal text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Hasta 5 pacientes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      10 actividades IA/mes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Agenda básica
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Soporte por email
                    </li>
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline">
                    Comenzar Gratis
                  </Button>
                </CardContent>
              </Card>

              {/* Profesional Plan */}
              <Card className="relative border-primary">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Más Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Profesional
                  </CardTitle>
                  <CardDescription>Para fonoaudiólogos en ejercicio</CardDescription>
                  <div className="text-3xl font-bold">
                    $29.990<span className="text-sm font-normal text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Pacientes ilimitados
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      100 actividades IA/mes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Agenda avanzada
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Análisis del habla
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Reportes automáticos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Soporte prioritario
                    </li>
                  </ul>
                  <Button className="w-full">Comenzar Prueba</Button>
                </CardContent>
              </Card>

              {/* Experto Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Experto
                  </CardTitle>
                  <CardDescription>Para clínicas y centros especializados</CardDescription>
                  <div className="text-3xl font-bold">
                    $59.990<span className="text-sm font-normal text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Todo lo del plan Profesional
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Actividades IA ilimitadas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Múltiples usuarios
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      API personalizada
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Integración con sistemas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Soporte 24/7
                    </li>
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline">
                    Contactar Ventas
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4 mt-8">
              <p className="text-sm text-muted-foreground">
                Todos los planes incluyen 30 días de prueba gratuita. Sin compromiso, cancela cuando quieras.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href="/register">
                    Comenzar Prueba Gratuita
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline">Comparar Planes</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 text-center space-y-6 p-8 bg-primary/5 rounded-lg border">
          <h2 className="text-2xl md:text-3xl font-bold">¿Listo para transformar tu práctica?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Únete a más de 500 fonoaudiólogos que ya están usando TuFonoAyuda para optimizar su trabajo y mejorar los
            resultados de sus pacientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Comenzar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Agendar Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
