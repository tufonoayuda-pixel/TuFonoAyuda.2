"use server"

import { getSupabaseServerClient } from "./server"
import { redirect } from "next/navigation"

export interface User {
  id: string
  name: string
  email: string
  plan: "Estudiante" | "Profesional" | "Experto" | "Admin"
  avatarUrl?: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}

// Server-side authentication functions
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser()

  if (error || !authUser) {
    return null
  }

  // Fetch user profile from database
  const { data: profile } = await supabase.from("users").select("*").eq("id", authUser.id).single()

  if (!profile) {
    return null
  }

  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    plan: profile.plan,
    avatarUrl: profile.avatar_url || undefined,
    createdAt: new Date(profile.created_at),
  }
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Update last login
  await supabase.from("users").update({ last_login: new Date().toISOString() }).eq("id", data.user.id)

  return { success: true }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
  userType: "student" | "professional",
) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      data: {
        name,
        plan: userType === "student" ? "Estudiante" : "Profesional",
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Create user profile
  if (data.user) {
    await supabase.from("users").insert({
      id: data.user.id,
      email: data.user.email!,
      name,
      plan: userType === "student" ? "Estudiante" : "Profesional",
      status: "Activo",
    })
  }

  return { success: true, needsEmailConfirmation: true }
}

export async function signOut() {
  const supabase = await getSupabaseServerClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

export async function isAdminUser(user: User | null): Promise<boolean> {
  return user?.plan === "Admin"
}

export async function getUserCount(): Promise<number> {
  const supabase = await getSupabaseServerClient()
  const { count } = await supabase.from("users").select("*", { count: "exact", head: true })
  return count || 0
}
