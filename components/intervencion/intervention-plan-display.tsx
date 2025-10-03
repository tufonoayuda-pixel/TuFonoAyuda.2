import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Lightbulb, BookOpen } from "lucide-react"
import type { EnhanceInterventionPlanOutput } from "@/lib/types"

interface InterventionPlanDisplayProps {
  analysisResult: EnhanceInterventionPlanOutput
}

export function InterventionPlanDisplay({ analysisResult }: InterventionPlanDisplayProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Plan de Intervención Mejorado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap">{analysisResult.enhancedPlan}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Mejoras Clave Implementadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysisResult.keyImprovements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <Badge variant="secondary" className="mt-0.5">
                  {index + 1}
                </Badge>
                <span className="text-sm">{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Base de Evidencia Utilizada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysisResult.evidenceBase.map((evidence, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {evidence}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notas de Implementación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground whitespace-pre-wrap">{analysisResult.implementationNotes}</div>
        </CardContent>
      </Card>
    </div>
  )
}
