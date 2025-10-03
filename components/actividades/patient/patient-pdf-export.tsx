"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, Loader2, User, Calendar, FileBarChart } from "lucide-react"
import { generatePatientReportPDF, generateEvaluationReportPDF } from "@/lib/pdf-utils"

interface PatientPDFExportProps {
  patient: any
  sessions?: any[]
  evaluations?: any[]
}

export function PatientPDFExport({ patient, sessions = [], evaluations = [] }: PatientPDFExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState("complete")
  const [selectedSections, setSelectedSections] = useState({
    personalInfo: true,
    sessions: true,
    evaluations: true,
    progress: true,
    recommendations: true,
  })
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    try {
      let pdf

      switch (exportType) {
        case "complete":
          pdf = generatePatientReportPDF(patient, sessions)
          if (evaluations.length > 0 && selectedSections.evaluations) {
            // Add evaluation data to the complete report
            evaluations.forEach((evaluation) => {
              pdf.addEvaluationResults(evaluation)
            })
          }
          break

        case "evaluation":
          if (evaluations.length > 0) {
            pdf = generateEvaluationReportPDF(patient, evaluations[0])
          } else {
            throw new Error("No hay evaluaciones disponibles")
          }
          break

        case "sessions":
          pdf = generatePatientReportPDF(patient, sessions)
          break

        default:
          pdf = generatePatientReportPDF(patient, sessions)
      }

      if (pdf) {
        pdf.save(`reporte_${patient.name?.replace(/\s+/g, "_")}_${exportType}.pdf`)

        toast({
          title: "PDF Generado",
          description: `El reporte de ${patient.name} se ha descargado exitosamente.`,
        })
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al generar el PDF. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleSectionToggle = (section: keyof typeof selectedSections) => {
    setSelectedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const sectionOptions = [
    {
      key: "personalInfo" as const,
      label: "Información Personal",
      description: "Datos básicos del paciente",
      icon: <User className="h-4 w-4" />,
    },
    {
      key: "sessions" as const,
      label: "Historial de Sesiones",
      description: "Registro de todas las sesiones",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      key: "evaluations" as const,
      label: "Evaluaciones",
      description: "Resultados de pruebas aplicadas",
      icon: <FileBarChart className="h-4 w-4" />,
    },
    {
      key: "progress" as const,
      label: "Progreso Terapéutico",
      description: "Evolución y mejoras observadas",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      key: "recommendations" as const,
      label: "Recomendaciones",
      description: "Sugerencias y plan futuro",
      icon: <FileText className="h-4 w-4" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Exportar Reporte del Paciente
        </CardTitle>
        <CardDescription>Genera un reporte profesional en PDF con la información del paciente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Reporte</label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complete">Reporte Completo</SelectItem>
                <SelectItem value="evaluation">Solo Evaluaciones</SelectItem>
                <SelectItem value="sessions">Solo Sesiones</SelectItem>
                <SelectItem value="summary">Resumen Ejecutivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {exportType === "complete" && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Secciones a Incluir:</h4>

              {sectionOptions.map((section) => (
                <div key={section.key} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={section.key}
                    checked={selectedSections[section.key]}
                    onCheckedChange={() => handleSectionToggle(section.key)}
                  />
                  <div className="flex items-center gap-2 flex-1">
                    {section.icon}
                    <div className="flex-1">
                      <label
                        htmlFor={section.key}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {section.label}
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Paciente: <span className="font-medium">{patient.name}</span>
            {sessions.length > 0 && <span className="ml-2">• {sessions.length} sesiones</span>}
            {evaluations.length > 0 && <span className="ml-2">• {evaluations.length} evaluaciones</span>}
          </div>

          <Button onClick={handleExport} disabled={isExporting} className="flex items-center gap-2">
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {isExporting ? "Generando PDF..." : "Exportar PDF"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
