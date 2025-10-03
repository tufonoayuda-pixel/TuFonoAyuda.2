"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Search,
  Download,
  Eye,
  Star,
  Clock,
  FileText,
  Video,
  Headphones,
  ImageIcon,
  Bookmark,
  Share2,
} from "lucide-react"

export default function BibliotecaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const resources = [
    {
      id: 1,
      title: "Protocolo de Evaluación TEL",
      description: "Guía completa para la evaluación del Trastorno Específico del Lenguaje en niños de 3-8 años",
      category: "Protocolos",
      type: "document",
      format: "PDF",
      pages: 45,
      author: "Dr. María Fernández",
      rating: 4.8,
      downloads: 1250,
      date: "2024-01-15",
      tags: ["TEL", "Evaluación", "Infantil"],
      featured: true,
    },
    {
      id: 2,
      title: "Ejercicios de Articulación /r/",
      description: "Colección de 50 ejercicios progresivos para la corrección del fonema /r/",
      category: "Ejercicios",
      type: "document",
      format: "PDF",
      pages: 28,
      author: "Lic. Carmen López",
      rating: 4.6,
      downloads: 890,
      date: "2024-01-10",
      tags: ["Articulación", "Fonemas", "Ejercicios"],
      featured: false,
    },
    {
      id: 3,
      title: "Webinar: Nuevas Técnicas en Disfagia",
      description: "Conferencia sobre las últimas técnicas de rehabilitación en disfagia orofaríngea",
      category: "Formación",
      type: "video",
      format: "MP4",
      duration: "1h 30min",
      author: "Dr. Roberto Sánchez",
      rating: 4.9,
      views: 2340,
      date: "2024-01-08",
      tags: ["Disfagia", "Rehabilitación", "Técnicas"],
      featured: true,
    },
    {
      id: 4,
      title: "Banco de Sonidos para Terapia",
      description: "Colección de 200+ sonidos y palabras para ejercicios de discriminación auditiva",
      category: "Recursos",
      type: "audio",
      format: "ZIP",
      size: "150MB",
      author: "Equipo TuFonoAyuda",
      rating: 4.7,
      downloads: 567,
      date: "2024-01-05",
      tags: ["Audio", "Discriminación", "Ejercicios"],
      featured: false,
    },
    {
      id: 5,
      title: "Láminas de Vocabulario Temático",
      description: "Set de 100 láminas organizadas por campos semánticos para terapia de vocabulario",
      category: "Materiales",
      type: "image",
      format: "PNG",
      quantity: "100 imágenes",
      author: "Lic. Ana Ruiz",
      rating: 4.5,
      downloads: 723,
      date: "2024-01-03",
      tags: ["Vocabulario", "Láminas", "Semántica"],
      featured: false,
    },
    {
      id: 6,
      title: "Guía de Intervención en Afasia",
      description: "Manual completo de intervención terapéutica en diferentes tipos de afasia",
      category: "Guías",
      type: "document",
      format: "PDF",
      pages: 120,
      author: "Dr. Luis Martín",
      rating: 4.9,
      downloads: 1890,
      date: "2023-12-28",
      tags: ["Afasia", "Intervención", "Adultos"],
      featured: true,
    },
  ]

  const categories = [
    { value: "all", label: "Todas las categorías" },
    { value: "Protocolos", label: "Protocolos" },
    { value: "Ejercicios", label: "Ejercicios" },
    { value: "Formación", label: "Formación" },
    { value: "Recursos", label: "Recursos" },
    { value: "Materiales", label: "Materiales" },
    { value: "Guías", label: "Guías" },
  ]

  const types = [
    { value: "all", label: "Todos los tipos" },
    { value: "document", label: "Documentos" },
    { value: "video", label: "Videos" },
    { value: "audio", label: "Audio" },
    { value: "image", label: "Imágenes" },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const featuredResources = resources.filter((resource) => resource.featured)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca de Recursos</h1>
          <p className="text-muted-foreground">
            Accede a protocolos, ejercicios, materiales y recursos profesionales especializados
          </p>
        </div>
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Subir Recurso
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar recursos, protocolos, ejercicios..."
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
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos los Recursos</TabsTrigger>
          <TabsTrigger value="featured">Destacados</TabsTrigger>
          <TabsTrigger value="recent">Recientes</TabsTrigger>
          <TabsTrigger value="favorites">Favoritos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <Badge variant="secondary">{resource.category}</Badge>
                      {resource.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Por {resource.author}</span>
                      <span>{resource.date}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{resource.downloads || resource.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {resource.pages && `${resource.pages} pág.`}
                          {resource.duration && resource.duration}
                          {resource.size && resource.size}
                          {resource.quantity && resource.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="mr-2 h-3 w-3" />
                        Ver
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
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <Badge variant="secondary">{resource.category}</Badge>
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Por {resource.author}</span>
                      <span>{resource.date}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{resource.downloads || resource.views}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="mr-2 h-3 w-3" />
                        Ver
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

        <TabsContent value="recent" className="space-y-4">
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Recursos Recientes</h3>
            <p className="text-muted-foreground">Los recursos que has visto recientemente aparecerán aquí</p>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Recursos Favoritos</h3>
            <p className="text-muted-foreground">Guarda tus recursos favoritos para acceder rápidamente</p>
          </div>
        </TabsContent>
      </Tabs>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron recursos</h3>
            <p className="text-muted-foreground text-center mb-4">Intenta ajustar los filtros o términos de búsqueda</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedType("all")
              }}
            >
              Limpiar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
