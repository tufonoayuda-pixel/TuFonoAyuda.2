"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, Loader2, FileImage, FileSpreadsheet } from "lucide-react"
import jsPDF from "jspdf"
import "jspdf-autotable"

interface PDFExportProps {
  data?: any
  title?: string
  type?: "patient" | "session" | "report" | "financial" | "evaluation"
}

export function PDFExport({ data, title = "Documento", type = "report" }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState("pdf")
  const { toast } = useToast()

  const generatePDF = async () => {
    setIsExporting(true)

    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.width
      const pageHeight = doc.internal.pageSize.height

      // Header with logo and title
      doc.setFontSize(20)
      doc.setTextColor(40, 40, 40)
      doc.text("TuFonoAyuda", 20, 25)

      doc.setFontSize(16)
      doc.text(title, 20, 40)

      // Date
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(`Generado el: ${new Date().toLocaleDateString("es-CL")}`, 20, 50)

      // Content based on type
      let yPosition = 70

      switch (type) {
        case "patient":
          yPosition = addPatientContent(doc, data, yPosition)
          break
        case "session":
          yPosition = addSessionContent(doc, data, yPosition)
          break
        case "financial":
          yPosition = addFinancialContent(doc, data, yPosition)
          break
        case "evaluation":
          yPosition = addEvaluationContent(doc, data, yPosition)
          break
        default:
          yPosition = addGenericContent(doc, data, yPosition)
      }

      // Footer
      const footerY = pageHeight - 20
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text("TuFonoAyuda - Plataforma Profesional para Fonoaudiólogos", pageWidth / 2, footerY, { align: "center" })

      // Save the PDF
      const fileName = `${title.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
      doc.save(fileName)

      toast({
        title: "PDF Generado",
        description: `El documento ${title} se ha descargado exitosamente.`,
      })
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

  const addPatientContent = (doc: jsPDF, data: any, yPos: number): number => {
    if (!data) return yPos

    doc.setFontSize(14)
    doc.setTextColor(40, 40, 40)
    doc.text("Información del Paciente", 20, yPos)
    yPos += 15

    const patientInfo = [
      ["Nombre", data.name || "N/A"],
      ["Edad", data.age ? `${data.age} años` : "N/A"],
      ["Diagnóstico", data.diagnosis || "N/A"],
      ["Fecha de Ingreso", data.admissionDate || "N/A"],
      ["Teléfono", data.phone || "N/A"],
      ["Email", data.email || "N/A"],
    ]
    ;(doc as any).autoTable({
      startY: yPos,
      head: [["Campo", "Valor"]],
      body: patientInfo,
      theme: "grid",
      styles: { fontSize: 10 },
    })

    return (doc as any).lastAutoTable.finalY + 20
  }

  const addSessionContent = (doc: jsPDF, data: any, yPos: number): number => {
    if (!data) return yPos

    doc.setFontSize(14)
    doc.setTextColor(40, 40, 40)
    doc.text("Detalles de la Sesión", 20, yPos)
    yPos += 15

    const sessionInfo = [
      ["Paciente", data.patientName || "N/A"],
      ["Fecha", data.date || "N/A"],
      ["Tipo", data.type || "N/A"],
      ["Duración", data.duration || "N/A"],
      ["Objetivos", data.objectives || "N/A"],
      ["Observaciones", data.notes || "N/A"],
    ]
    ;(doc as any).autoTable({
      startY: yPos,
      head: [["Campo", "Valor"]],
      body: sessionInfo,
      theme: "striped",
      styles: { fontSize: 10 },
    })

    return (doc as any).lastAutoTable.finalY + 20
  }

  const addFinancialContent = (doc: jsPDF, data: any, yPos: number): number => {
    if (!data) return yPos

    doc.setFontSize(14)
    doc.setTextColor(40, 40, 40)
    doc.text("Resumen Financiero", 20, yPos)
    yPos += 15

    const financialData = data.transactions || []
    const tableData = financialData.map((item: any) => [
      item.date || "N/A",
      item.description || "N/A",
      item.amount ? `$${item.amount.toLocaleString("es-CL")}` : "N/A",
      item.status || "N/A",
    ])
    ;(doc as any).autoTable({
      startY: yPos,
      head: [["Fecha", "Descripción", "Monto", "Estado"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 9 },
    })

    return (doc as any).lastAutoTable.finalY + 20
  }

  const addEvaluationContent = (doc: jsPDF, data: any, yPos: number): number => {
    if (!data) return yPos

    doc.setFontSize(14)
    doc.setTextColor(40, 40, 40)
    doc.text("Evaluación", 20, yPos)
    yPos += 15

    doc.setFontSize(10)
    doc.setTextColor(60, 60, 60)

    if (data.results) {
      doc.text("Resultados:", 20, yPos)
      yPos += 10

      const results = Array.isArray(data.results) ? data.results : [data.results]
      results.forEach((result: string, index: number) => {
        doc.text(`${index + 1}. ${result}`, 25, yPos)
        yPos += 8
      })
    }

    if (data.recommendations) {
      yPos += 10
      doc.text("Recomendaciones:", 20, yPos)
      yPos += 10

      const recommendations = Array.isArray(data.recommendations) ? data.recommendations : [data.recommendations]
      recommendations.forEach((rec: string, index: number) => {
        doc.text(`${index + 1}. ${rec}`, 25, yPos)
        yPos += 8
      })
    }

    return yPos + 20
  }

  const addGenericContent = (doc: jsPDF, data: any, yPos: number): number => {
    if (!data) {
      doc.setFontSize(12)
      doc.setTextColor(100, 100, 100)
      doc.text("No hay datos disponibles para mostrar.", 20, yPos)
      return yPos + 20
    }

    doc.setFontSize(12)
    doc.setTextColor(60, 60, 60)
    doc.text(JSON.stringify(data, null, 2), 20, yPos)

    return yPos + 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Exportar Documento
        </CardTitle>
        <CardDescription>Genera y descarga documentos en formato PDF profesional</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PDF
                </div>
              </SelectItem>
              <SelectItem value="image">
                <div className="flex items-center gap-2">
                  <FileImage className="h-4 w-4" />
                  Imagen
                </div>
              </SelectItem>
              <SelectItem value="excel">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Excel
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={generatePDF} disabled={isExporting} className="flex items-center gap-2">
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {isExporting ? "Generando..." : "Exportar PDF"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
