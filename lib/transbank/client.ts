import { getTransbankUrl, getTransbankHeaders } from "./config"

export interface TransactionCreateResponse {
  token: string
  url: string
}

export interface TransactionCommitResponse {
  vci: string
  amount: number
  status: string
  buy_order: string
  session_id: string
  card_detail: {
    card_number: string
  }
  accounting_date: string
  transaction_date: string
  authorization_code: string
  payment_type_code: string
  response_code: number
  installments_number: number
}

export class TransbankClient {
  private baseUrl: string
  private headers: Record<string, string>

  constructor() {
    this.baseUrl = getTransbankUrl()
    this.headers = getTransbankHeaders()
  }

  async createTransaction(
    buyOrder: string,
    sessionId: string,
    amount: number,
    returnUrl: string,
  ): Promise<{ success: boolean; data?: TransactionCreateResponse; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/rswebpaytransaction/api/webpay/v1.2/transactions`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          buy_order: buyOrder,
          session_id: sessionId,
          amount: Math.round(amount), // Amount in CLP (no decimals)
          return_url: returnUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Transbank create transaction error:", data)
        return {
          success: false,
          error: data.error_message || "Error al crear transacción",
        }
      }

      return {
        success: true,
        data: {
          token: data.token,
          url: data.url,
        },
      }
    } catch (error) {
      console.error("Error creating Transbank transaction:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  async commitTransaction(token: string): Promise<{
    success: boolean
    data?: TransactionCommitResponse
    error?: string
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
        method: "PUT",
        headers: this.headers,
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Transbank commit transaction error:", data)
        return {
          success: false,
          error: data.error_message || "Error al confirmar transacción",
        }
      }

      // Check if transaction was approved
      if (data.response_code !== 0) {
        return {
          success: false,
          error: `Transacción rechazada. Código: ${data.response_code}`,
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error("Error committing Transbank transaction:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  async getTransactionStatus(token: string): Promise<{
    success: boolean
    data?: TransactionCommitResponse
    error?: string
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
        method: "GET",
        headers: this.headers,
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Transbank get status error:", data)
        return {
          success: false,
          error: data.error_message || "Error al obtener estado",
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error("Error getting Transbank status:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  async refundTransaction(token: string, amount: number): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(
        `${this.baseUrl}/rswebpaytransaction/api/webpay/v1.2/transactions/${token}/refunds`,
        {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify({
            amount: Math.round(amount),
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        console.error("Transbank refund error:", data)
        return {
          success: false,
          error: data.error_message || "Error al reembolsar",
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error("Error refunding Transbank transaction:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }
}
