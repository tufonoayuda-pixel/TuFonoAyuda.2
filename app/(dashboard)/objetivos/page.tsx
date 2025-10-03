"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Target,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  User,
  Edit,
  Trash2,
  Flag,
  TrendingUp,
} from "lucide-react"

export default function ObjetivosPage() {
  const [selectedPatient, setSelectedPatient] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const objectives = [
    {
      id: 1,
      patient: "María González",
      title: "Mejorar comprensión auditiva",
      description: "Incrementar la comprensión de instrucciones complejas de 2-3 pasos",
      category: "Comprensión",
      priority: "high",
      status: "completed",
      progress: 100,
      startDate: "2024-01-01",
      targetDate: "2024-02-15",
      completedDate: "2024-02-10",
      sessions: 12,
      notes: "Objetivo completado exitosamente. Paciente demuestra comprensión excelente.",
    },
    {
      id: 2,
      patient: "Carlos Ruiz",
      title: "Reducir disfluencias",
      description: "Disminuir episodios de tartamudez en conversación espontánea",
      category: "Fluidez",
      priority: "high",
      status: "in-progress",
      progress: 70,
      startDate: "2024-01-15",
      targetDate: "2024-03-15",
      sessions: 8,
      notes: "Progreso constante. Aplicando técnicas de respiración efectivamente.",
    },
    {
      id: 3,
      patient: "Ana Martín",
      title: "Fortalecer musculatura orofacial",
      description: "Mejorar tono y coordinación de músculos faciales y linguales",
      category: "Motricidad",
      priority: "medium",
      status: "in-progress",
      progress: 45,
      startDate: "2024-01-20",
      targetDate: "2024-04-20",
      sessions: 6,
      notes: "Ejercicios de fortalecimiento en progreso. Requiere práctica domiciliaria.",
    },
    {
      id: 4,
      patient: "Luis Pérez",
      title: "Ampliar vocabulario expresivo",
      description: "Incrementar vocabulario activo en 100 palabras nuevas",
      category: "Vocabulario",
      priority: "medium",
      status: "pending",
      progress: 0,
      startDate: "2024-02-01",
      targetDate: "2024-05-01",
      sessions: 0,
      notes: "Objetivo programado para iniciar próxima semana.",
    },
  ]

  const patients = [
    { id: "all", name: "Todos los pacientes" },
    { id: "1", name: "María González" },
    { id: "2", name: "Carlos Ruiz" },
    { id: "3", name: "Ana Martín" },
    { id: "4", name: "Luis Pérez" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const filteredObjectives = objectives.filter((obj) => {
    const matchesPatient =
      selectedPatient === "all" || obj.patient === patients.find((p) => p.id === selectedPatient)?.name
    const matchesStatus = selectedStatus === "all" || obj.status === selectedStatus
    return matchesPatient && matchesStatus
  })

  const stats = {
    total: objectives.length,
    completed: objectives.filter((obj) => obj.status === "completed").length,
    inProgress: objectives.filter((obj) => obj.status === "in-progress").length,
    pending: objectives.filter((obj) => obj.status === "pending").length,
    averageProgress: Math.round(objectives.reduce((acc, obj) => acc + obj.progress, 0) / objectives.length),
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Objetivos Terapéuticos</h1>
          <p className="text-muted-foreground">Gestiona y monitorea los objetivos terapéuticos de tus pacientes</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Objetivo
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Objetivos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Objetivos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Objetivos logrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Objetivos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Por iniciar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">Avance general</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="patient-filter">Paciente:</Label>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="status-filter">Estado:</Label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="completed">Completados</SelectItem>
              <SelectItem value="in-progress">En progreso</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Objectives List */}
      <div className="space-y-4">
        {filteredObjectives.map((objective) => (
          <Card key={objective.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{objective.title}</CardTitle>
                    <Badge className={getStatusColor(objective.status)}>
                      {getStatusIcon(objective.status)}
                      <span className="ml-1">
                        {objective.status === "completed" && "Completado"}
                        {objective.status === "in-progress" && "En progreso"}
                        {objective.status === "pending" && "Pendiente"}
                      </span>
                    </Badge>
                    <Flag className={`h-4 w-4 ${getPriorityColor(objective.priority)}`} />
                  </div>
                  <CardDescription>{objective.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {objective.patient}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {objective.startDate} - {objective.targetDate}
                    </span>
                    <Badge variant="outline">{objective.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progreso</span>
                    <span className="text-sm text-muted-foreground">{objective.progress}%</span>
                  </div>
                  <Progress value={objective.progress} className="h-2" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-1">Sesiones realizadas</p>
                    <p className="text-sm text-muted-foreground">{objective.sessions} sesiones</p>
                  </div>
                  {objective.completedDate && (
                    <div>
                      <p className="text-sm font-medium mb-1">Fecha de completado</p>
                      <p className="text-sm text-muted-foreground">{objective.completedDate}</p>
                    </div>
                  )}
                </div>

                {objective.notes && (
                  <div>
                    <p className="text-sm font-medium mb-1">Notas</p>
                    <p className="text-sm text-muted-foreground">{objective.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredObjectives.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No hay objetivos</h3>
            <p className="text-muted-foreground text-center mb-4">
              No se encontraron objetivos con los filtros seleccionados.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Crear Primer Objetivo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
