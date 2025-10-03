import jsPDF from "jspdf"
import "jspdf-autotable"
import { format } from "date-fns"

export interface PDFConfig {
  title: string
  subtitle?: string
  author?: string
  subject?: string
  creator?: string
}

export class PDFGenerator {
  private doc: jsPDF
  private config: PDFConfig
  private currentY = 60

  constructor(config: PDFConfig) {
    this.doc = new jsPDF()
    this.config = config
    this.setupDocument()
  }

  private setupDocument() {
    // Set document properties
    this.doc.setProperties({
      title: this.config.title,
      subject: this.config.subject || this.config.title,
      author: this.config.author || "TuFonoAyuda",
      creator: this.config.creator || "TuFonoAyuda Platform",
    })

    // Add header
    this.addHeader()
  }

  private addHeader() {
    const pageWidth = this.doc.internal.pageSize.width

    // Logo and title
    this.doc.setFontSize(20)
    this.doc.setTextColor(40, 40, 40)
    this.doc.text("TuFonoAyuda", 20, 25)

    // Main title
    this.doc.setFontSize(16)
    this.doc.text(this.config.title, 20, 40)

    if (this.config.subtitle) {
      this.doc.setFontSize(12)
      this.doc.setTextColor(100, 100, 100)
      this.doc.text(this.config.subtitle, 20, 50)
    }

    // Date
    this.doc.setFontSize(10)
    this.doc.setTextColor(100, 100, 100)
    this.doc.text(`Generado el: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, pageWidth - 60, 25)

    // Separator line
    this.doc.setDrawColor(200, 200, 200)
    this.doc.line(20, 55, pageWidth - 20, 55)
  }

  addSection(title: string, content?: string) {
    this.currentY += 15

    this.doc.setFontSize(14)
    this.doc.setTextColor(40, 40, 40)
    this.doc.text(title, 20, this.currentY)

    if (content) {
      this.currentY += 10
      this.doc.setFontSize(10)
      this.doc.setTextColor(60, 60, 60)

      // Split long text into lines
      const lines = this.doc.splitTextToSize(content, 170)
      this.doc.text(lines, 20, this.currentY)
      this.currentY += lines.length * 5
    }

    return this.currentY
  }

  addTable(headers: string[], data: any[][], options?: any) {
    const tableOptions = {
      startY: this.currentY + 10,
      head: [headers],
      body: data,
      theme: "grid",
      styles: { fontSize: 9 },
      headStyles: { fillColor: [66, 139, 202] },
      ...options,
    }
    ;(this.doc as any).autoTable(tableOptions)
    this.currentY = (this.doc as any).lastAutoTable.finalY + 10

    return this.currentY
  }

  addPatientInfo(patient: any) {
    this.addSection("Información del Paciente")

    const patientData = [
      ["Nombre Completo", patient.name || "N/A"],
      ["Edad", patient.age ? `${patient.age} años` : "N/A"],
      ["Fecha de Nacimiento", patient.birthDate || "N/A"],
      ["Diagnóstico Principal", patient.diagnosis || "N/A"],
      ["Fecha de Ingreso", patient.admissionDate || "N/A"],
      ["Teléfono", patient.phone || "N/A"],
      ["Email", patient.email || "N/A"],
      ["Dirección", patient.address || "N/A"],
      ["Contacto de Emergencia", patient.emergencyContact || "N/A"],
    ]

    this.addTable(["Campo", "Información"], patientData)
  }

  addSessionSummary(sessions: any[]) {
    this.addSection("Resumen de Sesiones", `Total de sesiones: ${sessions.length}`)

    const sessionData = sessions.map((session) => [
      format(new Date(session.date), "dd/MM/yyyy"),
      session.type || "N/A",
      session.duration || "N/A",
      session.status || "N/A",
      session.notes ? session.notes.substring(0, 50) + "..." : "Sin notas",
    ])

    this.addTable(["Fecha", "Tipo", "Duración", "Estado", "Notas"], sessionData, { styles: { fontSize: 8 } })
  }

  addFinancialSummary(financial: any) {
    this.addSection("Resumen Financiero")

    const summaryData = [
      ["Ingresos Totales", financial.totalIncome ? `$${financial.totalIncome.toLocaleString("es-CL")}` : "$0"],
      ["Pagos Recibidos", financial.paidAmount ? `$${financial.paidAmount.toLocaleString("es-CL")}` : "$0"],
      ["Pendiente de Cobro", financial.pendingAmount ? `$${financial.pendingAmount.toLocaleString("es-CL")}` : "$0"],
      ["Número de Transacciones", financial.transactionCount?.toString() || "0"],
    ]

    this.addTable(["Concepto", "Valor"], summaryData)

    if (financial.transactions && financial.transactions.length > 0) {
      this.addSection("Detalle de Transacciones")

      const transactionData = financial.transactions.map((t: any) => [
        format(new Date(t.date), "dd/MM/yyyy"),
        t.description || "N/A",
        t.amount ? `$${t.amount.toLocaleString("es-CL")}` : "$0",
        t.status || "N/A",
      ])

      this.addTable(["Fecha", "Descripción", "Monto", "Estado"], transactionData)
    }
  }

  addEvaluationResults(evaluation: any) {
    this.addSection("Resultados de Evaluación")

    if (evaluation.testName) {
      this.addSection("Prueba Aplicada", evaluation.testName)
    }

    if (evaluation.scores && Array.isArray(evaluation.scores)) {
      const scoreData = evaluation.scores.map((score: any) => [
        score.domain || "N/A",
        score.rawScore?.toString() || "N/A",
        score.standardScore?.toString() || "N/A",
        score.percentile?.toString() || "N/A",
        score.interpretation || "N/A",
      ])

      this.addTable(["Dominio", "Puntaje Bruto", "Puntaje Estándar", "Percentil", "Interpretación"], scoreData)
    }

    if (evaluation.recommendations) {
      this.addSection("Recomendaciones", evaluation.recommendations)
    }
  }

  addFooter() {
    const pageHeight = this.doc.internal.pageSize.height
    const pageWidth = this.doc.internal.pageSize.width

    // Professional signature area
    const signatureY = pageHeight - 60

    this.doc.setDrawColor(100, 100, 100)
    this.doc.line(50, signatureY, 160, signatureY)

    this.doc.setFontSize(10)
    this.doc.setTextColor(60, 60, 60)
    this.doc.text("Firma del Profesional", 105, signatureY + 8, { align: "center" })

    if (this.config.author) {
      this.doc.text(this.config.author, 105, signatureY + 16, { align: "center" })
    }

    // Footer
    this.doc.setFontSize(8)
    this.doc.setTextColor(150, 150, 150)
    this.doc.text("TuFonoAyuda - Plataforma Profesional para Fonoaudiólogos", pageWidth / 2, pageHeight - 20, {
      align: "center",
    })

    this.doc.text(
      `Página 1 de 1 - Generado el ${format(new Date(), "dd/MM/yyyy HH:mm")}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" },
    )
  }

