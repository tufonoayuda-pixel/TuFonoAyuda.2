"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Play, Pause, RotateCcw, Timer, Target, Zap, Wind, Music, Waves } from "lucide-react"

const exerciseCategories = [
  {
    id: "respiracion",
    title: "Ejercicios de Respiración",
    icon: Wind,
    color: "bg-blue-500",
    exercises: [
      {
        id: "resp-1",
        title: "Respiración Diafragmática",
        description: "Fortalece el diafragma y mejora el control respiratorio",
        duration: "5-10 min",
        difficulty: "Básico",
        instructions: [
          "Coloque una mano en el pecho y otra en el abdomen",
          "Inhale lentamente por la nariz, expandiendo el abdomen",
          "Exhale por la boca, contrayendo el abdomen",
          "Repita 10-15 veces",
        ],
      },
      {
        id: "resp-2",
        title: "Respiración Costal",
        description: "Desarrolla la capacidad pulmonar lateral",
        duration: "3-5 min",
        difficulty: "Intermedio",
        instructions: [
          "Coloque las manos en los costados del tórax",
          "Inhale expandiendo las costillas lateralmente",
          "Mantenga 3 segundos",
          "Exhale controladamente",
        ],
      },
    ],
  },
  {
    id: "vocalizacion",
    title: "Ejercicios de Vocalización",
    icon: Music,
    color: "bg-green-500",
    exercises: [
      {
        id: "voc-1",
        title: "Escalas Vocales",
        description: "Mejora el rango vocal y la afinación",
        duration: "10-15 min",
        difficulty: "Intermedio",
        instructions: [
          "Comience con 'Do-Re-Mi-Fa-Sol-Fa-Mi-Re-Do'",
          "Use diferentes vocales: A, E, I, O, U",
          "Mantenga la postura erguida",
          "Respire entre cada escala",
        ],
      },
      {
        id: "voc-2",
        title: "Glissandos",
        description: "Suaviza las transiciones entre tonos",
        duration: "5-8 min",
        difficulty: "Avanzado",
        instructions: [
          "Deslice la voz desde el tono más grave al más agudo",
          "Use la vocal 'U' para comenzar",
          "Mantenga el flujo de aire constante",
          "Evite tensión en el cuello",
        ],
      },
    ],
  },
  {
    id: "articulacion",
    title: "Ejercicios de Articulación",
    icon: Target,
    color: "bg-purple-500",
    exercises: [
      {
        id: "art-1",
        title: "Trabalenguas",
        description: "Mejora la precisión articulatoria",
        duration: "5-10 min",
        difficulty: "Básico",
        instructions: [
          "Comience lentamente y aumente la velocidad",
          "Mantenga la claridad en cada sílaba",
          "Practique frente a un espejo",
          "Repita 5-10 veces cada trabalenguas",
        ],
      },
      {
        id: "art-2",
        title: "Ejercicios Labiales",
        description: "Fortalece los músculos labiales",
        duration: "3-5 min",
        difficulty: "Básico",
        instructions: [
          "Haga vibrar los labios (brrr)",
          "Alterne entre sonrisas y besos",
          "Masaje circular en los labios",
          "Estire los labios hacia los lados",
        ],
      },
    ],
  },
  {
    id: "resonancia",
    title: "Ejercicios de Resonancia",
    icon: Waves,
    color: "bg-orange-500",
    exercises: [
      {
        id: "res-1",
        title: "Humming",
        description: "Desarrolla la resonancia nasal",
        duration: "5-8 min",
        difficulty: "Básico",
        instructions: [
          "Cierre la boca y haga 'mmm'",
          "Sienta la vibración en el rostro",
          "Varíe la altura del tono",
          "Mantenga la relajación facial",
        ],
      },
      {
        id: "res-2",
        title: "Resonancia de Pecho",
        description: "Fortalece la resonancia grave",
        duration: "8-10 min",
        difficulty: "Intermedio",
        instructions: [
          "Coloque la mano en el pecho",
          "Produzca sonidos graves con 'OH'",
          "Sienta la vibración en el pecho",
          "Mantenga la postura erguida",
        ],
      },
    ],
  },
]

export default function EjerciciosVozPage() {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("respiracion")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentExercise, setCurrentExercise] = useState<string | null>(null)
  const [timer, setTimer] = useState(0)
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const handleStartExercise = (exerciseId: string) => {
    setCurrentExercise(exerciseId)
    setIsPlaying(true)
    setTimer(0)
    toast({
      title: "Ejercicio Iniciado",
      description: "Siga las instrucciones mostradas en pantalla.",
    })
  }

  const handleStopExercise = () => {
    setIsPlaying(false)
    setCurrentExercise(null)
    setTimer(0)
  }

  const filteredExercises =
    exerciseCategories
      .find((cat) => cat.id === selectedCategory)
      ?.exercises.filter((ex) => selectedDifficulty === "all" || ex.difficulty.toLowerCase() === selectedDifficulty) ||
    []

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "básico":
        return "bg-green-100 text-green-800"
      case "intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Ejercicios de Voz</h1>
        <p className="text-muted-foreground">Biblioteca completa de ejercicios vocales para terapia y entrenamiento.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar de categorías */}
        <div className="lg:w-80">
          <Card>
            <CardHeader>
              <CardTitle>Categorías</CardTitle>
              <CardDescription>Seleccione el tipo de ejercicio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {exerciseCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {category.title}
                  </Button>
                )
              })}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Dificultad</Label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar dificultad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="básico">Básico</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          <div className="grid gap-6">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className={currentExercise === exercise.id ? "ring-2 ring-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {exercise.title}
                        <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">{exercise.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Timer className="h-4 w-4" />
                      {exercise.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Instrucciones:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        {exercise.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="flex gap-2">
                      {currentExercise === exercise.id ? (
                        <>
                          <Button onClick={handleStopExercise} variant="destructive">
                            <Pause className="mr-2 h-4 w-4" />
                            Detener
                          </Button>
                          <Button variant="outline">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reiniciar
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => handleStartExercise(exercise.id)}>
                          <Play className="mr-2 h-4 w-4" />
                          Iniciar Ejercicio
                        </Button>
                      )}
                    </div>

                    {currentExercise === exercise.id && (
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <Zap className="h-4 w-4" />
                          Ejercicio en progreso
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Siga las instrucciones y mantenga una respiración controlada.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron ejercicios para los filtros seleccionados.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
