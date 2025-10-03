"use server"

import { createServerClient } from "@/lib/supabase/server"
import { WhatsAppClient } from "@/lib/whatsapp/client"
import { REMINDER_TEMPLATES } from "@/lib/whatsapp/config"
import { revalidatePath } from "next/cache"

export async function scheduleWhatsAppReminder(
  sessionId: string,
  patientId: string,
  phoneNumber: string,
  reminderType: "24h" | "2h" | "30min" | "Custom",
  customMessage?: string,
) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  // Get session details
  const { data: session } = await supabase
    .from("sessions")
    .select(
      `
      *,
      patient:patients(name),
      therapist:users(name)
    `,
    )
    .eq("id", sessionId)
    .single()

  if (!session) {
    return { error: "Sesión no encontrada" }
  }

  // Calculate scheduled time based on reminder type
  const sessionDateTime = new Date(`${session.date}T${session.time}`)
  const scheduledFor = new Date(sessionDateTime)

  switch (reminderType) {
    case "24h":
      scheduledFor.setHours(scheduledFor.getHours() - 24)
      break
    case "2h":
      scheduledFor.setHours(scheduledFor.getHours() - 2)
      break
    case "30min":
      scheduledFor.setMinutes(scheduledFor.getMinutes() - 30)
      break
  }

  // Generate message
  const template = REMINDER_TEMPLATES[reminderType]
  let message = ""

  if (reminderType === "Custom" && customMessage) {
    message = customMessage
  } else {
    const dateStr = sessionDateTime.toLocaleDateString("es-CL")
    const timeStr = sessionDateTime.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
    message = template.getMessage(session.patient.name, dateStr, timeStr, session.therapist.name)
  }

  // Save reminder to database
  const { data, error } = await supabase
    .from("whatsapp_reminders")
    .insert({
      session_id: sessionId,
      patient_id: patientId,
      phone_number: phoneNumber,
      message,
      scheduled_for: scheduledFor.toISOString(),
      reminder_type: reminderType,
      status: "Pendiente",
    })
    .select()
    .single()

  if (error) {
    console.error("Error scheduling reminder:", error)
    return { error: error.message }
  }

  revalidatePath("/agenda")
  return { data }
}

export async function sendWhatsAppReminder(reminderId: string) {
  const supabase = await createServerClient()

  // Get reminder details
  const { data: reminder } = await supabase.from("whatsapp_reminders").select("*").eq("id", reminderId).single()

  if (!reminder) {
    return { error: "Recordatorio no encontrado" }
  }

  // Send message via WhatsApp
  const whatsappClient = new WhatsAppClient()
  const result = await whatsappClient.sendTextMessage(reminder.phone_number, reminder.message)

  // Update reminder status
  const updateData: any = {
    sent_at: new Date().toISOString(),
  }

  if (result.success) {
    updateData.status = "Enviado"
  } else {
    updateData.status = "Fallido"
    updateData.error_message = result.error
  }

  const { error } = await supabase.from("whatsapp_reminders").update(updateData).eq("id", reminderId)

  if (error) {
    console.error("Error updating reminder status:", error)
  }

  return result
}

export async function cancelWhatsAppReminder(reminderId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  const { error } = await supabase.from("whatsapp_reminders").update({ status: "Cancelado" }).eq("id", reminderId)

  if (error) {
    console.error("Error canceling reminder:", error)
    return { error: error.message }
  }

  revalidatePath("/agenda")
  return { success: true }
}

export async function getSessionReminders(sessionId: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("whatsapp_reminders")
    .select("*")
    .eq("session_id", sessionId)
    .order("scheduled_for", { ascending: true })

  if (error) {
    console.error("Error fetching reminders:", error)
    return { error: error.message }
  }

  return { data }
}
