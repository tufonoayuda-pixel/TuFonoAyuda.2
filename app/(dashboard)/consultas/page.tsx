"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Search,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Calendar,
  Send,
  Plus,
  Filter,
  Star,
  ThumbsUp,
  Eye,
} from "lucide-react"

export default function ConsultasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newQuestion, setNewQuestion] = useState("")

  const consultations = [
    {
      id: 1,
      question: "¿Cuál es el mejor protocolo para evaluar TEL en niños de 4 años?",
      category: "Evaluación",
      author: "Lic. María González",
      date: "2024-01-15",
      status: "answered",
      answers: 3,
      views: 45,
      likes: 12,
      expert: "Dr. Roberto Sánchez",
      expertAnswer:
        "Para evaluar TEL en niños de 4 años, recomiendo comenzar con el PLON-R seguido de una evaluación más específica...",
      tags: ["TEL", "Evaluación", "Infantil"],
    },
    {
      id: 2,
      question: "Técnicas efectivas para mejorar la articulación del fonema /r/",
      category: "Articulación",
      author: "Lic. Carmen López",
      date: "2024-01-14",
      status: "answered",
      answers: 5,
      views: 78,
      likes: 18,
      expert: "Lic. Ana Ruiz",
      expertAnswer: "Las técnicas más efectivas incluyen ejercicios de posicionamiento lingual, vibración asistida...",
      tags: ["Articulación", "Fonemas", "Terapia"],
    },
    {
      id: 3,
      question: "¿Cómo adaptar la terapia para pacientes con afasia severa?",
      category: "Afasia",
      author: "Dr. Luis Martín",
      date: "2024-01-13",
      status: "pending",
      answers: 1,
      views: 32,
      likes: 8,
      tags: ["Afasia", "Adaptación", "Terapia"],
    },
    {
      id: 4,
      question: "Recomendaciones para terapia de disfagia en pacientes geriátricos",
      category: "Disfagia",
      author: "Lic. Patricia Vega",
      date: "2024-01-12",
      status: "answered",
      answers: 4,
      views: 56,
      likes: 15,
      expert: "Dr. Roberto Sánchez",
      expertAnswer:
        "En pacientes geriátricos con disfagia, es fundamental realizar una evaluación multidisciplinaria...",
      tags: ["Disfagia", "Geriatría", "Rehabilitación"],
    },
  ]

  const experts = [
    {
      id: 1,
      name: "Dr. Roberto Sánchez",
      specialty: "Disfagia y Neurología",
      rating: 4.9,
      answers: 156,
      avatar: "/male-doctor.png",
    },
    {
      id: 2,
      name: "Lic. Ana Ruiz",
      specialty: "Articulación y Fonética",
      rating: 4.8,
      answers: 98,
      avatar: "/therapist-female.jpg",
    },
    {
      id: 3,
      name: "Dr. María Fernández",
      specialty: "Lenguaje Infantil",
      rating: 4.9,
      answers: 134,
      avatar: "/female-doctor.png",
    },
  ]

  const categories = [
    { value: "all", label: "Todas las categorías" },
    { value: "Evaluación", label: "Evaluación" },
    { value: "Articulación", label: "Articulación" },
    { value: "Afasia", label: "Afasia" },
    { value: "Disfagia", label: "Disfagia" },
    { value: "TEL", label: "TEL" },
    { value: "Neurología", label: "Neurología" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "answered":
        return <CheckCircle2 className="h-3 w-3" />
      case "pending":
        return <Clock className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || consultation.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Consultas Rápidas</h1>
          <p className="text-muted-foreground">
            Haz preguntas a expertos y accede a consultas de la comunidad profesional
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Consulta
        </Button>
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Explorar Consultas</TabsTrigger>
          <TabsTrigger value="ask">Hacer Pregunta</TabsTrigger>
          <TabsTrigger value="my-questions">Mis Preguntas</TabsTrigger>
          <TabsTrigger value="experts">Expertos</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar consultas por tema, condición o especialidad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Consultations List */}
          <div className="space-y-4">
            {filteredConsultations.map((consultation) => (
              <Card key={consultation.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(consultation.status)}>
                          {getStatusIcon(consultation.status)}
                          <span className="ml-1">
                            {consultation.status === "answered" && "Respondida"}
                            {consultation.status === "pending" && "Pendiente"}
                          </span>
                        </Badge>
                        <Badge variant="outline">{consultation.category}</Badge>
                      </div>
                      <CardTitle className="text-lg cursor-pointer hover:text-primary">
                        {consultation.question}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {consultation.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {consultation.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {consultation.answers} respuestas
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {consultation.views} vistas
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {consultation.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                {consultation.status === "answered" && consultation.expertAnswer && (
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Star className="mr-1 h-3 w-3" />
                          Respuesta de Experto
                        </Badge>
                        <span className="text-sm font-medium">{consultation.expert}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">{consultation.expertAnswer}</p>
                      <Button variant="link" className="p-0 h-auto text-sm mt-2">
                        Leer respuesta completa
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {consultation.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ask" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hacer una Nueva Pregunta</CardTitle>
              <CardDescription>
                Describe tu consulta de manera clara y detallada para obtener la mejor respuesta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Título de la Pregunta</label>
                <Input placeholder="Escribe un título claro y específico..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción Detallada</label>
                <Textarea
                  placeholder="Describe tu consulta con el mayor detalle posible. Incluye contexto, edad del paciente, síntomas observados, etc."
                  className="min-h-32"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Etiquetas</label>
                <Input placeholder="Agrega etiquetas separadas por comas (ej: TEL, evaluación, infantil)" />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Publicar Pregunta
                </Button>
                <Button variant="outline">
                  <Zap className="mr-2 h-4 w-4" />
                  Consulta Urgente
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-questions" className="space-y-4">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Mis Preguntas</h3>
            <p className="text-muted-foreground mb-4">Aquí aparecerán las preguntas que hayas realizado</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Hacer Mi Primera Pregunta
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="experts" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experts.map((expert) => (
              <Card key={expert.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img
                      src={expert.avatar || "/placeholder.svg"}
                      alt={expert.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{expert.name}</CardTitle>
                      <CardDescription>{expert.specialty}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{expert.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{expert.answers} respuestas</span>
                    </div>
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Consultar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
