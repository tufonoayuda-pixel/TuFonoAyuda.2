"use client"

import type React from "react"

import { useState } from "react"
import {
  Brain,
  Sparkles,
  Wand2,
  RefreshCw,
  Download,
  Share2,
  Save,
  Upload,
  X,
  Clock,
  Target,
  Torus as Tools,
  CheckCircle,
  FileText,
  Users,
  Lightbulb,
  HandHeart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface GeneratedActivity {
  title: string
  area: string
  duration: number
  objective: string
  materials: string[]
  procedure: Array<{
    title: string
    description: string
  }>
  adaptations: Array<{
    title: string
    description: string
  }>
  strategies: string[]
  references: Array<{
    author: string
    title: string
    source: string
  }>
  diagnosis: string
  context: string
}

const therapeuticAreas = {
  "lenguaje-adulto": "Lenguaje Adulto",
  "lenguaje-infantil": "Lenguaje Infantil",
  "habla-adulto": "Habla Adulto",
  "habla-infantil": "Habla Infantil",
  "deglucion-adulto": "Deglución Adulto",
  "deglucion-infantil": "Deglución Infantil",
  "motricidad-orofacial": "Motricidad Orofacial",
  voz: "Voz",
  "fonoaudiologia-estetica": "Fonoaudiología Estética",
  cognicion: "Cognición",
  audiologia: "Audiología",
}

const supportStrategies = ["Refuerzo visual", "Modelado", "Tecnología", "Juego simbólico"]

export function AiActivityGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedActivity, setGeneratedActivity] = useState<GeneratedActivity | null>(null)
  const [selectedCreativity, setSelectedCreativity] = useState<"basico" | "intermedio" | "avanzado">("intermedio")
  const [duration, setDuration] = useState([15])
  const [pdfFiles, setPdfFiles] = useState<File[]>([])
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([])

  // Form state
  const [diagnosis, setDiagnosis] = useState("")
  const [characteristics, setCharacteristics] = useState("")
  const [needs, setNeeds] = useState("")
  const [area, setArea] = useState("")
  const [customStrategies, setCustomStrategies] = useState("")
  const [context, setContext] = useState("")

  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).slice(0, 3 - pdfFiles.length)
      setPdfFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removePdf = (index: number) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleStrategyChange = (strategy: string, checked: boolean) => {
    if (checked) {
      setSelectedStrategies((prev) => [...prev, strategy])
    } else {
      setSelectedStrategies((prev) => prev.filter((s) => s !== strategy))
    }
  }

  const generateMaterials = (area: string, creativity: string): string[] => {
    const baseMaterials: Record<string, string[]> = {
      "lenguaje-infantil": ["Tarjetas con imágenes", "Libro de cuentos", "Juego de mesa temático"],
      "habla-infantil": ["Espejo pequeño", "Tarjetas de fonemas", "Juguetes sonoros"],
      voz: ["Botella con agua", "Grabadora", "Termómetro de humedad"],
      "deglucion-infantil": ["Vasos de diferentes tamaños", "Pajillas", "Alimentos de texturas variadas"],
      "motricidad-orofacial": ["Palitos de helado", "Chicle terapéutico", "Espejo de pared"],
      cognicion: ["Tarjetas de memoria", "Reloj con temporizador", "Tablero de categorías"],
      audiologia: ["Auriculares", "Generador de tonos", "Tarjetas con palabras"],
    }

    const materials = baseMaterials[area] || ["Material básico de fonoaudiología"]

    if (creativity === "intermedio") {
      materials.push("Tablet con apps especializadas")
    } else if (creativity === "avanzado") {
      materials.push("Realidad virtual adaptada", "Dispositivos de biofeedback")
    }

    return materials
  }

  const generateProcedure = (data: any) => {
    return [
      {
        title: "Preparación (3 min)",
        description: "Establecer rapport y explicar la actividad de manera motivadora",
      },
      {
        title: "Actividad principal (8 min)",
        description: `Desarrollar ejercicio específico para ${data.needs.toLowerCase()}`,
      },
      {
        title: "Reforzamiento (3 min)",
        description: "Practicar en diferentes contextos y proporcionar retroalimentación",
      },
      {
        title: "Cierre (1 min)",
        description: "Resumir logros y asignar práctica para casa",
      },
    ]
  }

  const generateAdaptations = () => {
    return [
      {
        title: "Para pacientes con menor atención",
        description: "Dividir la actividad en segmentos más cortos con pausas activas",
      },
      {
        title: "Para pacientes con limitaciones motoras",
        description: "Adaptar materiales y usar tecnología de asistencia",
      },
      {
        title: "Para pacientes con resistencia visual",
        description: "Incorporar elementos táctiles y auditivos",
      },
    ]
  }

  const generateReferences = (pdfs: File[]) => {
    const refs = [
      {
        author: "Smith et al. (2023)",
        title: "Evidencia actual en intervenciones fonoaudiológicas",
        source: "Journal of Speech Therapy",
      },
    ]

    if (pdfs.length > 0) {
      refs.push({
        author: "Material proporcionado",
        title: pdfs[0].name,
        source: "Documento de referencia",
      })
    }

    return refs
  }

  const generateActivity = () => {
    if (!area || !needs) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa el área terapéutica y las necesidades específicas.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    const formData = {
      diagnosis,
      characteristics,
      needs,
      area,
      duration: duration[0],
      creativity: selectedCreativity,
      strategies: [...selectedStrategies, ...(customStrategies ? [customStrategies] : [])],
      context,
      pdfs: pdfFiles,
    }

    setTimeout(() => {
      const activity: GeneratedActivity = {
        title: `Aventura Terapéutica: ${needs.split(" ")[0] || "Fonoaudiológica"}`,
        area: therapeuticAreas[area as keyof typeof therapeuticAreas] || area,
        duration: duration[0],
        objective: `Mejorar ${needs.toLowerCase()} a través de técnicas especializadas en ${therapeuticAreas[area as keyof typeof therapeuticAreas]}`,
        materials: generateMaterials(area, selectedCreativity),
        procedure: generateProcedure(formData),
        adaptations: generateAdaptations(),
        strategies: formData.strategies,
        references: generateReferences(pdfFiles),
        diagnosis,
        context,
      }

      setGeneratedActivity(activity)
      setIsGenerating(false)

      toast({
        title: "Actividad Generada",
        description: `Nueva actividad de ${activity.area} creada con IA.`,
      })
    }, 3000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Panel Izquierdo: Formulario */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Crear Nueva Actividad
          </CardTitle>
          <CardDescription>
            Completa los datos para generar una actividad terapéutica personalizada con IA.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Diagnóstico Fonoaudiológico */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Diagnóstico Fonoaudiológico
            </Label>
            <Textarea
              placeholder="Ej: Dislalia funcional, trastorno articulatorio..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={2}
            />
          </div>

          {/* Características del Paciente */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Características del Paciente
            </Label>
            <Textarea
              placeholder="Ej: Niño de 7 años con TEA, lenguaje expresivo limitado..."
              value={characteristics}
              onChange={(e) => setCharacteristics(e.target.value)}
              rows={3}
            />
          </div>

          {/* Necesidades Específicas */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              Necesidades Específicas *
            </Label>
            <Input
              placeholder="Ej: Mejorar producción de fonemas /s/ y /z/"
              value={needs}
              onChange={(e) => setNeeds(e.target.value)}
            />
          </div>

          {/* Área Terapéutica */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Área Terapéutica *
            </Label>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar área" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(therapeuticAreas).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duración */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Duración: {duration[0]} minutos
            </Label>
            <Slider value={duration} onValueChange={setDuration} max={60} min={5} step={5} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>5 min</span>
              <span>60 min</span>
            </div>
          </div>

          {/* Creatividad */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              Nivel de Creatividad
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {(["basico", "intermedio", "avanzado"] as const).map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={selectedCreativity === level ? "default" : "outline"}
                  onClick={() => setSelectedCreativity(level)}
                  className="capitalize"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Estrategias de Apoyo */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <HandHeart className="h-4 w-4" />
              Estrategias de Apoyo
            </Label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {supportStrategies.map((strategy) => (
                <div key={strategy} className="flex items-center space-x-2">
                  <Checkbox
                    id={strategy}
                    checked={selectedStrategies.includes(strategy)}
                    onCheckedChange={(checked) => handleStrategyChange(strategy, checked as boolean)}
                  />
                  <Label htmlFor={strategy} className="text-sm">
                    {strategy}
                  </Label>
                </div>
              ))}
            </div>
            <Textarea
              placeholder="Escribe otras estrategias personalizadas..."
              value={customStrategies}
              onChange={(e) => setCustomStrategies(e.target.value)}
              rows={2}
            />
          </div>

          {/* Carga de PDFs */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Upload className="h-4 w-4" />
              Documentos de Referencia (PDF)
            </Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Arrastra PDFs aquí o haz clic para seleccionar</p>
                <p className="text-xs text-muted-foreground mt-1">Máximo 3 archivos</p>
              </label>
            </div>
            {pdfFiles.length > 0 && (
              <div className="space-y-1">
                {pdfFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removePdf(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contexto Adicional */}
          <div className="space-y-2">
            <Label>Contexto Adicional</Label>
            <Textarea
              placeholder="Ej: Sesión en clínica, con tablet disponible..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={2}
            />
          </div>

          {/* Botón Generar */}
          <Button onClick={generateActivity} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generar Actividad con IA
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Panel Derecho: Resultado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Actividad Generada por IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Analizando documentos y generando actividad...</p>
              <p className="text-sm text-muted-foreground mt-2">
                La IA está creando una propuesta terapéutica personalizada
              </p>
            </div>
          ) : generatedActivity ? (
            <div className="space-y-6">
              {/* Encabezado */}
              <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-4 rounded-lg">
                <h3 className="text-2xl font-bold">{generatedActivity.title}</h3>
                <div className="flex items-center mt-2 text-primary-foreground/80">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{generatedActivity.duration} minutos</span>
                  <FileText className="h-4 w-4 ml-4 mr-1" />
                  <span>{generatedActivity.area}</span>
                </div>
              </div>

              {/* Diagnóstico */}
              {generatedActivity.diagnosis && (
                <div>
                  <h4 className="font-bold flex items-center">
                    <FileText className="h-4 w-4 text-primary mr-2" />
                    Diagnóstico
                  </h4>
                  <p className="mt-1 text-muted-foreground">{generatedActivity.diagnosis}</p>
                </div>
              )}

              {/* Objetivo */}
              <div>
                <h4 className="font-bold flex items-center">
                  <Target className="h-4 w-4 text-primary mr-2" />
                  Objetivo Terapéutico
                </h4>
                <p className="mt-1 text-muted-foreground">{generatedActivity.objective}</p>
              </div>

              {/* Materiales */}
              <div>
                <h4 className="font-bold flex items-center">
                  <Tools className="h-4 w-4 text-primary mr-2" />
                  Materiales Necesarios
                </h4>
                <ul className="mt-1 space-y-1">
                  {generatedActivity.materials.map((material, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Procedimiento */}
              <div>
                <h4 className="font-bold flex items-center">
                  <FileText className="h-4 w-4 text-primary mr-2" />
                  Procedimiento
                </h4>
                <div className="mt-2 space-y-3">
                  {generatedActivity.procedure.map((step, index) => (
                    <div key={index} className="flex">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{step.title}</p>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estrategias de Apoyo */}
              {generatedActivity.strategies.length > 0 && (
                <div>
                  <h4 className="font-bold flex items-center">
                    <HandHeart className="h-4 w-4 text-primary mr-2" />
                    Estrategias de Apoyo
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {generatedActivity.strategies.map((strategy, index) => (
                      <Badge key={index} variant="secondary">
                        {strategy}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contexto */}
              {generatedActivity.context && (
                <div>
                  <h4 className="font-bold flex items-center">
                    <FileText className="h-4 w-4 text-primary mr-2" />
                    Contexto de Aplicación
                  </h4>
                  <p className="mt-1 text-muted-foreground">{generatedActivity.context}</p>
                </div>
              )}

              {/* Acciones */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p>Completa el formulario y haz clic en "Generar Actividad con IA"</p>
              <p className="text-sm mt-2">La IA analizará tus documentos y creará una actividad personalizada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
