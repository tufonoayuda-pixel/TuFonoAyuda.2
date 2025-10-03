import { generateText } from "ai"
import { claude, CLAUDE_MODELS } from "@/ai/claude-client"

export interface AnalyzeReferenceDocumentOutput {
  title: string
  summary: string
  therapeuticAreas: string[]
  keyFindings: string[]
  recommendations: string[]
}

interface AnalyzeReferenceDocumentInput {
  documentDataUri: string
}

export async function analyzeReferenceDocument(
  input: AnalyzeReferenceDocumentInput,
): Promise<AnalyzeReferenceDocumentOutput> {
  try {
    const prompt = `Eres un experto fonoaudiólogo con amplia experiencia en análisis de documentos científicos. Analiza el siguiente documento y proporciona un análisis estructurado.

Documento: ${input.documentDataUri}

Por favor, proporciona tu análisis en el siguiente formato JSON:
{
  "title": "Título descriptivo del documento",
  "summary": "Resumen ejecutivo del documento (2-3 párrafos)",
  "therapeuticAreas": ["área1", "área2", "área3"],
  "keyFindings": ["hallazgo1", "hallazgo2", "hallazgo3"],
  "recommendations": ["recomendación1", "recomendación2", "recomendación3"]
}

Asegúrate de que el análisis sea específico para fonoaudiología y que las áreas terapéuticas sean relevantes para trastornos del habla y lenguaje.`

    const { text } = await generateText({
      model: claude(CLAUDE_MODELS.CLAUDE_3_HAIKU),
      prompt,
      temperature: 0.3,
      maxTokens: 1500,
    })

    // Parse the JSON response
    const analysis = JSON.parse(text)
    return analysis
  } catch (error) {
    console.error("Error analyzing reference document:", error)

    // Fallback response if AI fails
    return {
      title: "Documento de Referencia Fonoaudiológica",
      summary:
        "No se pudo analizar el documento automáticamente. Por favor, revise manualmente el contenido y extraiga la información relevante para el plan terapéutico.",
      therapeuticAreas: ["Evaluación", "Intervención"],
      keyFindings: ["Requiere análisis manual"],
      recommendations: ["Revisar documento manualmente", "Consultar con especialista"],
    }
  }
}
