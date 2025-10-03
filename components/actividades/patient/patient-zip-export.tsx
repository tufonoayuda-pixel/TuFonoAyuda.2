"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileArchive, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import JSZip from "jszip"
const { saveAs } = require("file-saver")

interface PatientZipExportProps {
  patientId: string
  patientName: string
  className?: string
}

export function PatientZipExport({ patientId, patientName, className }: PatientZipExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const exportPatientData = async () => {
    setIsExporting(true)

    try {
      const zip = new JSZip()

      // Patient Information
      const patientInfo = {
        id: patientId,
        name: patientName,
        exportDate: new Date().toISOString(),
        exportedBy: "TuFonoAyuda Platform",
      }

      zip.file("patient-info.json", JSON.stringify(patientInfo, null, 2))

      // Create folders for different data types
      const sessionsFolder = zip.folder("sessions")
      const evaluationsFolder = zip.folder("evaluations")
      const progressFolder = zip.folder("progress-reports")
      const documentsFolder = zip.folder("documents")
      const audioFolder = zip.folder("audio-recordings")

      // Mock data - in real app, fetch from API
      const mockSessionData = {
        sessions: [
          {
            id: "session-1",
            date: "2024-01-15",
            type: "Terapia Individual",
            duration: 45,
            notes: "Excelente progreso en articulación",
            objectives: ["Mejorar pronunciación /r/", "Ejercicios de respiración"],
          },
        ],
      }

      const mockEvaluationData = {
        evaluations: [
          {
            id: "eval-1",
            date: "2024-01-01",
            type: "Evaluación Inicial",
            results: "Dislalia múltiple",
            recommendations: "Terapia 2 veces por semana",
          },
        ],
      }

      // Add files to respective folders
      sessionsFolder?.file("sessions-data.json", JSON.stringify(mockSessionData, null, 2))
      evaluationsFolder?.file("evaluations-data.json", JSON.stringify(mockEvaluationData, null, 2))
      progressFolder?.file(
        "progress-summary.json",
        JSON.stringify(
          {
            overallProgress: "85%",
            lastUpdated: new Date().toISOString(),
            milestones: ["Objetivo 1 completado", "Objetivo 2 en progreso"],
          },
          null,
          2,
        ),
      )

      // Add README file
      const readmeContent = `
# Exportación de Datos del Paciente: ${patientName}

## Contenido del Archivo

- **patient-info.json**: Información básica del paciente
- **sessions/**: Datos de todas las sesiones terapéuticas
- **evaluations/**: Evaluaciones y diagnósticos
- **progress-reports/**: Reportes de progreso
- **documents/**: Documentos adicionales
- **audio-recordings/**: Grabaciones de voz (si disponibles)

## Fecha de Exportación
${new Date().toLocaleDateString("es-ES")}

## Generado por
TuFonoAyuda - Plataforma Profesional para Fonoaudiólogos
      `

      zip.file("README.md", readmeContent)

      // Generate and download ZIP
      const content = await zip.generateAsync({ type: "blob" })
      const fileName = `${patientName.replace(/\s+/g, "_")}_datos_completos_${new Date().toISOString().split("T")[0]}.zip`

      saveAs(content, fileName)

      toast({
        title: "Exportación completada",
        description: `Datos de ${patientName} exportados exitosamente`,
      })
    } catch (error) {
      console.error("Error exporting patient data:", error)
      toast({
        title: "Error en la exportación",
        description: "No se pudieron exportar los datos del paciente",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button onClick={exportPatientData} disabled={isExporting} variant="outline" className={className}>
      {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileArchive className="mr-2 h-4 w-4" />}
      {isExporting ? "Exportando..." : "Exportar ZIP"}
    </Button>
  )
}
