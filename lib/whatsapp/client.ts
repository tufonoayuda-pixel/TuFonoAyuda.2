import { WHATSAPP_CONFIG } from "./config"

export class WhatsAppClient {
  private apiUrl: string
  private phoneNumberId: string
  private accessToken: string

  constructor() {
    this.apiUrl = WHATSAPP_CONFIG.apiUrl
    this.phoneNumberId = WHATSAPP_CONFIG.phoneNumberId
    this.accessToken = WHATSAPP_CONFIG.accessToken
  }

  async sendTextMessage(
    to: string,
    message: string,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // Format phone number (remove spaces, dashes, and ensure it starts with country code)
      const formattedPhone = this.formatPhoneNumber(to)

      const response = await fetch(`${this.apiUrl}/${this.phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: formattedPhone,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("WhatsApp API error:", data)
        return {
          success: false,
          error: data.error?.message || "Error al enviar mensaje",
        }
      }

      return {
        success: true,
        messageId: data.messages?.[0]?.id,
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string,
    parameters: string[],
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const formattedPhone = this.formatPhoneNumber(to)

      const response = await fetch(`${this.apiUrl}/${this.phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: formattedPhone,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: languageCode,
            },
            components: [
              {
                type: "body",
                parameters: parameters.map((param) => ({
                  type: "text",
                  text: param,
                })),
              },
            ],
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("WhatsApp API error:", data)
        return {
          success: false,
          error: data.error?.message || "Error al enviar mensaje",
        }
      }

      return {
        success: true,
        messageId: data.messages?.[0]?.id,
      }
    } catch (error) {
      console.error("Error sending WhatsApp template:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  private formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, "")

    // If it starts with 0, remove it (common in Chile)
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.substring(1)
    }

    // If it doesn't start with country code, add Chile's code (56)
    if (!cleaned.startsWith("56")) {
      cleaned = "56" + cleaned
    }

    return cleaned
  }

  async getMessageStatus(messageId: string): Promise<{ status: string; error?: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/${messageId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          status: "error",
          error: data.error?.message,
        }
      }

      return {
        status: data.status || "unknown",
      }
    } catch (error) {
      console.error("Error getting message status:", error)
      return {
        status: "error",
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }
}
