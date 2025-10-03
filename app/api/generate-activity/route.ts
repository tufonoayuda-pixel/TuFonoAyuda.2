import { type NextRequest, NextResponse } from "next/server"
import { generatePersonalizedActivity } from "@/ai/flows/generate-personalized-activity"
import { GeneratePersonalizedActivityInputSchema } from "@/ai/schemas"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input using Zod schema
    const validatedInput = GeneratePersonalizedActivityInputSchema.parse(body)

    // Generate the activity using AI
    const result = await generatePersonalizedActivity(validatedInput)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Error in generate-activity API:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Datos de entrada inválidos", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 })
  }
}
