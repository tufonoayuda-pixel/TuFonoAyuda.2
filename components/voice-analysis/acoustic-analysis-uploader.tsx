"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Loader2, FileAudio } from "lucide-react"
import { AcousticAnalyzer } from "@/lib/audio/acoustic-analyzer"
import type { AcousticAnalysisResult } from "@/lib/audio/acoustic-analyzer"
import { useToast } from "@/hooks/use-toast"
import { AdvancedAcousticReport } from "./advanced-acoustic-report"

interface AcousticAnalysisUploaderProps {
  patientAge?: number
  patientGender?: "male" | "female"
  onAnalysisComplete?: (result: AcousticAnalysisResult) => void
}

export function AcousticAnalysisUploader({
  patientAge,
  patientGender,
  onAnalysisComplete,
}: AcousticAnalysisUploaderProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AcousticAnalysisResult | null>(null)
  const [fileName, setFileName] = useState("")
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("audio/")) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo de audio válido",
        variant: "destructive",
      })
      return
    }

    setFileName(file.name)
    setIsAnalyzing(true)

    try {
      const analyzer = new AcousticAnalyzer()
      const result = await analyzer.analyzeAudioFile(file)

      setAnalysisResult(result)
      onAnalysisComplete?.(result)

      toast({
        title: "Análisis completado",
        description: "El análisis acústico se ha completado exitosamente",
      })
    } catch (error) {
      console.error("Error analyzing audio:", error)
      toast({
        title: "Error",
        description: "No se pudo analizar el archivo de audio",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análisis Acústico Avanzado</CardTitle>
          <CardDescription>
            Sube una grabación de voz para obtener un análisis detallado de parámetros acústicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
            {isAnalyzing ? (
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="text-sm text-muted-foreground">Analizando audio...</p>
              </div>
            ) : (
              <>
                <FileAudio className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  {fileName || "Selecciona un archivo de audio para analizar"}
                </p>
                <label htmlFor="audio-upload">
                  <Button asChild>
                    <span className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Seleccionar Audio
                    </span>
                  </Button>
                </label>
                <input id="audio-upload" type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                <p className="text-xs text-muted-foreground mt-4">Formatos soportados: WAV, MP3, OGG, M4A</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {analysisResult && (
        <AdvancedAcousticReport analysis={analysisResult} patientAge={patientAge} patientGender={patientGender} />
      )}
    </div>
  )
}
