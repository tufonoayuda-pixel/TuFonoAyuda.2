"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, Send, User, Stethoscope, ClipboardList, AlertTriangle } from "lucide-react"
import { patients } from "@/lib/mock-data"

export default function InformeDerivacionPage() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedPatientId, setSelectedPatientId] = useState("")

  const [formData, setFormData] = useState({
    // Datos del paciente
    patientId: "",
    // Datos del profesional derivante
    referringDoctor: "",
    referringSpecialty: "",
    referringInstitution: "",
    referringContact: "",
    // Motivo de derivación
    referralReason: "",
    clinicalHistory: "",
    currentSymptoms: "",
    previousTreatments: "",
    // Evaluación realizada
    evaluationDate: "",
    testsPerformed: [] as string[],
    findings: "",
    diagnosis: "",
    // Recomendaciones
    recommendedTreatment: "",
    urgencyLevel: "",
    followUpRequired: false,
    additionalNotes: "",
    // Datos del profesional que deriva
    professionalName: "",
    professionalLicense: "",
    professionalContact: "",
  })

  const availableTests = [
    "Evaluación del Lenguaje Oral",
    "Test de Denominación de Boston",
    "Evaluación de la Deglución",
    "Análisis Acústico de la Voz",
    "Evaluación de la Fluidez",
    "Test de Comprensión Auditiva",
    "Evaluación Articulatoria",
    "Screening Cognitivo",
  ]

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTestToggle = (test: string, checked: boolean) => {
    const updatedTests = checked
      ? [...formData.testsPerformed, test]
      : formData.testsPerformed.filter((t) => t !== test)
    handleInputChange("testsPerformed", updatedTests)
  }

  const handleGenerateReport = async () => {
    if (!selectedPatientId) {
      toast({
        title: "Error",
        description: "Por favor, seleccione un paciente.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Informe Generado",
        description: "El informe de derivación ha sido creado exitosamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el informe. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="h-8 w-8" />
          Informe de Derivación
        </h1>
        <p className="text-muted-foreground">
          Genere informes profesionales para derivar pacientes a otros especialistas.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Selección de Paciente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Selección de Paciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-select">Paciente</Label>
                  <Select
                    value={selectedPatientId}
                    onValueChange={(value) => {
                      setSelectedPatientId(value)
                      handleInputChange("patientId", value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} - {patient.age} años
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedPatient && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">{selectedPatient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedPatient.age} años • {selectedPatient.diagnosis}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Datos del Profesional Derivante */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Profesional que Solicita Derivación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="referring-doctor">Nombre del Médico/Profesional</Label>
                  <Input
                    id="referring-doctor"
                    value={formData.referringDoctor}
                    onChange={(e) => handleInputChange("referringDoctor", e.target.value)}
                    placeholder="Dr. Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referring-specialty">Especialidad</Label>
                  <Input
                    id="referring-specialty"
                    value={formData.referringSpecialty}
                    onChange={(e) => handleInputChange("referringSpecialty", e.target.value)}
                    placeholder="Neurología, Pediatría, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referring-institution">Institución</Label>
                  <Input
                    id="referring-institution"
                    value={formData.referringInstitution}
                    onChange={(e) => handleInputChange("referringInstitution", e.target.value)}
                    placeholder="Hospital, Clínica, Centro de Salud"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referring-contact">Contacto</Label>
                  <Input
                    id="referring-contact"
                    value={formData.referringContact}
                    onChange={(e) => handleInputChange("referringContact", e.target.value)}
                    placeholder="Teléfono o email"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivo de Derivación */}
          <Card>
            <CardHeader>
              <CardTitle>Motivo de Derivación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="referral-reason">Motivo Principal</Label>
                <Textarea
                  id="referral-reason"
                  value={formData.referralReason}
                  onChange={(e) => handleInputChange("referralReason", e.target.value)}
                  placeholder="Describa el motivo principal de la derivación..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinical-history">Antecedentes Clínicos Relevantes</Label>
                <Textarea
                  id="clinical-history"
                  value={formData.clinicalHistory}
                  onChange={(e) => handleInputChange("clinicalHistory", e.target.value)}
                  placeholder="Historial médico relevante, diagnósticos previos..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-symptoms">Síntomas Actuales</Label>
                <Textarea
                  id="current-symptoms"
                  value={formData.currentSymptoms}
                  onChange={(e) => handleInputChange("currentSymptoms", e.target.value)}
                  placeholder="Descripción de los síntomas actuales..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Evaluación Realizada */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Evaluación Fonoaudiológica Realizada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="evaluation-date">Fecha de Evaluación</Label>
                <Input
                  id="evaluation-date"
                  type="date"
                  value={formData.evaluationDate}
                  onChange={(e) => handleInputChange("evaluationDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Tests y Evaluaciones Aplicadas</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableTests.map((test) => (
                    <div key={test} className="flex items-center space-x-2">
                      <Checkbox
                        id={test}
                        checked={formData.testsPerformed.includes(test)}
                        onCheckedChange={(checked) => handleTestToggle(test, checked as boolean)}
                      />
                      <Label htmlFor={test} className="text-sm">
                        {test}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="findings">Hallazgos Principales</Label>
                <Textarea
                  id="findings"
                  value={formData.findings}
                  onChange={(e) => handleInputChange("findings", e.target.value)}
                  placeholder="Resumen de los hallazgos más relevantes..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnóstico Fonoaudiológico</Label>
                <Textarea
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  placeholder="Diagnóstico o impresión diagnóstica..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recomendaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones y Seguimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recommended-treatment">Tratamiento Recomendado</Label>
                <Textarea
                  id="recommended-treatment"
                  value={formData.recommendedTreatment}
                  onChange={(e) => handleInputChange("recommendedTreatment", e.target.value)}
                  placeholder="Recomendaciones terapéuticas específicas..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="urgency-level">Nivel de Urgencia</Label>
                  <Select
                    value={formData.urgencyLevel}
                    onValueChange={(value) => handleInputChange("urgencyLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar urgencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja - Rutinario</SelectItem>
                      <SelectItem value="media">Media - Preferente</SelectItem>
                      <SelectItem value="alta">Alta - Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="follow-up"
                    checked={formData.followUpRequired}
                    onCheckedChange={(checked) => handleInputChange("followUpRequired", checked as boolean)}
                  />
                  <Label htmlFor="follow-up">Requiere seguimiento conjunto</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes">Notas Adicionales</Label>
                <Textarea
                  id="additional-notes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder="Información adicional relevante..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Datos del Profesional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="professional-name">Nombre Completo</Label>
                <Input
                  id="professional-name"
                  value={formData.professionalName}
                  onChange={(e) => handleInputChange("professionalName", e.target.value)}
                  placeholder="Su nombre completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="professional-license">N° Registro Profesional</Label>
                <Input
                  id="professional-license"
                  value={formData.professionalLicense}
                  onChange={(e) => handleInputChange("professionalLicense", e.target.value)}
                  placeholder="Número de registro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="professional-contact">Contacto</Label>
                <Input
                  id="professional-contact"
                  value={formData.professionalContact}
                  onChange={(e) => handleInputChange("professionalContact", e.target.value)}
                  placeholder="Teléfono o email"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleGenerateReport} disabled={isGenerating || !selectedPatientId} className="w-full">
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Generando...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generar Informe
                  </>
                )}
              </Button>

              <Button variant="outline" className="w-full bg-transparent" disabled>
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </Button>

              <Button variant="outline" className="w-full bg-transparent" disabled>
                <Send className="mr-2 h-4 w-4" />
                Enviar por Email
              </Button>
            </CardContent>
          </Card>

          {formData.urgencyLevel === "alta" && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Derivación Urgente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Esta derivación ha sido marcada como urgente. Asegúrese de contactar directamente al profesional
                  derivante.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
