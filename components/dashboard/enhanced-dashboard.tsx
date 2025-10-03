"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { CalendarDays, Users, Activity, TrendingUp, ChevronDown, Search, Settings, Bell } from "lucide-react"

const chartData = [
  { month: "Ene", pacientes: 12, sesiones: 45 },
  { month: "Feb", pacientes: 19, sesiones: 67 },
  { month: "Mar", pacientes: 15, sesiones: 52 },
  { month: "Abr", pacientes: 22, sesiones: 78 },
  { month: "May", pacientes: 18, sesiones: 63 },
  { month: "Jun", pacientes: 25, sesiones: 89 },
]

const chartConfig = {
  pacientes: {
    label: "Pacientes",
    color: "hsl(var(--chart-1))",
  },
  sesiones: {
    label: "Sesiones",
    color: "hsl(var(--chart-2))",
  },
}

const recentPatients = [
  { id: 1, name: "María González", age: 8, condition: "Dislalia", lastSession: "2024-01-15" },
  { id: 2, name: "Carlos Ruiz", age: 12, condition: "Tartamudez", lastSession: "2024-01-14" },
  { id: 3, name: "Ana López", age: 6, condition: "Retraso del lenguaje", lastSession: "2024-01-13" },
  { id: 4, name: "Pedro Martín", age: 10, condition: "Disfemia", lastSession: "2024-01-12" },
]

const upcomingAppointments = [
  { id: 1, patient: "María González", time: "09:00", date: "2024-01-16" },
  { id: 2, patient: "Carlos Ruiz", time: "10:30", date: "2024-01-16" },
  { id: 3, patient: "Ana López", time: "14:00", date: "2024-01-16" },
  { id: 4, patient: "Pedro Martín", time: "15:30", date: "2024-01-16" },
]

export function EnhancedDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [isTasksOpen, setIsTasksOpen] = useState(false)

  const tasks = [
    { id: "1", label: "Revisar informes de progreso", completed: false },
    { id: "2", label: "Preparar materiales para sesión", completed: true },
    { id: "3", label: "Contactar padres de familia", completed: false },
    { id: "4", label: "Actualizar planes de tratamiento", completed: false },
  ]

  const handleTaskToggle = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Command Palette */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard TuFonoAyuda</h1>
            <p className="text-gray-600 dark:text-gray-300">Gestiona tu práctica de fonoaudiología</p>
          </div>

          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Búsqueda rápida</DialogTitle>
                  <DialogDescription>Busca pacientes, sesiones o actividades</DialogDescription>
                </DialogHeader>
                <Command>
                  <CommandInput placeholder="Escribe para buscar..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup heading="Pacientes">
                      {recentPatients.map((patient) => (
                        <CommandItem key={patient.id}>
                          <Users className="mr-2 h-4 w-4" />
                          <span>
                            {patient.name} - {patient.condition}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Nueva cita programada</DropdownMenuItem>
                <DropdownMenuItem>Recordatorio de sesión</DropdownMenuItem>
                <DropdownMenuItem>Informe completado</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">25</div>
              <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sesiones Hoy</CardTitle>
              <CalendarDays className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">8</div>
              <p className="text-xs text-muted-foreground">4 completadas, 4 pendientes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actividades</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">156</div>
              <p className="text-xs text-muted-foreground">Generadas este mes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progreso</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">89%</div>
              <p className="text-xs text-muted-foreground">Objetivos cumplidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Estadísticas Mensuales</CardTitle>
                <CardDescription>Pacientes y sesiones por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="pacientes" fill="var(--color-pacientes)" />
                      <Bar dataKey="sesiones" fill="var(--color-sesiones)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Patient Carousel */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pacientes Recientes</CardTitle>
                <CardDescription>Últimos pacientes atendidos</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent>
                    {recentPatients.map((patient) => (
                      <CarouselItem key={patient.id} className="md:basis-1/2">
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold">{patient.name}</h3>
                              <p className="text-sm text-muted-foreground">Edad: {patient.age} años</p>
                              <Badge variant="secondary">{patient.condition}</Badge>
                              <p className="text-xs text-muted-foreground">Última sesión: {patient.lastSession}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>

            {/* Tasks */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <Collapsible open={isTasksOpen} onOpenChange={setIsTasksOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0">
                      <CardTitle>Tareas Pendientes</CardTitle>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <div key={task.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={task.id}
                              checked={selectedTasks.includes(task.id) || task.completed}
                              onCheckedChange={() => handleTaskToggle(task.id)}
                            />
                            <label
                              htmlFor={task.id}
                              className={`text-sm ${
                                selectedTasks.includes(task.id) || task.completed
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {task.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </CardHeader>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Próximas Citas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div>
                        <p className="font-medium text-sm">{appointment.patient}</p>
                        <p className="text-xs text-muted-foreground">{appointment.date}</p>
                      </div>
                      <Badge variant="outline">{appointment.time}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
