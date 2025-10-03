"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  MessageSquare,
  BookOpen,
  Video,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  FileText,
  Play,
  Download,
  ExternalLink,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

export default function AyudaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [supportMessage, setSupportMessage] = useState("")

  const faqCategories = [
    { value: "all", label: "Todas las categorías" },
    { value: "getting-started", label: "Primeros Pasos" },
    { value: "patients", label: "Gestión de Pacientes" },
    { value: "activities", label: "Actividades y Ejercicios" },
    { value: "reports", label: "Reportes y Estadísticas" },
    { value: "billing", label: "Facturación y Planes" },
    { value: "technical", label: "Problemas Técnicos" },
  ]

  const faqs = [
    {
      id: 1,
      question: "¿Cómo agrego un nuevo paciente al sistema?",
      answer:
        "Para agregar un nuevo paciente, ve a la sección 'Pacientes' en el menú lateral y haz clic en 'Nuevo Paciente'. Completa la información básica como nombre, edad, diagnóstico y datos de contacto. Todos los campos marcados con asterisco son obligatorios.",
      category: "patients",
      helpful: 45,
      notHelpful: 2,
      tags: ["pacientes", "registro", "nuevo"],
    },
    {
      id: 2,
      question: "¿Cómo genero actividades con IA para mis pacientes?",
      answer:
        "En la sección 'Actividades IA', selecciona el tipo de trastorno, la edad del paciente y el objetivo terapéutico. La IA generará ejercicios personalizados basados en evidencia científica. Puedes modificar y guardar las actividades para uso futuro.",
      category: "activities",
      helpful: 38,
      notHelpful: 1,
      tags: ["IA", "actividades", "ejercicios"],
    },
    {
      id: 3,
      question: "¿Cómo cambio mi plan de suscripción?",
      answer:
        "Ve a Configuración > Facturación y haz clic en 'Cambiar Plan'. Podrás ver todos los planes disponibles y sus características. Los cambios se aplican inmediatamente y se prorratea la facturación.",
      category: "billing",
      helpful: 23,
      notHelpful: 0,
      tags: ["plan", "suscripción", "facturación"],
    },
    {
      id: 4,
      question: "¿Puedo exportar los datos de mis pacientes?",
      answer:
        "Sí, puedes exportar los datos desde Configuración > Avanzado > Exportar Datos. Los datos se exportan en formato CSV e incluyen información de pacientes, sesiones y progreso. Por privacidad, los datos están encriptados.",
      category: "technical",
      helpful: 31,
      notHelpful: 3,
      tags: ["exportar", "datos", "CSV"],
    },
    {
      id: 5,
      question: "¿Cómo genero un reporte de progreso?",
      answer:
        "En la sección 'Reportes', selecciona 'Reporte de Progreso', elige el paciente y el período. El sistema generará automáticamente un informe profesional con gráficos, objetivos alcanzados y recomendaciones.",
      category: "reports",
      helpful: 42,
      notHelpful: 1,
      tags: ["reportes", "progreso", "informe"],
    },
  ]

  const tutorials = [
    {
      id: 1,
      title: "Introducción a TuFonoAyuda",
      description: "Conoce las funciones principales de la plataforma",
      duration: "5 min",
      type: "video",
      thumbnail: "/tutorial-intro.jpg",
      views: 1250,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Gestión de Pacientes",
      description: "Aprende a registrar y gestionar pacientes eficientemente",
      duration: "8 min",
      type: "video",
      thumbnail: "/tutorial-patients.jpg",
      views: 890,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Generación de Actividades con IA",
      description: "Cómo crear ejercicios personalizados usando inteligencia artificial",
      duration: "12 min",
      type: "video",
      thumbnail: "/tutorial-ai.jpg",
      views: 1100,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Guía de Reportes",
      description: "Genera informes profesionales y estadísticas detalladas",
      duration: "10 min",
      type: "document",
      thumbnail: "/tutorial-reports.jpg",
      downloads: 567,
      rating: 4.6,
    },
  ]

  const supportTickets = [
    {
      id: 1,
      subject: "Problema con la generación de reportes",
      status: "open",
      priority: "high",
      created: "2024-01-15",
      lastUpdate: "2024-01-15",
      category: "technical",
    },
    {
      id: 2,
      subject: "Consulta sobre facturación",
      status: "resolved",
      priority: "medium",
      created: "2024-01-10",
      lastUpdate: "2024-01-12",
      category: "billing",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ayuda y Soporte</h1>
          <p className="text-muted-foreground">
            Encuentra respuestas, tutoriales y obtén ayuda personalizada para usar TuFonoAyuda
          </p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Contactar Soporte
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Chat en Vivo</p>
              <p className="text-sm text-muted-foreground">Respuesta inmediata</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="p-2 rounded-lg bg-green-100">
              <Mail className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">24-48 horas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <Phone className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Teléfono</p>
              <p className="text-sm text-muted-foreground">Lun-Vie 9-18h</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="p-2 rounded-lg bg-orange-100">
              <Video className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="font-medium">Videollamada</p>
              <p className="text-sm text-muted-foreground">Con cita previa</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
          <TabsTrigger value="tutorials">Tutoriales</TabsTrigger>
          <TabsTrigger value="contact">Contactar Soporte</TabsTrigger>
          <TabsTrigger value="tickets">Mis Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar en preguntas frecuentes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {faqCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* FAQ List */}
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>Encuentra respuestas rápidas a las preguntas más comunes</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id.toString()}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>¿Te fue útil?</span>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {faq.helpful}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              {faq.notHelpful}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {filteredFaqs.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Intenta con otros términos de búsqueda o contacta a nuestro equipo de soporte
                </p>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contactar Soporte
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      {tutorial.type === "video" ? (
                        <>
                          <Play className="mr-2 h-3 w-3" />
                          Reproducir
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-3 w-3" />
                          Descargar
                        </>
                      )}
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                    {tutorial.type === "video" ? (
                      <>
                        <Video className="mr-1 h-3 w-3" />
                        {tutorial.duration}
                      </>
                    ) : (
                      <>
                        <FileText className="mr-1 h-3 w-3" />
                        PDF
                      </>
                    )}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{tutorial.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{tutorial.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {tutorial.type === "video" ? (
                          <>
                            <Play className="h-3 w-3" />
                            <span>{tutorial.views} vistas</span>
                          </>
                        ) : (
                          <>
                            <Download className="h-3 w-3" />
                            <span>{tutorial.downloads} descargas</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Enviar Mensaje</CardTitle>
                <CardDescription>Describe tu problema o consulta y te responderemos pronto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Problema Técnico</SelectItem>
                      <SelectItem value="billing">Facturación</SelectItem>
                      <SelectItem value="feature">Solicitud de Función</SelectItem>
                      <SelectItem value="general">Consulta General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Prioridad</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Asunto</label>
                  <Input placeholder="Describe brevemente tu consulta..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensaje</label>
                  <Textarea
                    placeholder="Describe tu problema o consulta con el mayor detalle posible..."
                    className="min-h-32"
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                  />
                </div>

                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">soporte@tufonoayuda.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-sm text-muted-foreground">+56 2 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Horario de Atención</p>
                      <p className="text-sm text-muted-foreground">Lunes a Viernes, 9:00 - 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recursos Adicionales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Documentación Completa
                    <ExternalLink className="ml-auto h-3 w-3" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="mr-2 h-4 w-4" />
                    Comunidad de Usuarios
                    <ExternalLink className="ml-auto h-3 w-3" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Video className="mr-2 h-4 w-4" />
                    Canal de YouTube
                    <ExternalLink className="ml-auto h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mis Tickets de Soporte</CardTitle>
              <CardDescription>Historial de tus consultas y su estado actual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{ticket.subject}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>#{ticket.id}</span>
                        <span>Creado: {ticket.created}</span>
                        <span>Actualizado: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority === "high" && "Alta"}
                        {ticket.priority === "medium" && "Media"}
                        {ticket.priority === "low" && "Baja"}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status === "open" && (
                          <>
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Abierto
                          </>
                        )}
                        {ticket.status === "resolved" && (
                          <>
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Resuelto
                          </>
                        )}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {supportTickets.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No tienes tickets de soporte</h3>
                  <p className="text-muted-foreground mb-4">Cuando contactes a soporte, tus tickets aparecerán aquí</p>
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Crear Primer Ticket
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
