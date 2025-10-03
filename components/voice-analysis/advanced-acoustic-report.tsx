"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AcousticAnalysisResult } from "@/lib/audio/acoustic-analyzer"
import { NORMATIVE_VALUES } from "@/lib/audio/acoustic-analyzer"
import { Activity, BarChart3, Radio, TrendingUp, Volume2, Waves } from "lucide-react"

interface AdvancedAcousticReportProps {
  analysis: AcousticAnalysisResult
  patientAge?: number
  patientGender?: "male" | "female"
}

export function AdvancedAcousticReport({
  analysis,
  patientAge = 30,
  patientGender = "male",
}: AdvancedAcousticReportProps) {
  // Determine normative values based on age and gender
  const getNormativeData = () => {
    if (patientAge < 18) return NORMATIVE_VALUES.child
    return patientGender === "female" ? NORMATIVE_VALUES.adult_female : NORMATIVE_VALUES.adult_male
  }

  const normative = getNormativeData()

  const getStatusBadge = (value: number, max: number, inverse = false) => {
    const isNormal = inverse ? value >= max : value <= max
    return (
      <Badge variant={isNormal ? "default" : "destructive"} className="ml-2">
        {isNormal ? "Normal" : "Alterado"}
      </Badge>
    )
  }

  const getQualityColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Voice Quality Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Calidad Vocal General
          </CardTitle>
          <CardDescription>Evaluación global de la calidad de voz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Calidad General</p>
              <p className={`text-3xl font-bold ${getQualityColor(analysis.quality.overall)}`}>
                {analysis.quality.overall}%
              </p>
              <Progress value={analysis.quality.overall} className="mt-2" />
            </div>

            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Soplosidad</p>
              <p className={`text-3xl font-bold ${getQualityColor(100 - analysis.quality.breathiness)}`}>
                {analysis.quality.breathiness}%
              </p>
              <Progress value={analysis.quality.breathiness} className="mt-2" />
            </div>

            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Aspereza</p>
              <p className={`text-3xl font-bold ${getQualityColor(100 - analysis.quality.roughness)}`}>
                {analysis.quality.roughness}%
              </p>
              <Progress value={analysis.quality.roughness} className="mt-2" />
            </div>

            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Tensión</p>
              <p className={`text-3xl font-bold ${getQualityColor(100 - analysis.quality.strain)}`}>
                {analysis.quality.strain}%
              </p>
              <Progress value={analysis.quality.strain} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Acoustic Parameters */}
      <Tabs defaultValue="pitch" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pitch">Tono</TabsTrigger>
          <TabsTrigger value="jitter">Jitter</TabsTrigger>
          <TabsTrigger value="shimmer">Shimmer</TabsTrigger>
          <TabsTrigger value="formants">Formantes</TabsTrigger>
          <TabsTrigger value="other">Otros</TabsTrigger>
        </TabsList>

        <TabsContent value="pitch">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5" />
                Frecuencia Fundamental (F0)
              </CardTitle>
              <CardDescription>Análisis del tono de voz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Media</p>
                  <p className="text-2xl font-bold text-primary">{analysis.f0.mean} Hz</p>
                  {getStatusBadge(analysis.f0.mean, normative.f0.range[1], analysis.f0.mean >= normative.f0.range[0])}
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Mínimo</p>
                  <p className="text-2xl font-bold">{analysis.f0.min} Hz</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Máximo</p>
                  <p className="text-2xl font-bold">{analysis.f0.max} Hz</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Desv. Estándar</p>
                  <p className="text-2xl font-bold">{analysis.f0.std} Hz</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Valores Normativos</p>
                <p className="text-sm text-muted-foreground">
                  Rango esperado: {normative.f0.range[0]} - {normative.f0.range[1]} Hz
                </p>
                <p className="text-sm text-muted-foreground">Media esperada: {normative.f0.mean} Hz</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jitter">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                Jitter (Perturbación de Frecuencia)
              </CardTitle>
              <CardDescription>Variabilidad ciclo a ciclo en la frecuencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Absoluto</p>
                  <p className="text-2xl font-bold">{analysis.jitter.absolute} μs</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Relativo</p>
                  <p className="text-2xl font-bold text-primary">{analysis.jitter.relative}%</p>
                  {getStatusBadge(analysis.jitter.relative, normative.jitter.max)}
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">RAP</p>
                  <p className="text-2xl font-bold">{analysis.jitter.rap}%</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">PPQ5</p>
                  <p className="text-2xl font-bold">{analysis.jitter.ppq5}%</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Interpretación</p>
                <p className="text-sm text-muted-foreground">
                  Jitter normal: {"<"} {normative.jitter.max}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Valores elevados pueden indicar irregularidad en la vibración de las cuerdas vocales
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shimmer">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Shimmer (Perturbación de Amplitud)
              </CardTitle>
              <CardDescription>Variabilidad ciclo a ciclo en la amplitud</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Absoluto</p>
                  <p className="text-2xl font-bold">{analysis.shimmer.absolute} dB</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Relativo</p>
                  <p className="text-2xl font-bold text-primary">{analysis.shimmer.relative}%</p>
                  {getStatusBadge(analysis.shimmer.relative, normative.shimmer.max)}
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">APQ3</p>
                  <p className="text-2xl font-bold">{analysis.shimmer.apq3}%</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">APQ5</p>
                  <p className="text-2xl font-bold">{analysis.shimmer.apq5}%</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Interpretación</p>
                <p className="text-sm text-muted-foreground">
                  Shimmer normal: {"<"} {normative.shimmer.max}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Valores elevados pueden indicar inestabilidad en la amplitud vocal
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formants">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Formantes (Resonancias)
              </CardTitle>
              <CardDescription>Frecuencias de resonancia del tracto vocal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">F1</p>
                  <p className="text-2xl font-bold text-primary">{analysis.formants.f1} Hz</p>
                  <p className="text-xs text-muted-foreground mt-1">Altura vocálica</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">F2</p>
                  <p className="text-2xl font-bold text-primary">{analysis.formants.f2} Hz</p>
                  <p className="text-xs text-muted-foreground mt-1">Anterioridad</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">F3</p>
                  <p className="text-2xl font-bold">{analysis.formants.f3} Hz</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">F4</p>
                  <p className="text-2xl font-bold">{analysis.formants.f4} Hz</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Interpretación</p>
                <p className="text-sm text-muted-foreground">
                  Los formantes reflejan la configuración del tracto vocal y son esenciales para la identificación de
                  vocales
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Otros Parámetros Acústicos
              </CardTitle>
              <CardDescription>HNR e Intensidad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Relación Armónicos-Ruido (HNR)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">HNR</p>
                    <p className="text-2xl font-bold text-primary">{analysis.hnr} dB</p>
                    {getStatusBadge(analysis.hnr, normative.hnr.min, true)}
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Interpretación</p>
                    <p className="text-sm text-muted-foreground">
                      HNR normal: {">"} {normative.hnr.min} dB
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Valores bajos indican mayor componente de ruido en la voz
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Intensidad</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Media</p>
                    <p className="text-2xl font-bold text-primary">{analysis.intensity.mean} dB</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Mínimo</p>
                    <p className="text-2xl font-bold">{analysis.intensity.min} dB</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Máximo</p>
                    <p className="text-2xl font-bold">{analysis.intensity.max} dB</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Desv. Estándar</p>
                    <p className="text-2xl font-bold">{analysis.intensity.std} dB</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Duración</h4>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Duración Total</p>
                  <p className="text-2xl font-bold text-primary">{analysis.duration.toFixed(2)} segundos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
