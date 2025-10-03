"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Loader2, Clock, Users, Target } from "lucide-react"
import { useAI } from "@/hooks/useAI"
import type { GeneratePersonalizedActivityInput } from "@/lib/types"

export function AIActivityDemo() {
  const { generateActivity, loading, error } = useAI()
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState<GeneratePersonalizedActivityInput>({
    patientProfile:
      "Niño de 6 años, cursa 1º básico, le gustan los dinosaurios y los videojuegos. Presenta dislalia selectiva del fonema /r/.",
    specificNeeds: "Producción del fonema /r/ en posición inicial de palabra",
    sessionDuration: 30,
    sessionType: "Individual",
    isPediatric: true,
    additionalDescription: "Paciente muy motivado con temas de dinosaurios",
    scientificReferences: "",
  })

  const handleGenerate = async () => {
    const generated = await generateActivity(formData)
    if (generated) {
      setResult(generated)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Generador de Actividades con IA
          </CardTitle>
          <CardDescription>Crea actividades terapéuticas personalizadas usando inteligencia artificial</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patientProfile">Perfil del Paciente</Label>
              <Textarea
                id="patientProfile"
                placeholder="Describe al paciente: edad, intereses, diagnóstico..."
                value={formData.patientProfile}
                onChange={(e) => setFormData((prev) => ({ ...prev, patientProfile: e.target.value }))}
                className="min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specificNeeds">Objetivo Específico</Label>
              <Textarea
                id="specificNeeds"
                placeholder="Ej: Producción del fonema /s/ en palabras"
                value={formData.specificNeeds}
                onChange={(e) => setFormData((prev) => ({ ...prev, specificNeeds: e.target.value }))}
                className="min-h-20"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="duration">Duración (minutos)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.sessionDuration}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, sessionDuration: Number.parseInt(e.target.value) || 30 }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionType">Tipo de Sesión</Label>
              <Select
                value={formData.sessionType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, sessionType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Grupal">Grupal</SelectItem>
                  <SelectItem value="Familiar">Familiar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="population">Población</Label>
              <Select
                value={formData.isPediatric ? "pediatric" : "adult"}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, isPediatric: value === "pediatric" }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pediatric">Pediátrico</SelectItem>
                  <SelectItem value="adult">Adulto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional">Contexto Adicional (Opcional)</Label>
            <Textarea
              id="additional"
              placeholder="Información adicional, preferencias, materiales disponibles..."
              value={formData.additionalDescription}
              onChange={(e) => setFormData((prev) => ({ ...prev, additionalDescription: e.target.value }))}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !formData.patientProfile || !formData.specificNeeds}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando Actividad...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generar Actividad Personalizada
              </>
            )}
          </Button>

          {error && (
            <div className="p-4 border border-destructive/20 bg-destructive/10 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {result.titulo_actividad}
            </CardTitle>
            <CardDescription className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {result.duracion_estimada} min
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {result.tipo_paciente}
              </Badge>
              <Badge variant="outline">{result.area_intervencion}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Objetivo Terapéutico</h4>
              <p className="text-sm text-muted-foreground">{result.objetivo_terapeutico}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Población Objetivo</h4>
              <p className="text-sm text-muted-foreground">{result.poblacion_objetivo}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Materiales Necesarios</h4>
              <div className="flex flex-wrap gap-2">
                {result.materiales_necesarios?.map((material: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Procedimiento</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-primary">Calentamiento</h5>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    {result.procedimiento?.calentamiento?.map((step: string, index: number) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-primary">Desarrollo Principal</h5>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    {result.procedimiento?.desarrollo_principal?.map((step: string, index: number) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-primary">Cierre</h5>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    {result.procedimiento?.cierre?.map((step: string, index: number) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Ejemplo de Instrucción</h4>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm italic">"{result.procedimiento?.instrucciones_ejemplo}"</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Indicadores de Progreso</h4>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                {result.indicadores_progreso?.map((indicator: string, index: number) => (
                  <li key={index}>{indicator}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Seguimiento Domiciliario</h4>
              <p className="text-sm text-muted-foreground">{result.seguimiento_domiciliario}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
