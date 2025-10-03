import JSZip from "jszip"
const { saveAs } = require("file-saver")
import { format } from "date-fns"

export interface ZipExportConfig {
  filename?: string
  includeMetadata?: boolean
  compression?: "STORE" | "DEFLATE"
}

export class ZipExporter {
  private zip: JSZip
  private config: ZipExportConfig

  constructor(config: ZipExportConfig = {}) {
    this.zip = new JSZip()
    this.config = {
      includeMetadata: true,
      compression: "DEFLATE",
      ...config,
    }
  }

  addMetadata(data: any) {
    if (!this.config.includeMetadata) return

    const metadata = {
      exportDate: new Date().toISOString(),
      platform: "TuFonoAyuda",
      version: "1.0.0",
      exportedBy: "Usuario",
      totalItems: Object.keys(data).reduce((acc, key) => {
        const items = data[key]
        return acc + (Array.isArray(items) ? items.length : 1)
      }, 0),
      categories: Object.keys(data),
      ...data.metadata,
    }

    this.zip.file("metadata.json", JSON.stringify(metadata, null, 2))
  }

  addPatients(patients: any[]) {
    if (!patients || patients.length === 0) return

    const patientsFolder = this.zip.folder("pacientes")

    patients.forEach((patient, index) => {
      const filename = `paciente_${index + 1}_${this.sanitizeFilename(patient.name || "sin_nombre")}.json`
      patientsFolder?.file(filename, JSON.stringify(patient, null, 2))
    })

    // Add patients summary
    const summary = {
      totalPatients: patients.length,
      averageAge: patients.reduce((sum, p) => sum + (p.age || 0), 0) / patients.length,
      diagnoses: [...new Set(patients.flatMap((p) => p.diagnoses || []))],
      exportDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    }

    patientsFolder?.file("resumen_pacientes.json", JSON.stringify(summary, null, 2))
  }

  addSessions(sessions: any[]) {
    if (!sessions || sessions.length === 0) return

    const sessionsFolder = this.zip.folder("sesiones")

    // Group sessions by patient
    const sessionsByPatient = sessions.reduce(
      (acc, session) => {
        const patientName = session.patientName || session.patient?.name || "sin_paciente"
        if (!acc[patientName]) acc[patientName] = []
        acc[patientName].push(session)
        return acc
      },
      {} as Record<string, any[]>,
    )

    Object.entries(sessionsByPatient).forEach(([patientName, patientSessions]) => {
      const patientFolder = sessionsFolder?.folder(this.sanitizeFilename(patientName))

      patientSessions.forEach((session, index) => {
        const filename = `sesion_${index + 1}_${session.date?.replace(/[^\w]/g, "_") || "sin_fecha"}.json`
        patientFolder?.file(filename, JSON.stringify(session, null, 2))
      })
    })

    // Add sessions summary
    const summary = {
      totalSessions: sessions.length,
      uniquePatients: Object.keys(sessionsByPatient).length,
      sessionTypes: [...new Set(sessions.map((s) => s.type).filter(Boolean))],
      dateRange: {
        earliest: sessions.reduce(
          (earliest, s) => (!earliest || (s.date && s.date < earliest) ? s.date : earliest),
          null,
        ),
        latest: sessions.reduce((latest, s) => (!latest || (s.date && s.date > latest) ? s.date : latest), null),
      },
    }

    sessionsFolder?.file("resumen_sesiones.json", JSON.stringify(summary, null, 2))
  }

  addFinancialData(financial: any) {
    if (!financial) return

    const financeFolder = this.zip.folder("finanzas")

    if (financial.transactions) {
      financeFolder?.file("transacciones.json", JSON.stringify(financial.transactions, null, 2))
    }

    if (financial.invoices) {
      financeFolder?.file("facturas.json", JSON.stringify(financial.invoices, null, 2))
    }

    if (financial.payments) {
      financeFolder?.file("pagos.json", JSON.stringify(financial.payments, null, 2))
    }

    // Add financial summary
    const summary = {
      totalIncome: financial.totalIncome || 0,
      totalExpenses: financial.totalExpenses || 0,
      netIncome: (financial.totalIncome || 0) - (financial.totalExpenses || 0),
      transactionCount: financial.transactions?.length || 0,
      period: financial.period || "N/A",
      currency: "CLP",
    }

    financeFolder?.file("resumen_financiero.json", JSON.stringify(summary, null, 2))
  }

  addEvaluations(evaluations: any[]) {
    if (!evaluations || evaluations.length === 0) return

    const evaluationsFolder = this.zip.folder("evaluaciones")

    evaluations.forEach((evaluation, index) => {
      const filename = `evaluacion_${index + 1}_${this.sanitizeFilename(evaluation.patientName || evaluation.title || "sin_titulo")}.json`
      evaluationsFolder?.file(filename, JSON.stringify(evaluation, null, 2))
    })

    // Add evaluations summary
    const summary = {
      totalEvaluations: evaluations.length,
      evaluationTypes: [...new Set(evaluations.map((e) => e.type).filter(Boolean))],
      patientsEvaluated: [...new Set(evaluations.map((e) => e.patientName).filter(Boolean))].length,
      averageScore: evaluations.reduce((sum, e) => sum + (e.totalScore || 0), 0) / evaluations.length,
    }

    evaluationsFolder?.file("resumen_evaluaciones.json", JSON.stringify(summary, null, 2))
  }

