"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export interface User {
  id: string
  name: string
  email: string
  plan: "Estudiante" | "Profesional" | "Experto" | "Admin"
  role: "admin" | "user"
  avatarUrl?: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  adminLogin: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  register: (userData: {
    email: string
    password: string
    name: string
    userType: "student" | "professional"
  }) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user)
      } else {
        setIsLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user)
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (authUser: SupabaseUser) => {
    try {
      const { data: profile } = await supabase.from("users").select("*").eq("id", authUser.id).single()

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          plan: profile.plan,
          role: profile.role || "user",
          avatarUrl: profile.avatar_url || undefined,
          createdAt: new Date(profile.created_at),
        })
      }
    } catch (error) {
      console.error("Error loading user profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        const { data: profile } = await supabase.from("users").select("role").eq("id", data.user.id).single()

        if (profile?.role === "admin") {
          await supabase.auth.signOut()
          throw new Error("Por favor usa el portal de administrador para iniciar sesión")
        }

        await supabase.from("users").update({ last_login: new Date().toISOString() }).eq("id", data.user.id)

        await loadUserProfile(data.user)
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      throw new Error(error.message || "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      console.log("[v0] Attempting admin login for:", email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("[v0] Auth response:", { hasData: !!data, hasError: !!error, errorMessage: error?.message })

      if (error) {
        console.log("[v0] Authentication failed:", error.message)
        throw error
      }

      if (data.user) {
        console.log("[v0] User authenticated, checking role for user ID:", data.user.id)

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.user.id)
          .single()

        console.log("[v0] Profile check:", { profile, profileError })

        if (profileError) {
          console.log("[v0] Profile not found, user may not be in users table")
          await supabase.auth.signOut()
          throw new Error("Usuario no encontrado en la base de datos. Por favor contacta al administrador.")
        }

        if (profile?.role !== "admin") {
          console.log("[v0] User role is not admin:", profile?.role)
          await supabase.auth.signOut()
          throw new Error("No tienes permisos de administrador")
        }

        console.log("[v0] Admin role verified, updating last login")
        await supabase.from("users").update({ last_login: new Date().toISOString() }).eq("id", data.user.id)

        await loadUserProfile(data.user)
        router.push("/admin/dashboard")
      }
    } catch (error: any) {
      console.error("[v0] Admin login error:", error)
      throw new Error(error.message || "Error al iniciar sesión como administrador")
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      console.error("Google login error:", error)
      throw new Error(error.message || "Error al iniciar sesión con Google")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: {
    email: string
    password: string
    name: string
    userType: "student" | "professional"
  }) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
          data: {
            name: userData.name,
            plan: userData.userType === "student" ? "Estudiante" : "Profesional",
          },
        },
      })

      if (error) throw error

      if (data.user) {
        await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email!,
          name: userData.name,
          plan: userData.userType === "student" ? "Estudiante" : "Profesional",
          status: "Activo",
          role: "user",
        })

        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      throw new Error(error.message || "Error al registrarse")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        adminLogin,
        loginWithGoogle,
        logout,
        register,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
