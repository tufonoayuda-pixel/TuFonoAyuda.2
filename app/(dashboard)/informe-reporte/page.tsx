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
import { FileText, Download, Send, User, Target, TrendingUp, Lightbulb, Star } from "lucide-react"
import { patients } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function InformeReportePage() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedPatientId, setSelectedPatientId] = useState("")

  const [formData, setFormData] = useState({
    // Datos básicos
    patientId: "",
    reportType: "",
    reportPeriod: "",
    sessionCount: "",
    // Objetivos terapéuticos
    initialObjectives: "",
    achievedObjectives: [] as string[],
    partialObjectives: [] as string[],
    pendingObjectives: [] as string[],
    // Progreso del paciente
    overallProgress: "",
    specificImprovements: "",
    challengesEncountered: "",
    patientMotivation: "",
    familyInvolvement: "",
    // Análisis técnico
    techniquesUsed: [] as string[],
    materialsUsed: "",
    sessionFrequency: "",
    homeExercises: "",
    // Recomendaciones y sugerencias
    continueTreatment: false,
    modifyTreatment: false,
    additionalEvaluations: false,
    familyGuidance: "",
    homeRecommendations: "",
    nextSteps: "",
    // Datos del profesional
    professionalObservations: "",
    professionalRecommendations: "",
  })

  const reportTypes = [
    { value: "progress", label: "Informe de Progreso" },
    { value: "discharge", label: "Informe de Alta" },
    { value: "evaluation", label: "Informe de Evaluación" },
    { value: "interim", label: "Informe Intermedio" },
  ]

  const availableTechniques = [
    "Terapia de Articulación",
    "Ejercicios de Respiración",
    "Terapia de Voz",
    "Estimulación del Lenguaje",
    "Terapia de Deglución",
    "Ejercicios Orofaciales",
    "Terapia Cognitiva",
    "Entrenamiento Auditivo",
    "Terapia de Fluidez",
    "Comunicación Aumentativa",
  ]

  const objectivesList = [
    "Mejorar articulación de fonemas específicos",
    "Aumentar vocabulario expresivo",
    "Desarrollar comprensión auditiva",
    "Fortalecer musculatura orofacial",
    "Mejorar coordinación respiratoria",
    "Desarrollar habilidades narrativas",
    "Mejorar inteligibilidad del habla",
    "Reducir disfluencias",
    "Fortalecer deglución segura",
    "Desarrollar comunicación funcional",
  ]

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTechniqueToggle = (technique: string, checked: boolean) => {
    const updatedTechniques = checked
      ? [...formData.techniquesUsed, technique]
      : formData.techniquesUsed.filter((t) => t !== technique)
    handleInputChange("techniquesUsed", updatedTechniques)
  }

  const handleObjectiveToggle = (objective: string, category: "achieved" | "partial" | "pending", checked: boolean) => {
    const field = `${category}Objectives` as keyof typeof formData
    const currentList = formData[field] as string[]
    const updatedList = checked ? [...currentList, objective] : currentList.filter((obj) => obj !== objective)
    handleInputChange(field, updatedList)
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
        description: "El informe de reporte y sugerencias ha sido creado exitosamente.",
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
          Informe de Reporte y Sugerencias
        </h1>
        <p className="text-muted-foreground">
          Genere informes detallados de progreso terapéutico con recomendaciones para pacientes y familias.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Informe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="report-type">Tipo de Informe</Label>
                  <Select value={formData.reportType} onValueChange={(value) => handleInputChange("reportType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-period">Período del Informe</Label>
                  <Input
                    id="report-period"
                    value={formData.reportPeriod}
                    onChange={(e) => handleInputChange("reportPeriod", e.target.value)}
                    placeholder="Ej: Enero - Marzo 2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-count">Número de Sesiones</Label>
                  <Input
                    id="session-count"
                    type="number"
                    value={formData.sessionCount}
                    onChange={(e) => handleInputChange("sessionCount", e.target.value)}
                    placeholder="Ej: 12"
                  />
                </div>
              </div>
              {selectedPatient && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">{selectedPatient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPatient.age} años • {selectedPatient.diagnosis}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Objetivos Terapéuticos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Objetivos Terapéuticos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initial-objectives">Objetivos Iniciales</Label>
                <Textarea
                  id="initial-objectives"
                  value={formData.initialObjectives}
                  onChange={(e) => handleInputChange("initialObjectives", e.target.value)}
                  placeholder="Describa los objetivos planteados al inicio del tratamiento..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <Label>Estado de los Objetivos</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-green-600 font-medium">Objetivos Logrados</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {objectivesList.map((objective) => (
                        <div key={`achieved-${objective}`} className="flex items-center space-x-2">
                          <Checkbox
                            id={`achieved-${objective}`}
                            checked={formData.achievedObjectives.includes(objective)}
                            onCheckedChange={(checked) =>
                              handleObjectiveToggle(objective, "achieved", checked as boolean)
                            }
                          />
                          <Label htmlFor={`achieved-${objective}`} className="text-xs">
                            {objective}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-yellow-600 font-medium">Objetivos Parciales</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {objectivesList.map((objective) => (
                        <div key={`partial-${objective}`} className="flex items-center space-x-2">
                          <Checkbox
                            id={`partial-${objective}`}
                            checked={formData.partialObjectives.includes(objective)}
                            onCheckedChange={(checked) =>
                              handleObjectiveToggle(objective, "partial", checked as boolean)
                            }
                          />
                          <Label htmlFor={`partial-${objective}`} className="text-xs">
                            {objective}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-600 font-medium">Objetivos Pendientes</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {objectivesList.map((objective) => (
                        <div key={`pending-${objective}`} className="flex items-center space-x-2">
                          <Checkbox
                            id={`pending-${objective}`}
                            checked={formData.pendingObjectives.includes(objective)}
                            onCheckedChange={(checked) =>
                              handleObjectiveToggle(objective, "pending", checked as boolean)
                            }
                          />
                          <Label htmlFor={`pending-${objective}`} className="text-xs">
                            {objective}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progreso del Paciente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Análisis del Progreso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="overall-progress">Progreso General</Label>
                <Select
                  value={formData.overallProgress}
                  onValueChange={(value) => handleInputChange("overallProgress", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Evaluar progreso general" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excelente">Excelente - Superó expectativas</SelectItem>
                    <SelectItem value="muy-bueno">Muy Bueno - Cumplió objetivos</SelectItem>
                    <SelectItem value="bueno">Bueno - Progreso satisfactorio</SelectItem>
                    <SelectItem value="regular">Regular - Progreso lento</SelectItem>
                    <SelectItem value="limitado">Limitado - Requiere ajustes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specific-improvements">Mejoras Específicas Observadas</Label>
                <Textarea
                  id="specific-improvements"
                  value={formData.specificImprovements}
                  onChange={(e) => handleInputChange("specificImprovements", e.target.value)}
                  placeholder="Describa las mejoras específicas observadas en el paciente..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges-encountered">Desafíos Encontrados</Label>
                <Textarea
                  id="challenges-encountered"
                  value={formData.challengesEncountered}
                  onChange={(e) => handleInputChange("challengesEncountered", e.target.value)}
                  placeholder="Describa los principales desafíos o dificultades..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-motivation">Motivación del Paciente</Label>
                  <Select
                    value={formData.patientMotivation}
                    onValueChange={(value) => handleInputChange("patientMotivation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Evaluar motivación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta - Muy comprometido</SelectItem>
                      <SelectItem value="media">Media - Participativo</SelectItem>
                      <SelectItem value="baja">Baja - Requiere motivación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family-involvement">Participación Familiar</Label>
                  <Select
                    value={formData.familyInvolvement}
                    onValueChange={(value) => handleInputChange("familyInvolvement", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Evaluar participación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta - Muy involucrada</SelectItem>
                      <SelectItem value="media">Media - Participativa</SelectItem>
                      <SelectItem value="baja">Baja - Requiere mayor apoyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Técnicas y Metodología */}
          <Card>
            <CardHeader>
              <CardTitle>Técnicas y Metodología Utilizada</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Técnicas Terapéuticas Aplicadas</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableTechniques.map((technique) => (
                    <div key={technique} className="flex items-center space-x-2">
                      <Checkbox
                        id={technique}
                        checked={formData.techniquesUsed.includes(technique)}
                        onCheckedChange={(checked) => handleTechniqueToggle(technique, checked as boolean)}
                      />
                      <Label htmlFor={technique} className="text-sm">
                        {technique}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="materials-used">Materiales Utilizados</Label>
                  <Textarea
                    id="materials-used"
                    value={formData.materialsUsed}
                    onChange={(e) => handleInputChange("materialsUsed", e.target.value)}
                    placeholder="Describa los materiales y recursos utilizados..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="home-exercises">Ejercicios en Casa</Label>
                  <Textarea
                    id="home-exercises"
                    value={formData.homeExercises}
                    onChange={(e) => handleInputChange("homeExercises", e.target.value)}
                    placeholder="Ejercicios y actividades recomendadas para el hogar..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recomendaciones y Sugerencias */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recomendaciones y Sugerencias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Plan de Continuidad</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="continue-treatment"
                      checked={formData.continueTreatment}
                      onCheckedChange={(checked) => handleInputChange("continueTreatment", checked as boolean)}
                    />
                    <Label htmlFor="continue-treatment">Continuar tratamiento actual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="modify-treatment"
                      checked={formData.modifyTreatment}
                      onCheckedChange={(checked) => handleInputChange("modifyTreatment", checked as boolean)}
                    />
                    <Label htmlFor="modify-treatment">Modificar enfoque terapéutico</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="additional-evaluations"
                      checked={formData.additionalEvaluations}
                      onCheckedChange={(checked) => handleInputChange("additionalEvaluations", checked as boolean)}
                    />
                    <Label htmlFor="additional-evaluations">Requiere evaluaciones adicionales</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="family-guidance">Orientaciones para la Familia</Label>
                <Textarea
                  id="family-guidance"
                  value={formData.familyGuidance}
                  onChange={(e) => handleInputChange("familyGuidance", e.target.value)}
                  placeholder="Recomendaciones específicas para la familia..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-recommendations">Recomendaciones para el Hogar</Label>
                <Textarea
                  id="home-recommendations"
                  value={formData.homeRecommendations}
                  onChange={(e) => handleInputChange("homeRecommendations", e.target.value)}
                  placeholder="Actividades y estrategias para implementar en casa..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="next-steps">Próximos Pasos</Label>
                <Textarea
                  id="next-steps"
                  value={formData.nextSteps}
                  onChange={(e) => handleInputChange("nextSteps", e.target.value)}
                  placeholder="Plan de acción para las próximas sesiones..."
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
              <CardTitle>Resumen del Progreso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {formData.achievedObjectives.length + formData.partialObjectives.length}
                </div>
                <div className="text-sm text-muted-foreground">Objetivos con progreso</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Logrados</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {formData.achievedObjectives.length}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Parciales</span>
                  <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                    {formData.partialObjectives.length}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pendientes</span>
                  <Badge variant="default" className="bg-red-100 text-red-800">
                    {formData.pendingObjectives.length}
                  </Badge>
                </div>
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
                Enviar a Familia
              </Button>
            </CardContent>
          </Card>

          {formData.overallProgress && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Evaluación General
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Badge
                    variant="default"
                    className={
                      formData.overallProgress === "excelente"
                        ? "bg-green-100 text-green-800"
                        : formData.overallProgress === "muy-bueno"
                          ? "bg-blue-100 text-blue-800"
                          : formData.overallProgress === "bueno"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }
                  >
                    {formData.overallProgress.replace("-", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
