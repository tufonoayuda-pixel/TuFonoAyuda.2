"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import {
  FileText,
  Download,
  BarChart3,
  FileSpreadsheet,
  FilePen as FilePdf,
  Mail,
  Printer,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Loader2,
} from "lucide-react"
import { PDFExport } from "@/components/export/pdf-export"
import { PDFGenerator } from "@/lib/pdf-utils"

export default function ReportesPage() {
  const [selectedReportType, setSelectedReportType] = useState("progress")
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportOptions, setReportOptions] = useState({
    includeCharts: true,
    includePhotos: false,
    includeExercises: true,
    includeRecommendations: true,
  })
  const [additionalNotes, setAdditionalNotes] = useState("")
  const { toast } = useToast()

  const reportTypes = [
    {
      id: "progress",
      name: "Reporte de Progreso",
      description: "Informe detallado del progreso terapéutico del paciente",
      icon: BarChart3,
      template: "Incluye objetivos, avances y recomendaciones",
    },
    {
      id: "evaluation",
      name: "Informe de Evaluación",
      description: "Evaluación inicial o de seguimiento completa",
      icon: FileText,
      template: "Diagnóstico, plan terapéutico y pronóstico",
    },
    {
      id: "session",
      name: "Reporte de Sesión",
      description: "Resumen de actividades y observaciones de sesión",
      icon: Clock,
      template: "Actividades realizadas, respuestas y notas",
    },
    {
      id: "discharge",
      name: "Informe de Alta",
      description: "Resumen final del tratamiento y recomendaciones",
      icon: CheckCircle2,
      template: "Objetivos alcanzados y seguimiento posterior",
    },
  ]

  const recentReports = [
    {
      id: 1,
      patient: "María González",
      type: "Reporte de Progreso",
      date: "2024-01-15",
      status: "completed",
      format: "PDF",
    },
    {
      id: 2,
      patient: "Carlos Ruiz",
      type: "Informe de Evaluación",
      date: "2024-01-14",
      status: "pending",
      format: "PDF",
    },
    {
      id: 3,
      patient: "Ana Martín",
      type: "Reporte de Sesión",
      date: "2024-01-13",
      status: "completed",
      format: "Word",
    },
  ]

  const patients = [
    { id: "1", name: "María González", age: 45, diagnosis: "Disfasia" },
    { id: "2", name: "Carlos Ruiz", age: 32, diagnosis: "Tartamudez" },
    { id: "3", name: "Ana Martín", age: 28, diagnosis: "Disfonía" },
    { id: "4", name: "Luis Pérez", age: 55, diagnosis: "Afasia" },
    { id: "5", name: "Carmen López", age: 38, diagnosis: "Dislalia" },
  ]

  const generateReportPDF = async () => {
    if (!selectedPatient) {
      toast({
        title: "Error",
        description: "Por favor selecciona un paciente",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const patient = patients.find((p) => p.id === selectedPatient)
      const reportType = reportTypes.find((r) => r.id === selectedReportType)

      if (!patient || !reportType) {
        throw new Error("Datos no encontrados")
      }

      // Create PDF based on report type
      const pdf = new PDFGenerator({
        title: reportType.name,
        subtitle: `Paciente: ${patient.name}`,
        author: "Dr. Profesional",
        subject: `${reportType.name} - ${patient.name}`,
      })

      // Add patient information
      pdf.addPatientInfo(patient)

      // Add specific content based on report type
      switch (selectedReportType) {
        case "progress":
          pdf.addSection("Progreso Terapéutico", "Evaluación del progreso durante el período seleccionado.")

          // Mock progress data
          const progressData = [
            ["Área Evaluada", "Estado Inicial", "Estado Actual", "Progreso"],
            ["Articulación", "Deficiente", "Bueno", "75%"],
            ["Fluidez", "Moderado", "Leve", "60%"],
            ["Comprensión", "Normal", "Normal", "100%"],
            ["Expresión", "Limitada", "Mejorada", "80%"],
          ]
          pdf.addTable(["Área", "Inicial", "Actual", "Progreso"], progressData.slice(1))
          break

        case "evaluation":
          pdf.addSection("Evaluación Fonoaudiológica", "Resultados de la evaluación completa.")

          const evaluationData = {
            testName: "Evaluación Integral del Lenguaje",
            scores: [
              { domain: "Fonología", rawScore: 45, standardScore: 85, percentile: 16, interpretation: "Bajo promedio" },
              { domain: "Sintaxis", rawScore: 52, standardScore: 95, percentile: 37, interpretation: "Promedio" },
              { domain: "Semántica", rawScore: 48, standardScore: 90, percentile: 25, interpretation: "Promedio bajo" },
            ],
            recommendations: "Se recomienda terapia fonoaudiológica enfocada en aspectos fonológicos y semánticos.",
          }
          pdf.addEvaluationResults(evaluationData)
          break

        case "session":
          pdf.addSection("Resumen de Sesión", `Sesión realizada el ${new Date().toLocaleDateString("es-CL")}`)

          const sessionData = [
            ["Actividad", "Duración", "Respuesta", "Observaciones"],
            ["Ejercicios de articulación", "15 min", "Buena", "Mejoró precisión en /r/"],
            ["Práctica de fluidez", "20 min", "Regular", "Necesita más práctica"],
            ["Comprensión auditiva", "10 min", "Excelente", "Sin dificultades"],
          ]
          pdf.addTable(["Actividad", "Duración", "Respuesta", "Observaciones"], sessionData.slice(1))
          break

        case "discharge":
          pdf.addSection("Informe de Alta", "Resumen del tratamiento completado y recomendaciones futuras.")

          const dischargeInfo = `
          El paciente ${patient.name} ha completado satisfactoriamente el tratamiento fonoaudiológico.
          
          Objetivos alcanzados:
          - Mejora significativa en la articulación
          - Aumento de la fluidez verbal
          - Fortalecimiento de habilidades comunicativas
          
          Recomendaciones para el seguimiento:
          - Práctica diaria de ejercicios en casa
          - Control en 6 meses
          - Mantener estrategias aprendidas
          `
          pdf.addSection("Resumen del Tratamiento", dischargeInfo)
          break
      }

      // Add additional notes if provided
      if (additionalNotes.trim()) {
        pdf.addSection("Notas Adicionales", additionalNotes)
      }

      // Add recommendations section
      if (reportOptions.includeRecommendations) {
        const recommendations = `
        Recomendaciones generales:
        1. Continuar con ejercicios domiciliarios
        2. Mantener seguimiento regular
        3. Aplicar estrategias en contextos naturales
        4. Involucrar a la familia en el proceso
        `
        pdf.addSection("Recomendaciones", recommendations)
      }

      // Generate and save PDF
      const filename = `${reportType.name.toLowerCase().replace(/\s+/g, "_")}_${patient.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
      pdf.save(filename)

      toast({
        title: "Reporte Generado",
        description: `El ${reportType.name.toLowerCase()} de ${patient.name} se ha descargado exitosamente.`,
      })
    } catch (error) {
      console.error("Error generating report:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al generar el reporte. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleOptionChange = (option: keyof typeof reportOptions) => {
    setReportOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  const downloadRecentReport = async (report: any) => {
    const patient = patients.find((p) => p.name === report.patient)
    if (!patient) return

    const pdf = new PDFGenerator({
      title: report.type,
      subtitle: `Paciente: ${report.patient}`,
      author: "Dr. Profesional",
      subject: `${report.type} - ${report.patient}`,
    })

    pdf.addPatientInfo(patient)
    pdf.addSection("Reporte Generado", `Este es un reporte generado el ${report.date}`)

    const filename = `${report.type.toLowerCase().replace(/\s+/g, "_")}_${report.patient.replace(/\s+/g, "_")}.pdf`
    pdf.save(filename)

    toast({
      title: "Reporte Descargado",
      description: `El reporte de ${report.patient} se ha descargado.`,
    })
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-muted-foreground">Genera informes profesionales y reportes detallados de tus pacientes</p>
        </div>
        <Button onClick={generateReportPDF} disabled={isGenerating || !selectedPatient}>
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          {isGenerating ? "Generando..." : "Nuevo Reporte"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Report Generation Form */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generar Nuevo Reporte</CardTitle>
              <CardDescription>Selecciona el tipo de reporte y configura los parámetros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Tipo de Reporte</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {reportTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedReportType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedReportType(type.id)}
                    >
                      <div className="flex items-start gap-3">
                        <type.icon className="h-5 w-5 text-primary mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="font-medium text-sm">{type.name}</h4>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                          <p className="text-xs text-primary">{type.template}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Selection */}
              <div className="space-y-2">
                <Label htmlFor="patient">Paciente</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} - {patient.diagnosis}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Period Selection */}
              <div className="space-y-2">
                <Label htmlFor="period">Período del Reporte</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Últimos 7 días</SelectItem>
                    <SelectItem value="30d">Últimos 30 días</SelectItem>
                    <SelectItem value="90d">Últimos 90 días</SelectItem>
                    <SelectItem value="custom">Período personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea
                  id="notes"
                  placeholder="Incluye observaciones específicas o información adicional para el reporte..."
                  className="min-h-20"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </div>

              {/* Format Options */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Opciones de Formato</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-charts"
                      checked={reportOptions.includeCharts}
                      onCheckedChange={() => handleOptionChange("includeCharts")}
                    />
                    <Label htmlFor="include-charts" className="text-sm">
                      Incluir gráficos y visualizaciones
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-photos"
                      checked={reportOptions.includePhotos}
                      onCheckedChange={() => handleOptionChange("includePhotos")}
                    />
                    <Label htmlFor="include-photos" className="text-sm">
                      Incluir fotografías y material visual
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-exercises"
                      checked={reportOptions.includeExercises}
                      onCheckedChange={() => handleOptionChange("includeExercises")}
                    />
                    <Label htmlFor="include-exercises" className="text-sm">
                      Incluir ejercicios y actividades realizadas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-recommendations"
                      checked={reportOptions.includeRecommendations}
                      onCheckedChange={() => handleOptionChange("includeRecommendations")}
                    />
                    <Label htmlFor="include-recommendations" className="text-sm">
                      Incluir recomendaciones y seguimiento
                    </Label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={generateReportPDF} disabled={isGenerating || !selectedPatient}>
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileText className="mr-2 h-4 w-4" />
                  )}
                  {isGenerating ? "Generando..." : "Generar Reporte PDF"}
                </Button>
                <Button variant="outline" disabled={!selectedPatient}>
                  <Download className="mr-2 h-4 w-4" />
                  Vista Previa
                </Button>
              </div>
            </CardContent>
          </Card>

          <PDFExport
            data={{
              patient: patients.find((p) => p.id === selectedPatient),
              reportType: selectedReportType,
              period: selectedPeriod,
              options: reportOptions,
              notes: additionalNotes,
            }}
            title="Reporte Personalizado"
            type="report"
          />
        </div>

        {/* Recent Reports & Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reportes Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{report.patient}</p>
                      <p className="text-xs text-muted-foreground">{report.type}</p>
                      <p className="text-xs text-muted-foreground">{report.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.status === "completed" ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Listo
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Pendiente
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => downloadRecentReport(report)}
                        disabled={report.status !== "completed"}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={generateReportPDF}
                disabled={!selectedPatient}
              >
                <FilePdf className="mr-2 h-4 w-4" />
                Exportar a PDF
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Exportar a Excel
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="mr-2 h-4 w-4" />
                Enviar por Email
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plantillas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Plantilla de Evaluación Inicial
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Plantilla de Progreso Mensual
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Plantilla de Alta Médica
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Plantilla Personalizada
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
