"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { customThemes, applyTheme, type ThemeConfig } from "@/lib/theme-config"
import { useTheme } from "next-themes"
import { Check, Palette, Sparkles } from "lucide-react"

interface ThemeSelectorProps {
  onThemeChange?: (theme: ThemeConfig) => void
}

export function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>("sailor-moon")
  const { theme: systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("custom-theme")
    if (savedTheme) {
      setSelectedTheme(savedTheme)
      const themeConfig = customThemes.find((t) => t.id === savedTheme)
      if (themeConfig) {
        applyTheme(themeConfig, systemTheme === "dark")
      }
    }
  }, [systemTheme])

  const handleThemeSelect = (theme: ThemeConfig) => {
    setSelectedTheme(theme.id)
    localStorage.setItem("custom-theme", theme.id)
    applyTheme(theme, systemTheme === "dark")
    onThemeChange?.(theme)
  }

  if (!mounted) {
    return <div className="animate-pulse h-96 bg-muted rounded-lg" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5" />
        <h3 className="text-lg font-medium">Temas Personalizados</h3>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Premium
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customThemes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTheme === theme.id ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => handleThemeSelect(theme)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{theme.icon}</span>
                  <CardTitle className="text-base">{theme.name}</CardTitle>
                </div>
                {selectedTheme === theme.id && <Check className="h-4 w-4 text-primary" />}
              </div>
              <CardDescription className="text-sm">{theme.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Theme Preview */}
              <div className="space-y-2">
                <div className="flex gap-1 h-3">
                  <div className="flex-1 rounded-sm" style={{ backgroundColor: theme.colors.primary }} />
                  <div className="flex-1 rounded-sm" style={{ backgroundColor: theme.colors.secondary }} />
                  <div className="flex-1 rounded-sm" style={{ backgroundColor: theme.colors.accent }} />
                </div>
                {theme.gradient && <div className={`h-2 rounded-sm bg-gradient-to-r ${theme.gradient}`} />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
