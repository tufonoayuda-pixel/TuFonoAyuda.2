"use server"

import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

const ADMIN_EMAIL = "tufonoayuda@gmail.com"
const ADMIN_PASSWORD = "tufonoayuda"

export async function setupAdminAccount() {
  try {
    console.log("[v0] Starting admin account setup...")

    // Create a Supabase client for admin operations
    const cookieStore = await cookies()
    const supabase = createServerClient(cookieStore)

    // First, try to sign up the admin user
    console.log("[v0] Attempting to create admin user in Supabase Auth...")
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      options: {
        data: {
          role: "admin",
          full_name: "Administrador",
        },
      },
    })

    if (signUpError) {
      // If user already exists, that's okay
      if (signUpError.message.includes("already registered")) {
        console.log("[v0] Admin user already exists in Supabase Auth")

        // Try to get the user and update their role
        const {
          data: { users },
          error: listError,
        } = await supabase.auth.admin.listUsers()

        if (listError) {
          console.error("[v0] Error listing users:", listError)
          throw new Error("No se pudo verificar el usuario administrador")
        }

        const adminUser = users?.find((u) => u.email === ADMIN_EMAIL)

        if (adminUser) {
          console.log("[v0] Found existing admin user, updating role in database...")

          // Update the role in the users table
          const { error: updateError } = await supabase.from("users").update({ role: "admin" }).eq("id", adminUser.id)

          if (updateError) {
            console.error("[v0] Error updating user role:", updateError)
            throw new Error("No se pudo actualizar el rol del administrador")
          }

          return {
            success: true,
            message: "Cuenta de administrador ya existe y ha sido actualizada",
          }
        }
      } else {
        console.error("[v0] Signup error:", signUpError)
        throw new Error(`Error al crear cuenta: ${signUpError.message}`)
      }
    }

    if (signUpData.user) {
      console.log("[v0] Admin user created successfully:", signUpData.user.id)

      // Update the role in the users table
      const { error: updateError } = await supabase.from("users").update({ role: "admin" }).eq("id", signUpData.user.id)

      if (updateError) {
        console.error("[v0] Error updating user role:", updateError)
        throw new Error("Usuario creado pero no se pudo asignar el rol de administrador")
      }

      console.log("[v0] Admin role assigned successfully")

      return {
        success: true,
        message: "Cuenta de administrador creada exitosamente",
      }
    }

    throw new Error("No se pudo crear la cuenta de administrador")
  } catch (error: any) {
    console.error("[v0] Admin setup error:", error)
    return {
      success: false,
      message: error.message || "Error al configurar la cuenta de administrador",
    }
  }
}
