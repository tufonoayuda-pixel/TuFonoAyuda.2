"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Archive, Download, Loader2, FileText, ImageIcon, Database } from "lucide-react"
import JSZip from "jszip"
const { saveAs } = require("file-saver")

interface ZipExportProps {
  data?: {
    patients?: any[]
    sessions?: any[]
    documents?: any[]
    images?: any[]
    reports?: any[]
  }
}

export function ZipExport({ data }: ZipExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [selectedItems, setSelectedItems] = useState({
    patients: true,
    sessions: true,
    documents: true,
    images: false,
    reports: true,
  })
  const { toast } = useToast()

  const generateZip = async () => {
    setIsExporting(true)

    try {
      const zip = new JSZip()

      // Add metadata
      const metadata = {
        exportDate: new Date().toISOString(),
        platform: "TuFonoAyuda",
        version: "1.0.0",
        exportedBy: "Usuario",
        items: selectedItems,
      }

      zip.file("metadata.json", JSON.stringify(metadata, null, 2))

      // Add selected data
      if (selectedItems.patients && data?.patients) {
        const patientsFolder = zip.folder("pacientes")
        data.patients.forEach((patient, index) => {
          patientsFolder?.file(
            `paciente_${index + 1}_${patient.name?.replace(/\s+/g, "_") || "sin_nombre"}.json`,
            JSON.stringify(patient, null, 2),
          )
        })
      }

      if (selectedItems.sessions && data?.sessions) {
        const sessionsFolder = zip.folder("sesiones")
        data.sessions.forEach((session, index) => {
          sessionsFolder?.file(
            `sesion_${index + 1}_${session.date?.replace(/[^\w]/g, "_") || "sin_fecha"}.json`,
            JSON.stringify(session, null, 2),
          )
        })
      }

      if (selectedItems.documents && data?.documents) {
        const documentsFolder = zip.folder("documentos")
        data.documents.forEach((doc, index) => {
          documentsFolder?.file(
            `documento_${index + 1}_${doc.name?.replace(/\s+/g, "_") || "sin_nombre"}.json`,
            JSON.stringify(doc, null, 2),
          )
        })
      }

      if (selectedItems.reports && data?.reports) {
        const reportsFolder = zip.folder("reportes")
        data.reports.forEach((report, index) => {
          reportsFolder?.file(
            `reporte_${index + 1}_${report.title?.replace(/\s+/g, "_") || "sin_titulo"}.json`,
            JSON.stringify(report, null, 2),
          )
        })
      }

      // Add README
      const readme = `# Exportación de Datos - TuFonoAyuda

## Información de la Exportación
- Fecha: ${new Date().toLocaleDateString("es-CL")}
- Hora: ${new Date().toLocaleTimeString("es-CL")}
- Plataforma: TuFonoAyuda v1.0.0

## Contenido del Archivo
${selectedItems.patients ? "- ✅ Datos de Pacientes" : "- ❌ Datos de Pacientes"}
${selectedItems.sessions ? "- ✅ Sesiones" : "- ❌ Sesiones"}
${selectedItems.documents ? "- ✅ Documentos" : "- ❌ Documentos"}
${selectedItems.images ? "- ✅ Imágenes" : "- ❌ Imágenes"}
${selectedItems.reports ? "- ✅ Reportes" : "- ❌ Reportes"}

## Estructura de Carpetas
- /pacientes/ - Información de pacientes en formato JSON
- /sesiones/ - Datos de sesiones terapéuticas
- /documentos/ - Documentos y archivos adjuntos
- /reportes/ - Reportes generados
- metadata.json - Información de la exportación

## Importación
Para importar estos datos de vuelta a TuFonoAyuda:
1. Accede a Configuración > Avanzado
2. Selecciona "Importar Datos"
3. Sube este archivo ZIP

## Soporte
Si necesitas ayuda con la importación, contacta a soporte@tufonoayuda.com
`

      zip.file("README.md", readme)

      // Generate and download ZIP
      const content = await zip.generateAsync({ type: "blob" })
      const fileName = `tufonoayuda_export_${new Date().toISOString().split("T")[0]}.zip`
      saveAs(content, fileName)

      toast({
        title: "Exportación Completada",
        description: `Los datos se han exportado exitosamente en ${fileName}`,
      })
    } catch (error) {
      console.error("Error generating ZIP:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al generar el archivo ZIP. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleItemToggle = (item: keyof typeof selectedItems) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  const itemsConfig = [
    {
      key: "patients" as const,
      label: "Datos de Pacientes",
      description: "Información completa de pacientes",
      icon: <Database className="h-4 w-4" />,
      count: data?.patients?.length || 0,
    },
    {
      key: "sessions" as const,
      label: "Sesiones",
      description: "Historial de sesiones terapéuticas",
      icon: <FileText className="h-4 w-4" />,
      count: data?.sessions?.length || 0,
    },
    {
      key: "documents" as const,
      label: "Documentos",
      description: "Documentos y archivos adjuntos",
      icon: <FileText className="h-4 w-4" />,
      count: data?.documents?.length || 0,
    },
    {
      key: "images" as const,
      label: "Imágenes",
      description: "Fotos y material visual",
      icon: <ImageIcon className="h-4 w-4" />,
      count: data?.images?.length || 0,
    },
    {
      key: "reports" as const,
      label: "Reportes",
      description: "Reportes generados y evaluaciones",
      icon: <FileText className="h-4 w-4" />,
      count: data?.reports?.length || 0,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Archive className="h-5 w-5" />
          Exportar Datos Completos
        </CardTitle>
        <CardDescription>Descarga todos tus datos en un archivo ZIP organizado</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Selecciona qué datos incluir:</h4>

          {itemsConfig.map((item) => (
            <div key={item.key} className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox
                id={item.key}
                checked={selectedItems[item.key]}
                onCheckedChange={() => handleItemToggle(item.key)}
              />
              <div className="flex items-center gap-2 flex-1">
                {item.icon}
                <div className="flex-1">
                  <label
                    htmlFor={item.key}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {item.label}
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.count} elementos</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {Object.values(selectedItems).filter(Boolean).length} de {Object.keys(selectedItems).length} categorías
            seleccionadas
          </div>

          <Button
            onClick={generateZip}
            disabled={isExporting || !Object.values(selectedItems).some(Boolean)}
            className="flex items-center gap-2"
          >
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {isExporting ? "Generando ZIP..." : "Exportar ZIP"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