  addReports(reports: any[]) {
    if (!reports || reports.length === 0) return

    const reportsFolder = this.zip.folder("reportes")

    reports.forEach((report, index) => {
      const filename = `reporte_${index + 1}_${this.sanitizeFilename(report.title || report.type || "sin_titulo")}.json`
      reportsFolder?.file(filename, JSON.stringify(report, null, 2))
    })
  }

  addDocuments(documents: any[]) {
    if (!documents || documents.length === 0) return

    const documentsFolder = this.zip.folder("documentos")

    documents.forEach((doc, index) => {
      const filename = `documento_${index + 1}_${this.sanitizeFilename(doc.name || doc.title || "sin_nombre")}.json`
      documentsFolder?.file(filename, JSON.stringify(doc, null, 2))
    })
  }

  addReadme() {
    const readme = `# Exportación de Datos - TuFonoAyuda

## Información de la Exportación
- Fecha: ${format(new Date(), "dd/MM/yyyy")}
- Hora: ${format(new Date(), "HH:mm:ss")}
- Plataforma: TuFonoAyuda v1.0.0

## Estructura del Archivo

### Carpetas Principales
- **/pacientes/** - Información completa de pacientes
- **/sesiones/** - Historial de sesiones terapéuticas organizadas por paciente
- **/evaluaciones/** - Resultados de evaluaciones y pruebas
- **/finanzas/** - Datos financieros, transacciones y facturación
- **/reportes/** - Reportes generados del sistema
- **/documentos/** - Documentos y archivos adjuntos

### Archivos de Resumen
Cada carpeta incluye un archivo de resumen con estadísticas:
- **resumen_pacientes.json** - Estadísticas generales de pacientes
- **resumen_sesiones.json** - Análisis del historial de sesiones
- **resumen_financiero.json** - Resumen económico del período
- **resumen_evaluaciones.json** - Estadísticas de evaluaciones

### Metadata
- **metadata.json** - Información técnica de la exportación

## Formato de Datos
Todos los archivos están en formato JSON para facilitar la importación y análisis.

## Importación
Para importar estos datos de vuelta a TuFonoAyuda:
1. Accede a Configuración > Avanzado
2. Selecciona "Importar Datos"
3. Sube este archivo ZIP

## Privacidad y Seguridad
Este archivo contiene información sensible de pacientes. Manténgalo seguro y elimínelo cuando ya no sea necesario.

## Soporte Técnico
Si necesitas ayuda con la importación o tienes problemas con los datos:
- Email: soporte@tufonoayuda.com
- Documentación: https://docs.tufonoayuda.com

---
Generado automáticamente por TuFonoAyuda
${format(new Date(), "dd/MM/yyyy HH:mm:ss")}
`

    this.zip.file("README.md", readme)
  }

  private sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9\s\-_]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase()
      .substring(0, 50)
  }

  async generate(): Promise<Blob> {
    return await this.zip.generateAsync({
      type: "blob",
      compression: this.config.compression,
      compressionOptions: {
        level: 6,
      },
    })
  }

  async save(filename?: string): Promise<void> {
    const blob = await this.generate()
    const defaultFilename = this.config.filename || `tufonoayuda_export_${format(new Date(), "yyyy-MM-dd")}.zip`
    saveAs(blob, filename || defaultFilename)
  }
}

// Utility functions for common exports
export const exportPatientData = async (patients: any[], sessions: any[] = [], evaluations: any[] = []) => {
  const exporter = new ZipExporter({
    filename: `pacientes_export_${format(new Date(), "yyyy-MM-dd")}.zip`,
  })

  const data = { patients, sessions, evaluations }
  exporter.addMetadata(data)
  exporter.addPatients(patients)
  exporter.addSessions(sessions)
  exporter.addEvaluations(evaluations)
  exporter.addReadme()

  await exporter.save()
}

export const exportFinancialData = async (financial: any) => {
  const exporter = new ZipExporter({
    filename: `finanzas_export_${format(new Date(), "yyyy-MM-dd")}.zip`,
  })

  exporter.addMetadata({ financial })
  exporter.addFinancialData(financial)
  exporter.addReadme()

  await exporter.save()
}

export const exportCompleteBackup = async (data: {
  patients?: any[]
  sessions?: any[]
  evaluations?: any[]
  financial?: any
  reports?: any[]
  documents?: any[]
}) => {
  const exporter = new ZipExporter({
    filename: `backup_completo_${format(new Date(), "yyyy-MM-dd")}.zip`,
  })

  exporter.addMetadata(data)

  if (data.patients) exporter.addPatients(data.patients)
  if (data.sessions) exporter.addSessions(data.sessions)
  if (data.evaluations) exporter.addEvaluations(data.evaluations)
  if (data.financial) exporter.addFinancialData(data.financial)
  if (data.reports) exporter.addReports(data.reports)
  if (data.documents) exporter.addDocuments(data.documents)

  exporter.addReadme()

  await exporter.save()
}
