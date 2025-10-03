"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, Shield, ArrowRight, AlertCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { setupAdminAccount } from "@/lib/actions/admin-setup-actions"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("tufonoayuda@gmail.com")
  const [password, setPassword] = useState("tufonoayuda")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showSetupPrompt, setShowSetupPrompt] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { adminLogin } = useAuth()

  const handleSetupAdmin = async () => {
    setIsSettingUp(true)
    setErrorMessage("")

    try {
      console.log("[v0] Setting up admin account...")
      const result = await setupAdminAccount()

      if (result.success) {
        toast({
          title: "Configuración exitosa",
          description: result.message,
        })
        setShowSetupPrompt(false)
        // Auto-fill credentials
        setEmail("tufonoayuda@gmail.com")
        setPassword("tufonoayuda")
      } else {
        toast({
          title: "Error en la configuración",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("[v0] Setup error:", error)
      toast({
        title: "Error",
        description: "No se pudo configurar la cuenta de administrador",
        variant: "destructive",
      })
    } finally {
      setIsSettingUp(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    setShowSetupPrompt(false)

    try {
      await adminLogin(email, password)
      toast({
        title: "Acceso administrativo concedido",
        description: "Bienvenido al panel de administración.",
      })
      router.push("/admin/dashboard")
    } catch (error: any) {
      console.error("[v0] Login failed:", error)

      let userMessage = error.message || "Credenciales incorrectas"

      if (error.message?.includes("Invalid login credentials")) {
        userMessage = "No se encontró una cuenta con estas credenciales."
        setErrorMessage("Si es tu primera vez, necesitas crear la cuenta de administrador primero.")
        setShowSetupPrompt(true)
      } else if (error.message?.includes("Usuario no encontrado")) {
        userMessage = "Usuario no encontrado en la base de datos."
        setErrorMessage("Por favor, completa la configuración inicial.")
        setShowSetupPrompt(true)
      } else if (error.message?.includes("No tienes permisos")) {
        userMessage = "Esta cuenta no tiene permisos de administrador."
        setErrorMessage("Contacta al administrador del sistema para obtener acceso.")
      }

      toast({
        title: "Error de autenticación",
        description: userMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600 text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">TuFonoAyuda</h1>
              <p className="text-sm text-slate-400">Panel de Administración</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Acceso Administrativo</h2>
          <p className="text-slate-400 mt-2">Ingresa tus credenciales de administrador</p>
        </div>

        {errorMessage && (
          <Alert className="border-amber-600 bg-amber-950/50 text-amber-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p>{errorMessage}</p>
                {showSetupPrompt && (
                  <Button
                    onClick={handleSetupAdmin}
                    className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white"
                    size="sm"
                    disabled={isSettingUp}
                  >
                    {isSettingUp ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Configurando...
                      </>
                    ) : (
                      <>
                        <Settings className="mr-2 h-4 w-4" />
                        Crear Cuenta de Administrador Ahora
                      </>
                    )}
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white">Portal de Administrador</CardTitle>
            <CardDescription className="text-slate-400">
              Solo usuarios con permisos de administrador pueden acceder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@tufonoayuda.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando credenciales...
                  </>
                ) : (
                  <>
                    Acceder al Panel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="text-center text-sm text-slate-400">
                ¿Primera vez configurando el sistema?{" "}
                <Link href="/admin/setup" className="text-red-400 hover:underline font-medium">
                  Configurar administrador
                </Link>
              </div>
              <div className="text-center text-sm text-slate-400">
                ¿Eres un profesional?{" "}
                <Link href="/login" className="text-red-400 hover:underline font-medium">
                  Ir al login de usuarios
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-slate-500">
          <p>Este portal está protegido y solo accesible para administradores autorizados.</p>
        </div>
      </div>
    </div>
  )
}
