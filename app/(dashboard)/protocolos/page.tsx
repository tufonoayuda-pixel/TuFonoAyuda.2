"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Stethoscope,
  Search,
  Download,
  Eye,
  Star,
  Clock,
  FileText,
  CheckCircle2,
  Users,
  Calendar,
  BookOpen,
  Plus,
} from "lucide-react"

export default function ProtocolosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all")

  const protocols = [
    {
      id: 1,
      title: "Protocolo de Evaluación TEL",
      description: "Evaluación completa del Trastorno Específico del Lenguaje en población infantil",
      specialty: "Lenguaje Infantil",
      ageGroup: "3-8 años",
      duration: "60-90 min",
      steps: 8,
      difficulty: "Intermedio",
      rating: 4.8,
      uses: 1250,
      lastUpdated: "2024-01-15",
      author: "Dr. María Fernández",
      validated: true,
      tags: ["TEL", "Evaluación", "Infantil", "Diagnóstico"],
      featured: true,
    },
    {
      id: 2,
      title: "Protocolo de Intervención en Disfagia",
      description: "Guía paso a paso para la rehabilitación de disfagia orofaríngea en adultos",
      specialty: "Disfagia",
      ageGroup: "Adultos",
      duration: "45-60 min",
      steps: 12,
      difficulty: "Avanzado",
      rating: 4.9,
      uses: 890,
      lastUpdated: "2024-01-12",
      author: "Dr. Roberto Sánchez",
      validated: true,
      tags: ["Disfagia", "Rehabilitación", "Adultos", "Deglución"],
      featured: true,
    },
    {
      id: 3,
      title: "Protocolo de Articulación /r/",
      description: "Metodología estructurada para la corrección del fonema /r/ en niños",
      specialty: "Articulación",
      ageGroup: "4-10 años",
      duration: "30-45 min",
      steps: 6,
      difficulty: "Básico",
      rating: 4.6,
      uses: 567,
      lastUpdated: "2024-01-10",
      author: "Lic. Carmen López",
      validated: true,
      tags: ["Articulación", "Fonemas", "Infantil", "Corrección"],
      featured: false,
    },
    {
      id: 4,
      title: "Protocolo de Evaluación de Afasia",
      description: "Batería completa para la evaluación de diferentes tipos de afasia",
      specialty: "Afasia",
      ageGroup: "Adultos",
      duration: "90-120 min",
      steps: 15,
      difficulty: "Avanzado",
      rating: 4.7,
      uses: 723,
      lastUpdated: "2024-01-08",
      author: "Dr. Luis Martín",
      validated: true,
      tags: ["Afasia", "Evaluación", "Adultos", "Neurología"],
      featured: false,
    },
    {
      id: 5,
      title: "Protocolo de Estimulación Temprana",
      description: "Programa de estimulación del lenguaje para bebés de 0-3 años",
      specialty: "Estimulación Temprana",
      ageGroup: "0-3 años",
      duration: "20-30 min",
      steps: 5,
      difficulty: "Básico",
      rating: 4.5,
      uses: 1100,
      lastUpdated: "2024-01-05",
      author: "Lic. Ana Ruiz",
      validated: false,
      tags: ["Estimulación", "Temprana", "Bebés", "Desarrollo"],
      featured: false,
    },
  ]

  const specialties = [
    { value: "all", label: "Todas las especialidades" },
    { value: "Lenguaje Infantil", label: "Lenguaje Infantil" },
    { value: "Disfagia", label: "Disfagia" },
    { value: "Articulación", label: "Articulación" },
    { value: "Afasia", label: "Afasia" },
    { value: "Estimulación Temprana", label: "Estimulación Temprana" },
  ]

  const ageGroups = [
    { value: "all", label: "Todas las edades" },
    { value: "0-3 años", label: "0-3 años" },
    { value: "3-8 años", label: "3-8 años" },
    { value: "4-10 años", label: "4-10 años" },
    { value: "Adultos", label: "Adultos" },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "bg-green-100 text-green-800"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "Avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredProtocols = protocols.filter((protocol) => {
    const matchesSearch =
      protocol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protocol.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protocol.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSpecialty = selectedSpecialty === "all" || protocol.specialty === selectedSpecialty
    const matchesAge = selectedAge === "all" || protocol.ageGroup === selectedAge
    return matchesSearch && matchesSpecialty && matchesAge
  })

  const featuredProtocols = protocols.filter((protocol) => protocol.featured)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Protocolos Clínicos</h1>
          <p className="text-muted-foreground">
            Protocolos validados y guías paso a paso para evaluación e intervención terapéutica
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Crear Protocolo
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar protocolos por nombre, especialidad o condición..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty.value} value={specialty.value}>
                  {specialty.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedAge} onValueChange={setSelectedAge}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ageGroups.map((age) => (
                <SelectItem key={age.value} value={age.value}>
                  {age.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos los Protocolos</TabsTrigger>
          <TabsTrigger value="featured">Destacados</TabsTrigger>
          <TabsTrigger value="validated">Validados</TabsTrigger>
          <TabsTrigger value="my-protocols">Mis Protocolos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProtocols.map((protocol) => (
              <Card key={protocol.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      <Badge variant="secondary">{protocol.specialty}</Badge>
                      {protocol.validated && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      {protocol.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <Badge className={getDifficultyColor(protocol.difficulty)}>{protocol.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{protocol.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{protocol.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{protocol.ageGroup}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{protocol.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span>{protocol.steps} pasos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{protocol.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Por {protocol.author}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{protocol.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          <span>{protocol.uses}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {protocol.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="mr-2 h-3 w-3" />
                        Ver Protocolo
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-3 w-3" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProtocols.map((protocol) => (
              <Card key={protocol.id} className="group hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      <Badge variant="secondary">{protocol.specialty}</Badge>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                    <Badge className={getDifficultyColor(protocol.difficulty)}>{protocol.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{protocol.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{protocol.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{protocol.ageGroup}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{protocol.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span>{protocol.steps} pasos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{protocol.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Por {protocol.author}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{protocol.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          <span>{protocol.uses}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {protocol.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="mr-2 h-3 w-3" />
                        Ver Protocolo
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-3 w-3" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validated" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {protocols
              .filter((p) => p.validated)
              .map((protocol) => (
                <Card key={protocol.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-primary" />
                        <Badge variant="secondary">{protocol.specialty}</Badge>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <Badge className={getDifficultyColor(protocol.difficulty)}>{protocol.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{protocol.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{protocol.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{protocol.ageGroup}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{protocol.duration}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="mr-2 h-3 w-3" />
                          Ver Protocolo
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-3 w-3" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="my-protocols" className="space-y-4">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Mis Protocolos</h3>
            <p className="text-muted-foreground mb-4">Crea y gestiona tus propios protocolos personalizados</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Crear Mi Primer Protocolo
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
