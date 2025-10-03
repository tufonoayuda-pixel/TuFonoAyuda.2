"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Archive, Download, Loader2, Database, FileText, DollarSign, BarChart3, Users, Calendar } from "lucide-react"
import { exportCompleteBackup, exportPatientData, exportFinancialData } from "@/lib/zip-utils"

interface BulkExportProps {
  data?: {
    patients?: any[]
    sessions?: any[]
    evaluations?: any[]
    financial?: any
    reports?: any[]
    documents?: any[]
  }
}

export function BulkExport({ data }: BulkExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState("complete")
  const [selectedCategories, setSelectedCategories] = useState({
    patients: true,
    sessions: true,
    evaluations: true,
    financial: true,
    reports: true,
    documents: false,
  })
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const exportData = {
        patients: selectedCategories.patients ? data?.patients : undefined,
        sessions: selectedCategories.sessions ? data?.sessions : undefined,
        evaluations: selectedCategories.evaluations ? data?.evaluations : undefined,
        financial: selectedCategories.financial ? data?.financial : undefined,
        reports: selectedCategories.reports ? data?.reports : undefined,
        documents: selectedCategories.documents ? data?.documents : undefined,
      }

      switch (exportType) {
        case "complete":
          await exportCompleteBackup(exportData)
          break
        case "patients":
          await exportPatientData(exportData.patients || [], exportData.sessions || [], exportData.evaluations || [])
          break
        case "financial":
          await exportFinancialData(exportData.financial || {})
          break
        default:
          await exportCompleteBackup(exportData)
      }

      toast({
        title: "Exportación Completada",
        description: "Los datos se han exportado exitosamente en formato ZIP.",
      })
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al exportar los datos. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleCategoryToggle = (category: keyof typeof selectedCategories) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const categoriesConfig = [
    {
      key: "patients" as const,
      label: "Datos de Pacientes",
      description: "Información completa de todos los pacientes",
      icon: <Users className="h-4 w-4" />,
      count: data?.patients?.length || 0,
    },
    {
      key: "sessions" as const,
      label: "Historial de Sesiones",
      description: "Registro completo de sesiones terapéuticas",
      icon: <Calendar className="h-4 w-4" />,
      count: data?.sessions?.length || 0,
    },
    {
      key: "evaluations" as const,
      label: "Evaluaciones",
      description: "Resultados de pruebas y evaluaciones",
      icon: <BarChart3 className="h-4 w-4" />,
      count: data?.evaluations?.length || 0,
    },
    {
      key: "financial" as const,
      label: "Datos Financieros",
      description: "Transacciones, facturas y pagos",
      icon: <DollarSign className="h-4 w-4" />,
      count: data?.financial?.transactions?.length || 0,
    },
    {
      key: "reports" as const,
      label: "Reportes Generados",
      description: "Informes y reportes del sistema",
      icon: <FileText className="h-4 w-4" />,
      count: data?.reports?.length || 0,
    },
    {
      key: "documents" as const,
      label: "Documentos",
      description: "Archivos adjuntos y documentos",
      icon: <Database className="h-4 w-4" />,
      count: data?.documents?.length || 0,
    },
  ]

  const selectedCount = Object.values(selectedCategories).filter(Boolean).length
  const totalItems = categoriesConfig.reduce((sum, cat) => (selectedCategories[cat.key] ? sum + cat.count : sum), 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Archive className="h-5 w-5" />
          Exportación Masiva de Datos
        </CardTitle>
        <CardDescription>Exporta todos tus datos en un archivo ZIP organizado y estructurado</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Exportación</label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de exportación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complete">Backup Completo</SelectItem>
                <SelectItem value="patients">Solo Datos de Pacientes</SelectItem>
                <SelectItem value="financial">Solo Datos Financieros</SelectItem>
                <SelectItem value="custom">Exportación Personalizada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(exportType === "complete" || exportType === "custom") && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Categorías a Incluir:</h4>

              {categoriesConfig.map((category) => (
                <div key={category.key} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={category.key}
                    checked={selectedCategories[category.key]}
                    onCheckedChange={() => handleCategoryToggle(category.key)}
                    disabled={exportType !== "complete" && exportType !== "custom"}
                  />
                  <div className="flex items-center gap-2 flex-1">
                    {category.icon}
                    <div className="flex-1">
                      <label
                        htmlFor={category.key}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {category.label}
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">{category.count} elementos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Resumen de Exportación</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Categorías seleccionadas:</span>
              <span className="ml-2 font-medium">
                {selectedCount} de {categoriesConfig.length}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Total de elementos:</span>
              <span className="ml-2 font-medium">{totalItems.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Formato:</span>
              <span className="ml-2 font-medium">ZIP comprimido</span>
            </div>
            <div>
              <span className="text-muted-foreground">Tamaño estimado:</span>
              <span className="ml-2 font-medium">{Math.max(1, Math.ceil(totalItems / 100))} MB</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Los datos se exportarán en formato JSON organizado en carpetas
          </div>

          <Button
            onClick={handleExport}
            disabled={isExporting || selectedCount === 0}
            className="flex items-center gap-2"
          >
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {isExporting ? "Exportando..." : "Exportar ZIP"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
