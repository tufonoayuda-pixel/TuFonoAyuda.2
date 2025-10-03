"use client"

import { PatientListClient } from "@/components/patient/patient-list-client"
import { BulkExport } from "@/components/export/bulk-export"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockExportData = {
  patients: [
    { id: "1", name: "María González", age: 45, diagnosis: "Afasia de Broca", sessions: 12 },
    { id: "2", name: "Juan Pérez", age: 62, diagnosis: "Afasia de Wernicke", sessions: 8 },
    { id: "3", name: "Ana Martín", age: 28, diagnosis: "Disfonía", sessions: 15 },
  ],
  sessions: [
    { id: "1", patientName: "María González", date: "2024-01-15", type: "Terapia", duration: "45 min" },
    { id: "2", patientName: "Juan Pérez", date: "2024-01-16", type: "Evaluación", duration: "60 min" },
    { id: "3", patientName: "Ana Martín", date: "2024-01-17", type: "Seguimiento", duration: "30 min" },
  ],
  evaluations: [
    { id: "1", patientName: "María González", type: "Evaluación Inicial", score: 75 },
    { id: "2", patientName: "Juan Pérez", type: "Evaluación de Progreso", score: 82 },
  ],
  documents: [
    { id: "1", name: "Informe médico", type: "PDF", patient: "María González" },
    { id: "2", name: "Evaluación inicial", type: "DOC", patient: "Juan Pérez" },
  ],
}

export default function PacientesPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Pacientes</h1>
          <p className="text-muted-foreground">Administre la información y progreso de sus pacientes.</p>
        </div>
      </header>

      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Lista de Pacientes</TabsTrigger>
          <TabsTrigger value="export">Exportar Datos</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <PatientListClient />
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <div className="grid gap-6">
            <BulkExport data={mockExportData} />

            <Card>
              <CardHeader>
                <CardTitle>Exportaciones Programadas</CardTitle>
                <CardDescription>Configura exportaciones automáticas de datos de pacientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Las exportaciones programadas estarán disponibles próximamente. Por ahora, puedes realizar
                  exportaciones manuales usando la herramienta de arriba.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
