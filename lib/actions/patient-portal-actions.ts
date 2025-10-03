"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createPatientPortalAccess(patientId: string, email: string, phone?: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  // Generate unique access code
  const accessCode = Math.random().toString(36).substring(2, 10).toUpperCase()

  const { data, error } = await supabase
    .from("patient_portal_users")
    .insert({
      patient_id: patientId,
      email,
      phone,
      access_code: accessCode,
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating portal access:", error)
    return { error: error.message }
  }

  // TODO: Send email with access code and portal link

  revalidatePath(`/pacientes/${patientId}`)
  return { data }
}

export async function verifyPatientPortalAccess(email: string, accessCode: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("patient_portal_users")
    .select("*, patient:patients(*)")
    .eq("email", email)
    .eq("access_code", accessCode)
    .eq("is_active", true)
    .single()

  if (error || !data) {
    return { error: "Código de acceso inválido" }
  }

  // Update last login
  await supabase.from("patient_portal_users").update({ last_login: new Date().toISOString() }).eq("id", data.id)

  return { data }
}

export async function getPatientActivities(patientId: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("patient_activities")
    .select(
      `
      *,
      activity:activities(*)
    `,
    )
    .eq("patient_id", patientId)
    .order("assigned_date", { ascending: false })

  if (error) {
    console.error("Error fetching patient activities:", error)
    return { error: error.message }
  }

  return { data }
}

export async function markActivityAsViewed(patientId: string, activityId: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from("patient_portal_activities").upsert(
    {
      patient_id: patientId,
      activity_id: activityId,
      viewed_at: new Date().toISOString(),
    },
    {
      onConflict: "patient_id,activity_id",
    },
  )

  if (error) {
    console.error("Error marking activity as viewed:", error)
    return { error: error.message }
  }

  return { success: true }
}

export async function completeActivity(patientId: string, activityId: string, feedback?: string, rating?: number) {
  const supabase = await createServerClient()

  // Update patient_activities
  const { error: activityError } = await supabase
    .from("patient_activities")
    .update({
      status: "Completada",
      completed_date: new Date().toISOString(),
    })
    .eq("patient_id", patientId)
    .eq("activity_id", activityId)

  if (activityError) {
    console.error("Error completing activity:", activityError)
    return { error: activityError.message }
  }

  // Update portal activities
  const { error: portalError } = await supabase.from("patient_portal_activities").upsert(
    {
      patient_id: patientId,
      activity_id: activityId,
      completed_at: new Date().toISOString(),
      feedback,
      rating,
    },
    {
      onConflict: "patient_id,activity_id",
    },
  )

  if (portalError) {
    console.error("Error updating portal activity:", portalError)
    return { error: portalError.message }
  }

  return { success: true }
}

export async function sendPatientMessage(patientId: string, therapistId: string, message: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("patient_portal_messages")
    .insert({
      patient_id: patientId,
      therapist_id: therapistId,
      sender_type: "Patient",
      message,
      is_read: false,
    })
    .select()
    .single()

  if (error) {
    console.error("Error sending message:", error)
    return { error: error.message }
  }

  return { data }
}

export async function getPatientMessages(patientId: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("patient_portal_messages")
    .select(
      `
      *,
      therapist:users(name, avatar_url)
    `,
    )
    .eq("patient_id", patientId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching messages:", error)
    return { error: error.message }
  }

  return { data }
}

export async function sendTherapistMessage(patientId: string, message: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  const { data, error } = await supabase
    .from("patient_portal_messages")
    .insert({
      patient_id: patientId,
      therapist_id: user.id,
      sender_type: "Therapist",
      message,
      is_read: false,
    })
    .select()
    .single()

  if (error) {
    console.error("Error sending message:", error)
    return { error: error.message }
  }

  return { data }
}

export async function getPatientProgress(patientId: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("progress_entries")
    .select("*")
    .eq("patient_id", patientId)
    .order("date", { ascending: true })

  if (error) {
    console.error("Error fetching progress:", error)
    return { error: error.message }
  }

  return { data }
}
