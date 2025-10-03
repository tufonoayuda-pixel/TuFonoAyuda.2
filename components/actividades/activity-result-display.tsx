"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Target, Users, BookOpen, CheckCircle, Copy, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { GeneratePersonalizedActivityOutput } from "@/lib/types"

interface ActivityResultDisplayProps {
  sessionPlan: GeneratePersonalizedActivityOutput
}

export function ActivityResultDisplay({ sessionPlan }: ActivityResultDisplayProps) {
  const { toast } = useToast()

  const handleCopyActivity = () => {
    const activityText = `
Título: ${sessionPlan.title}
Descripción: ${sessionPlan.description}
Duración: ${sessionPlan.duration} minutos
Tipo: ${sessionPlan.sessionType}

Objetivos:
${sessionPlan.objectives.map((obj) => `• ${obj}`).join("\n")}

Materiales:
${sessionPlan.materials.map((mat) => `• ${mat}`).join("\n")}

Instrucciones:
${sessionPlan.instructions.map((inst, idx) => `${idx + 1}. ${inst}`).join("\n")}

Criterios de Éxito:
${sessionPlan.successCriteria.map((crit) => `• ${crit}`).join("\n")}

Adaptaciones:
${sessionPlan.adaptations.map((adapt) => `• ${adapt}`).join("\n")}
    `.trim()

    navigator.clipboard.writeText(activityText)
    toast({
      title: "Actividad Copiada",
      description: "El contenido de la actividad ha sido copiado al portapapeles.",
    })
  }

  const handleDownloadActivity = () => {
    const activityText = `
ACTIVIDAD TERAPÉUTICA GENERADA POR IA
=====================================

Título: ${sessionPlan.title}
Descripción: ${sessionPlan.description}
Duración: ${sessionPlan.duration} minutos
Tipo de Sesión: ${sessionPlan.sessionType}
Dificultad: ${sessionPlan.difficulty}

OBJETIVOS TERAPÉUTICOS:
${sessionPlan.objectives.map((obj) => `• ${obj}`).join("\n")}

MATERIALES NECESARIOS:
${sessionPlan.materials.map((mat) => `• ${mat}`).join("\n")}

INSTRUCCIONES PASO A PASO:
${sessionPlan.instructions.map((inst, idx) => `${idx + 1}. ${inst}`).join("\n")}

CRITERIOS DE ÉXITO:
${sessionPlan.successCriteria.map((crit) => `• ${crit}`).join("\n")}

ADAPTACIONES SUGERIDAS:
${sessionPlan.adaptations.map((adapt) => `• ${adapt}`).join("\n")}

${sessionPlan.notes ? `NOTAS ADICIONALES:\n${sessionPlan.notes}` : ""}

---
Generado por TuFonoAyuda IA
Fecha: ${new Date().toLocaleDateString("es-CL")}
    `.trim()

    const blob = new Blob([activityText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `actividad_${sessionPlan.title.toLowerCase().replace(/\s+/g, "_")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Actividad Descargada",
      description: "La actividad ha sido descargada como archivo de texto.",
    })
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

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{sessionPlan.title}</CardTitle>
            <CardDescription className="text-base">{sessionPlan.description}</CardDescription>
          </div>
          <Badge className={getDifficultyColor(sessionPlan.difficulty)}>{sessionPlan.difficulty}</Badge>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{sessionPlan.duration} min</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{sessionPlan.sessionType}</span>
          </div>
          <Badge variant="outline">{sessionPlan.category}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Objetivos */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Objetivos Terapéuticos
          </h4>
          <ul className="space-y-1">
            {sessionPlan.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Materiales */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            Materiales Necesarios
          </h4>
          <div className="flex flex-wrap gap-2">
            {sessionPlan.materials.map((material, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {material}
              </Badge>
            ))}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="space-y-3">
          <h4 className="font-semibold">Instrucciones Paso a Paso</h4>
          <ol className="space-y-2">
            {sessionPlan.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span className="pt-0.5">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Criterios de Éxito */}
        <div className="space-y-3">
          <h4 className="font-semibold">Criterios de Éxito</h4>
          <ul className="space-y-1">
            {sessionPlan.successCriteria.map((criteria, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{criteria}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Adaptaciones */}
        <div className="space-y-3">
          <h4 className="font-semibold">Adaptaciones Sugeridas</h4>
          <ul className="space-y-1">
            {sessionPlan.adaptations.map((adaptation, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <span>{adaptation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notas adicionales */}
        {sessionPlan.notes && (
          <div className="space-y-3">
            <h4 className="font-semibold">Notas Adicionales</h4>
            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{sessionPlan.notes}</p>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={handleCopyActivity}>
            <Copy className="mr-2 h-4 w-4" />
            Copiar Actividad
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadActivity}>
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
