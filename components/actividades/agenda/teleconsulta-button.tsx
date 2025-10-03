"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import { createTeleconsultaSession } from "@/lib/actions/teleconsulta-actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface TeleconsultaButtonProps {
  sessionId: string
  patientId: string
}

export function TeleconsultaButton({ sessionId, patientId }: TeleconsultaButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleStartTeleconsulta = async () => {
    setIsLoading(true)
    try {
      const result = await createTeleconsultaSession(sessionId, patientId)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      if (result.data) {
        router.push(`/teleconsulta/${result.data.room_id}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo iniciar la teleconsulta",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleStartTeleconsulta} disabled={isLoading} className="gap-2">
      <Video className="h-4 w-4" />
      {isLoading ? "Iniciando..." : "Iniciar Teleconsulta"}
    </Button>
  )
}
