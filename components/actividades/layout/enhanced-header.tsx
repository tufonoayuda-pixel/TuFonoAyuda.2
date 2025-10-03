"use client"

import { Bell, Search, User, LogOut, Settings, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeAwareButton } from "@/components/ui/theme-aware-button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function EnhancedHeader() {
  const auth = useAuth()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  const user = auth.user
  const logout = auth.logout

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getThemeIcon = () => {
    if (theme?.includes("sailor-moon")) return <Sparkles className="h-4 w-4" />
    if (theme?.includes("matrix")) return <Zap className="h-4 w-4" />
    if (theme?.includes("power-rangers")) return <Zap className="h-4 w-4" />
    if (theme?.includes("esoteric")) return <Sparkles className="h-4 w-4" />
    if (theme?.includes("harry-potter")) return <Sparkles className="h-4 w-4" />
    return <Bell className="h-4 w-4" />
  }

  if (!mounted) {
    return (
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2 px-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar pacientes, actividades..." className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
            </Button>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <motion.header
      className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center gap-2 px-3">
        <motion.div
          className="relative flex-1 max-w-md"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar pacientes, actividades..."
            className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
          />
        </motion.div>
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <ThemeAwareButton variant="ghost" size="icon" className="relative" glow>
            {getThemeIcon()}
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs animate-pulse">3</Badge>
          </ThemeAwareButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ThemeAwareButton variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt="Usuario" />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </ThemeAwareButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || "Usuario"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || "usuario@email.com"}</p>
                  <Badge variant="outline" className="w-fit mt-1">
                    {user?.plan || "Profesional"}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/configuracion")}>
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem>Ayuda</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.header>
  )
}
