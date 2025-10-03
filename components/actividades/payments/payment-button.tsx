"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Loader2 } from "lucide-react"
import { createPayment } from "@/lib/actions/payment-actions"
import { useToast } from "@/hooks/use-toast"

interface PaymentButtonProps {
  sessionId: string
  amount: number
  description: string
  variant?: "default" | "outline"
}

export function PaymentButton({ sessionId, amount, description, variant = "default" }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      const result = await createPayment(sessionId, amount, description)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      if (result.data) {
        // Redirect to Transbank payment page
        const form = document.createElement("form")
        form.method = "POST"
        form.action = result.data.url

        const tokenInput = document.createElement("input")
        tokenInput.type = "hidden"
        tokenInput.name = "token_ws"
        tokenInput.value = result.data.token

        form.appendChild(tokenInput)
        document.body.appendChild(form)
        form.submit()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar el pago",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading} variant={variant} className="gap-2">
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Procesando...
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4" />
          Pagar ${amount.toLocaleString("es-CL")}
        </>
      )}
    </Button>
  )
}
