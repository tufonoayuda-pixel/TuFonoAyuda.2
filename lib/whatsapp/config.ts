// WhatsApp Business API Configuration
export const WHATSAPP_CONFIG = {
  apiUrl: "https://graph.facebook.com/v18.0",
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN || "",
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || "",
}

// Message templates for different reminder types
export const REMINDER_TEMPLATES = {
  "24h": {
    name: "recordatorio_24h",
    language: "es",
    getMessage: (patientName: string, date: string, time: string, therapistName: string) =>
      `Hola ${patientName}, te recordamos tu sesión de fonoaudiología mañana ${date} a las ${time} con ${therapistName}. ¡Te esperamos!`,
  },
  "2h": {
    name: "recordatorio_2h",
    language: "es",
    getMessage: (patientName: string, time: string, therapistName: string) =>
      `Hola ${patientName}, tu sesión con ${therapistName} es en 2 horas (${time}). Por favor confirma tu asistencia.`,
  },
  "30min": {
    name: "recordatorio_30min",
    language: "es",
    getMessage: (patientName: string, time: string) =>
      `Hola ${patientName}, tu sesión comienza en 30 minutos (${time}). ¡Nos vemos pronto!`,
  },
  Custom: {
    name: "recordatorio_personalizado",
    language: "es",
    getMessage: (message: string) => message,
  },
}
