"use client"

import { useState } from "react"
import {
  Mic,
  Upload,
  Play,
  Square,
  Download,
  BarChart3,
  Brain,
  AudioWaveform as Waveform,
  FileAudio,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AnalisisHablaPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const { toast } = useToast()

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
      setIsRecording(false)
      toast({
        title: "Grabación Completada",
        description: "Audio guardado exitosamente. Listo para análisis.",
      })
    }, 5000)
  }

  const analyzeAudio = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      toast({
        title: "Análisis Completado",
        description: "El análisis del habla ha sido procesado con IA.",
      })
    }, 4000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Análisis del Habla con IA</h1>
        <p className="text-muted-foreground">
          Analice patrones de habla, fluidez y articulación usando inteligencia artificial.
        </p>
      </header>

      <Tabs defaultValue="recording" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recording" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Grabación
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Análisis IA
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Resultados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recording" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-primary" />
                  Grabación de Audio
                </CardTitle>
                <CardDescription>Grabe una muestra de habla para análisis posterior.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                        isRecording
                          ? "bg-red-100 border-4 border-red-500 animate-pulse"
                          : "bg-primary/10 border-4 border-primary/20"
                      }`}
                    >
                      <Mic className={`h-8 w-8 ${isRecording ? "text-red-600" : "text-primary"}`} />
                    </div>
                    {isRecording && (
                      <div className="absolute -inset-2 rounded-full border-2 border-red-300 animate-ping"></div>
                    )}
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold">{formatTime(recordingTime)}</div>
                    <p className="text-sm text-muted-foreground">{isRecording ? "Grabando..." : "Listo para grabar"}</p>
                  </div>

                  <div className="flex gap-2">
                    {!isRecording ? (
                      <Button onClick={startRecording} size="lg">
                        <Mic className="mr-2 h-4 w-4" />
                        Iniciar Grabación
                      </Button>
                    ) : (
                      <Button onClick={() => setIsRecording(false)} variant="destructive" size="lg">
                        <Square className="mr-2 h-4 w-4" />
                        Detener
                      </Button>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Subir Archivo de Audio</h4>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Arrastra un archivo de audio aquí o haz clic para seleccionar
                    </p>
                    <Button variant="outline" size="sm">
                      Seleccionar Archivo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileAudio className="h-5 w-5" />
                  Grabaciones Recientes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Sesión Ana García - 20/12/2024", duration: "2:34", status: "Analizada" },
                  { name: "Evaluación Carlos M. - 19/12/2024", duration: "4:12", status: "Pendiente" },
                  { name: "Seguimiento Sofía R. - 18/12/2024", duration: "1:45", status: "Analizada" },
                ].map((recording, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Waveform className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{recording.name}</p>
                        <p className="text-xs text-muted-foreground">{recording.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={recording.status === "Analizada" ? "secondary" : "outline"}>
                        {recording.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Procesamiento con IA
              </CardTitle>
              <CardDescription>
                Configure los parámetros de análisis y procese el audio con inteligencia artificial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isAnalyzing ? (
                <div className="text-center space-y-4">
                  <div className="animate-pulse">
                    <Brain className="h-16 w-16 mx-auto text-primary animate-bounce" />
                  </div>
                  <h3 className="text-lg font-semibold">Analizando con IA...</h3>
                  <p className="text-muted-foreground">Procesando patrones de habla, fluidez y articulación.</p>
                  <Progress value={75} className="max-w-md mx-auto" />
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
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Parámetros de Análisis</h4>
                      <div className="space-y-2">
                        {[
                          "Análisis de fluidez",
                          "Detección de disfluencias",
                          "Análisis de articulación",
                          "Velocidad del habla",
                          "Pausas y silencios",
                          "Calidad vocal",
                        ].map((param, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{param}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Archivo Seleccionado</h4>
                      <div className="p-4 rounded-lg border bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Volume2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Grabación de prueba</p>
                            <p className="text-sm text-muted-foreground">2:34 • WAV • 5.2 MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      El análisis puede tomar entre 2-5 minutos dependiendo de la duración del audio.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-center">
                    <Button onClick={analyzeAudio} size="lg" className="px-8">
                      <Brain className="mr-2 h-4 w-4" />
                      Iniciar Análisis IA
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {analysisComplete ? (
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Fluidez General</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <p className="text-xs text-muted-foreground">Muy buena</p>
                    <Progress value={85} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Velocidad del Habla</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">142</div>
                    <p className="text-xs text-muted-foreground">palabras/min (normal)</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">+5% vs anterior</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Articulación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">78%</div>
                    <p className="text-xs text-muted-foreground">Mejorable</p>
                    <Progress value={78} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Análisis Detallado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Disfluencias Detectadas</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Repeticiones</span>
                          <Badge variant="outline">3 eventos</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Prolongaciones</span>
                          <Badge variant="outline">1 evento</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Bloqueos</span>
                          <Badge variant="outline">0 eventos</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Fonemas con Dificultad</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="destructive">/r/ (5 errores)</Badge>
                        <Badge variant="secondary">/s/ (2 errores)</Badge>
                        <Badge variant="outline">/l/ (1 error)</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recomendaciones IA</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <h5 className="font-semibold text-blue-900 mb-1">Ejercicios de Articulación</h5>
                      <p className="text-sm text-blue-800">
                        Enfocarse en ejercicios específicos para el fonema /r/ con técnicas de posicionamiento lingual.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <h5 className="font-semibold text-green-900 mb-1">Técnicas de Fluidez</h5>
                      <p className="text-sm text-green-800">
                        Continuar con técnicas de respiración y control del ritmo para mantener la fluidez actual.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <h5 className="font-semibold text-amber-900 mb-1">Seguimiento</h5>
                      <p className="text-sm text-amber-800">
                        Programar evaluación en 2 semanas para monitorear progreso en articulación.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Reporte
                </Button>
                <Button variant="outline">Compartir Resultados</Button>
                <Button variant="outline">Programar Seguimiento</Button>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sin Resultados Disponibles</h3>
                <p className="text-muted-foreground text-center">
                  Complete una grabación y análisis para ver los resultados aquí.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
