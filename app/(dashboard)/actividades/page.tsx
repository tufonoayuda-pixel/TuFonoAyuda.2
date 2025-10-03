"use client"

import { useState } from "react"
import {
  Sparkles,
  Wand2,
  RefreshCw,
  Download,
  Share2,
  Filter,
  Search,
  Plus,
  BookOpen,
  Brain,
  Target,
  Clock,
  Users,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { activities } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ActividadesPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [ageRange, setAgeRange] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [generatedActivity, setGeneratedActivity] = useState(null)
  const { toast } = useToast()

  const generateActivity = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const newActivity = {
        id: Date.now().toString(),
        title: "Juego de Rimas Musicales",
        description:
          "Actividad interactiva que combina música y rimas para mejorar la conciencia fonológica y el ritmo del habla.",
        category: category || "Articulación",
        difficulty: difficulty || "Intermedio",
        duration: 25,
        materials: ["Instrumentos musicales simples", "Tarjetas con imágenes", "Reproductor de música", "Micrófono"],
        instructions: [
          "Seleccionar palabras que rimen con el nombre del paciente",
          "Crear un ritmo simple con instrumentos",
          "Cantar las rimas siguiendo el ritmo",
          "Grabar la sesión para revisión posterior",
          "Aumentar la velocidad gradualmente",
        ],
        objectives: ["Mejorar conciencia fonológica", "Desarrollar ritmo del habla", "Fortalecer memoria auditiva"],
        ageRange: ageRange || "5-10 años",
        createdBy: "IA",
        tags: ["música", "rimas", "fonología", "ritmo"],
        createdAt: new Date().toISOString(),
      }

      setGeneratedActivity(newActivity)
      setIsGenerating(false)

      toast({
        title: "Actividad Generada con IA",
        description: `Nueva actividad "${newActivity.title}" creada exitosamente.`,
      })
    }, 3000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Avanzado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Articulación":
        return <Target className="h-4 w-4" />
      case "Lenguaje":
        return <BookOpen className="h-4 w-4" />
      case "Pragmática":
        return <Users className="h-4 w-4" />
      case "Fluidez":
        return <Clock className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const filteredActivities = activities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Actividades Terapéuticas</h1>
        <p className="text-muted-foreground">
          Genere actividades personalizadas con IA y explore nuestra biblioteca de recursos.
        </p>
      </header>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Generador IA
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Biblioteca
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Generador Inteligente
                  </CardTitle>
                  <CardDescription>Configure los parámetros para generar una actividad personalizada.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Área Terapéutica</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="articulacion">Articulación</SelectItem>
                        <SelectItem value="lenguaje">Lenguaje</SelectItem>
                        <SelectItem value="pragmatica">Pragmática</SelectItem>
                        <SelectItem value="fluidez">Fluidez</SelectItem>
                        <SelectItem value="voz">Voz</SelectItem>
                        <SelectItem value="audicion">Audición</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Nivel de Dificultad</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facil">Fácil</SelectItem>
                        <SelectItem value="intermedio">Intermedio</SelectItem>
                        <SelectItem value="avanzado">Avanzado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age-range">Rango de Edad</Label>
                    <Select value={ageRange} onValueChange={setAgeRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar edad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-5">3-5 años</SelectItem>
                        <SelectItem value="6-8">6-8 años</SelectItem>
                        <SelectItem value="9-12">9-12 años</SelectItem>
                        <SelectItem value="13-16">13-16 años</SelectItem>
                        <SelectItem value="adultos">Adultos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objectives">Objetivos Específicos (Opcional)</Label>
                    <Textarea
                      id="objectives"
                      placeholder="Ej: Mejorar articulación del fonema /r/, trabajar en fluidez verbal..."
                      rows={3}
                    />
                  </div>

                  <Button onClick={generateActivity} disabled={isGenerating} className="w-full" size="lg">
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generando con IA...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generar Actividad
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {isGenerating ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="animate-pulse space-y-4 text-center">
                      <Sparkles className="h-12 w-12 mx-auto text-primary animate-bounce" />
                      <h3 className="text-lg font-semibold">Generando actividad personalizada...</h3>
                      <p className="text-muted-foreground">
                        Nuestra IA está creando una actividad única basada en sus parámetros.
                      </p>
                      <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : generatedActivity ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{generatedActivity.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(generatedActivity.difficulty)}>
                            {generatedActivity.difficulty}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getCategoryIcon(generatedActivity.category)}
                            {generatedActivity.category}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {generatedActivity.duration} min
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {generatedActivity.ageRange}
                          </Badge>
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Generado con IA
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Descripción</h4>
                      <p className="text-muted-foreground">{generatedActivity.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Objetivos Terapéuticos</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {generatedActivity.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Materiales Necesarios</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedActivity.materials.map((material, index) => (
                          <Badge key={index} variant="outline">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Instrucciones</h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        {generatedActivity.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar PDF
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Share2 className="mr-2 h-4 w-4" />
                        Compartir
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Star className="mr-2 h-4 w-4" />
                        Guardar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Listo para generar</h3>
                    <p className="text-muted-foreground text-center">
                      Configure los parámetros en el panel izquierdo y genere una actividad personalizada con IA.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar actividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Actividad
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(activity.difficulty)}>{activity.difficulty}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getCategoryIcon(activity.category)}
                          {activity.category}
                        </Badge>
                      </div>
                    </div>
                    {activity.createdBy === "IA" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        IA
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{activity.description}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{activity.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{activity.ageRange}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {activity.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {activity.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{activity.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Ver Detalles
                    </Button>
                    <Button size="sm" className="flex-1">
                      Usar Actividad
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron actividades</h3>
                <p className="text-muted-foreground text-center">
                  {searchTerm
                    ? "Intente con otros términos de búsqueda"
                    : "Comience generando su primera actividad con IA"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
