"use server"

/**
 * @fileOverview AI flow to generate a personalized speech therapy activity using Claude.
 *
 * - generatePersonalizedActivity - Creates a detailed, clinically relevant therapy plan.
 */
import { generateObject } from "ai"
import { claude, CLAUDE_MODELS } from "@/ai/claude-client"
import { GeneratePersonalizedActivityOutputSchema } from "@/ai/schemas"
import type { GeneratePersonalizedActivityInput, GeneratePersonalizedActivityOutput } from "@/lib/types"

export async function generatePersonalizedActivity(
  input: GeneratePersonalizedActivityInput,
): Promise<GeneratePersonalizedActivityOutput> {
  const prompt = `Eres FonoAI, un asistente experto en fonoaudiología clínica. Tu tarea es generar una actividad terapéutica detallada, creativa y clínicamente relevante en ESPAÑOL, basada en la información proporcionada.

### Datos del Paciente:
- **Perfil General:** ${input.patientProfile}
- **Necesidad Específica (Objetivo Principal):** ${input.specificNeeds}
- **Duración de la Sesión:** ${input.sessionDuration} minutos
- **Tipo de Sesión:** ${input.sessionType}
- **Población:** ${input.isPediatric ? "Pediátrico (usar lenguaje lúdico y motivador)" : "Adulto (usar lenguaje formal y técnico)"}
- **Contexto Adicional:** ${input.additionalDescription}
- **Referencias Científicas a Considerar:** ${input.scientificReferences || "No se proporcionaron."}

### Instrucciones Clave:
1. **Validez Clínica:** Asegúrate de que la actividad, los objetivos y las técnicas sean coherentes y apropiados para el perfil del paciente y el objetivo.
2. **Creatividad y Personalización:** Utiliza los intereses del paciente (mencionados en el perfil) para que la actividad sea motivadora.
3. **Estructura Completa:** Incluye objetivos específicos, materiales necesarios, procedimiento paso a paso, criterios de evaluación y adaptaciones posibles.

Genera un plan de actividad terapéutica completo y profesional.`

  try {
    const result = await generateObject({
      model: claude(CLAUDE_MODELS.CLAUDE_3_5_SONNET),
      prompt: prompt,
      schema: GeneratePersonalizedActivityOutputSchema,
      temperature: 0.7,
      maxTokens: 2500,
    })

    if (!result.object) {
      throw new Error("La IA no pudo procesar la solicitud. No se generó output.")
    }

    return result.object
  } catch (error: any) {
    console.error("Error generating personalized activity:", error)

    // Fallback response
    return {
      activityTitle: "Actividad Terapéutica Personalizada",
      description:
        "No se pudo generar la actividad automáticamente. Por favor, cree una actividad manual basada en las necesidades del paciente.",
      objectives: ["Objetivo general pendiente de definir"],
      materials: ["Materiales por determinar"],
      procedure: ["Procedimiento por desarrollar"],
      duration: input.sessionDuration,
      evaluationCriteria: ["Criterios por establecer"],
      adaptations: ["Adaptaciones por considerar"],
      clinicalNotes: "Requiere desarrollo manual por parte del profesional.",
    }
  }
}
