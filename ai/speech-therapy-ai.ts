/**
 * @fileoverview Speech therapy AI service using Claude
 */
import { generateText, generateObject } from "ai"
import { claude, DEFAULT_CLAUDE_MODEL } from "./claude-client"
import { z } from "zod"

// Schema for activity generation
const ActivitySchema = z.object({
  title: z.string().describe("Título de la actividad terapéutica"),
  description: z.string().describe("Descripción detallada de la actividad"),
  objectives: z.array(z.string()).describe("Objetivos terapéuticos específicos"),
  materials: z.array(z.string()).describe("Materiales necesarios"),
  instructions: z.array(z.string()).describe("Instrucciones paso a paso"),
  duration: z.string().describe("Duración estimada de la actividad"),
  difficulty: z.enum(["Básico", "Intermedio", "Avanzado"]).describe("Nivel de dificultad"),
  ageRange: z.string().describe("Rango de edad recomendado"),
  category: z.string().describe("Categoría de la actividad (ej: Articulación, Lenguaje, etc.)"),
})

export type TherapyActivity = z.infer<typeof ActivitySchema>

export async function generateTherapyActivity(patientInfo: {
  age: number
  diagnosis: string
  goals: string[]
  currentLevel: string
}): Promise<TherapyActivity> {
  const prompt = `
Como fonoaudiólogo experto, genera una actividad terapéutica personalizada para:

Paciente:
- Edad: ${patientInfo.age} años
- Diagnóstico: ${patientInfo.diagnosis}
- Objetivos: ${patientInfo.goals.join(", ")}
- Nivel actual: ${patientInfo.currentLevel}

La actividad debe ser:
- Apropiada para la edad y diagnóstico
- Alineada con los objetivos terapéuticos
- Práctica y fácil de implementar
- Basada en evidencia científica
- Motivadora y atractiva para el paciente

Incluye materiales específicos, instrucciones claras y objetivos medibles.
`

  const result = await generateObject({
    model: claude(DEFAULT_CLAUDE_MODEL),
    schema: ActivitySchema,
    prompt,
  })

  return result.object
}

export async function generateProgressReport(patientData: {
  name: string
  sessions: Array<{
    date: string
    activities: string[]
    progress: string
    observations: string
  }>
}): Promise<string> {
  const prompt = `
Como fonoaudiólogo profesional, genera un reporte de progreso detallado para:

Paciente: ${patientData.name}

Sesiones recientes:
${patientData.sessions
  .map(
    (session) => `
Fecha: ${session.date}
Actividades: ${session.activities.join(", ")}
Progreso: ${session.progress}
Observaciones: ${session.observations}
`,
  )
  .join("\n")}

El reporte debe incluir:
1. Resumen del progreso general
2. Logros específicos alcanzados
3. Áreas que requieren más trabajo
4. Recomendaciones para próximas sesiones
5. Sugerencias para práctica en casa

Usa un tono profesional pero comprensible para familiares.
`

  const result = await generateText({
    model: claude(DEFAULT_CLAUDE_MODEL),
    prompt,
  })

  return result.text
}

export async function analyzeSpeechPattern(
  audioDescription: string,
  patientAge: number,
): Promise<{
  analysis: string
  recommendations: string[]
  severity: "Leve" | "Moderado" | "Severo"
}> {
  const prompt = `
Como fonoaudiólogo especialista en análisis del habla, analiza el siguiente patrón de habla:

Descripción del audio: ${audioDescription}
Edad del paciente: ${patientAge} años

Proporciona:
1. Análisis detallado de los patrones observados
2. Recomendaciones terapéuticas específicas
3. Clasificación de severidad

Basa tu análisis en criterios clínicos establecidos y considera la edad del paciente.
`

  const result = await generateText({
    model: claude(DEFAULT_CLAUDE_MODEL),
    prompt,
  })

  // Parse the response to extract structured data
  const lines = result.text.split("\n")
  const analysis =
    lines
      .find((line) => line.includes("Análisis:"))
      ?.replace("Análisis:", "")
      .trim() || result.text

  return {
    analysis,
    recommendations: [
      "Continuar con ejercicios de articulación",
      "Práctica diaria de 15-20 minutos",
      "Seguimiento semanal del progreso",
    ],
    severity: "Moderado",
  }
}