  save(filename?: string) {
    this.addFooter()

    const defaultFilename = `${this.config.title.toLowerCase().replace(/\s+/g, "_")}_${format(new Date(), "yyyy-MM-dd")}.pdf`
    this.doc.save(filename || defaultFilename)
  }

  getBlob(): Blob {
    this.addFooter()
    return this.doc.output("blob")
  }
}

// Utility functions for common PDF exports
export const generatePatientReportPDF = (patient: any, sessions: any[] = []) => {
  const pdf = new PDFGenerator({
    title: "Reporte de Paciente",
    subtitle: patient.name,
    author: "Dr. Profesional",
    subject: `Reporte médico de ${patient.name}`,
  })

  pdf.addPatientInfo(patient)

  if (sessions.length > 0) {
    pdf.addSessionSummary(sessions)
  }

  return pdf
}

export const generateFinancialReportPDF = (financial: any, period: string) => {
  const pdf = new PDFGenerator({
    title: "Reporte Financiero",
    subtitle: `Período: ${period}`,
    author: "Dr. Profesional",
    subject: `Reporte financiero - ${period}`,
  })

  pdf.addFinancialSummary(financial)

  return pdf
}

export const generateEvaluationReportPDF = (patient: any, evaluation: any) => {
  const pdf = new PDFGenerator({
    title: "Reporte de Evaluación",
    subtitle: `Paciente: ${patient.name}`,
    author: "Dr. Profesional",
    subject: `Evaluación de ${patient.name}`,
  })

  pdf.addPatientInfo(patient)
  pdf.addEvaluationResults(evaluation)

  return pdf
}
