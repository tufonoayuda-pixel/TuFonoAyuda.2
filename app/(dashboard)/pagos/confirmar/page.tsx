"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2, CreditCard } from "lucide-react"
import { confirmPayment } from "@/lib/actions/payment-actions"
import { Badge } from "@/components/ui/badge"

export default function ConfirmarPagoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [paymentData, setPaymentData] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const token = searchParams.get("token_ws")

    if (!token) {
      setStatus("error")
      setErrorMessage("Token de pago no encontrado")
      return
    }

    confirmPaymentTransaction(token)
  }, [searchParams])

  const confirmPaymentTransaction = async (token: string) => {
    try {
      const result = await confirmPayment(token)

      if (result.error) {
        setStatus("error")
        setErrorMessage(result.error)
        return
      }

      if (result.data) {
        setStatus("success")
        setPaymentData(result.data)
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("Error al confirmar el pago")
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Card>
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
              </div>
              <CardTitle>Procesando Pago</CardTitle>
              <CardDescription>Por favor espera mientras confirmamos tu transacción...</CardDescription>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle2 className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-green-600">Pago Exitoso</CardTitle>
              <CardDescription>Tu pago ha sido procesado correctamente</CardDescription>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-red-100 p-4">
                  <XCircle className="h-16 w-16 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-red-600">Error en el Pago</CardTitle>
              <CardDescription>{errorMessage}</CardDescription>
            </>
          )}
        </CardHeader>

        {status === "success" && paymentData && (
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Monto</span>
                <span className="text-lg font-bold">${paymentData.amount.toLocaleString("es-CL")}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Código de Autorización</span>
                <Badge variant="secondary">{paymentData.authorizationCode}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tarjeta</span>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">**** {paymentData.cardNumber}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fecha</span>
                <span className="text-sm">{new Date(paymentData.transactionDate).toLocaleString("es-CL")}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ID Transacción</span>
                <span className="text-xs font-mono">{paymentData.transactionId}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => router.push("/finanzas")} className="flex-1">
                Ver Finanzas
              </Button>
              <Button onClick={() => router.push("/agenda")} variant="outline" className="flex-1 bg-transparent">
                Ir a Agenda
              </Button>
            </div>
          </CardContent>
        )}

        {status === "error" && (
          <CardContent>
            <div className="flex gap-3">
              <Button onClick={() => router.push("/finanzas")} variant="outline" className="flex-1 bg-transparent">
                Volver a Finanzas
              </Button>
              <Button onClick={() => router.push("/agenda")} className="flex-1">
                Ir a Agenda
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
