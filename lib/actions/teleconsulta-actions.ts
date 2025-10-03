"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createTeleconsultaSession(sessionId: string, patientId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  // Generate unique room ID
  const roomId = `room-${Date.now()}-${Math.random().toString(36).substring(7)}`

  const { data, error } = await supabase
    .from("teleconsulta_sessions")
    .insert({
      session_id: sessionId,
      patient_id: patientId,
      therapist_id: user.id,
      room_id: roomId,
      status: "Programada",
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating teleconsulta session:", error)
    return { error: error.message }
  }

  revalidatePath("/agenda")
  return { data }
}

export async function startTeleconsultaSession(teleconsultaId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  const { data, error } = await supabase
    .from("teleconsulta_sessions")
    .update({
      status: "En Curso",
      start_time: new Date().toISOString(),
    })
    .eq("id", teleconsultaId)
    .select()
    .single()

  if (error) {
    console.error("Error starting teleconsulta:", error)
    return { error: error.message }
  }

  return { data }
}

export async function endTeleconsultaSession(teleconsultaId: string, notes?: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  const endTime = new Date()

  // Get start time to calculate duration
  const { data: session } = await supabase
    .from("teleconsulta_sessions")
    .select("start_time")
    .eq("id", teleconsultaId)
    .single()

  let durationMinutes = 0
  if (session?.start_time) {
    const startTime = new Date(session.start_time)
    durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000)
  }

  const { data, error } = await supabase
    .from("teleconsulta_sessions")
    .update({
      status: "Finalizada",
      end_time: endTime.toISOString(),
      duration_minutes: durationMinutes,
      notes,
    })
    .eq("id", teleconsultaId)
    .select()
    .single()

  if (error) {
    console.error("Error ending teleconsulta:", error)
    return { error: error.message }
  }

  revalidatePath("/agenda")
  return { data }
}

export async function getTeleconsultaSession(roomId: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("teleconsulta_sessions")
    .select(`
      *,
      patient:patients(*),
      therapist:users(*)
    `)
    .eq("room_id", roomId)
    .single()

  if (error) {
    console.error("Error fetching teleconsulta session:", error)
    return { error: error.message }
  }

  return { data }
}
