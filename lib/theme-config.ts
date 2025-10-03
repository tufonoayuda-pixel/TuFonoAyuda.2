export interface ThemeConfig {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    mutedForeground: string
    card: string
    cardForeground: string
    border: string
    input: string
    ring: string
  }
  darkColors?: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    mutedForeground: string
    card: string
    cardForeground: string
    border: string
    input: string
    ring: string
  }
  icon: string
  gradient?: string
}

export const customThemes: ThemeConfig[] = [
  {
    id: "sailor-moon",
    name: "Sailor Moon",
    description: "Colores mágicos inspirados en Sailor Moon",
    icon: "🌙",
    gradient: "from-pink-400 via-purple-400 to-blue-400",
    colors: {
      primary: "oklch(0.65 0.25 320)", // Magical pink
      secondary: "oklch(0.85 0.15 280)", // Soft lavender
      accent: "oklch(0.75 0.20 240)", // Moon blue
      background: "oklch(0.98 0.02 320)",
      foreground: "oklch(0.15 0.05 320)",
      muted: "oklch(0.92 0.05 320)",
      mutedForeground: "oklch(0.55 0.05 320)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.15 0.05 320)",
      border: "oklch(0.88 0.05 320)",
      input: "oklch(0.88 0.05 320)",
      ring: "oklch(0.65 0.25 320)",
    },
    darkColors: {
      primary: "oklch(0.75 0.25 320)",
      secondary: "oklch(0.25 0.15 280)",
      accent: "oklch(0.35 0.20 240)",
      background: "oklch(0.08 0.02 320)",
      foreground: "oklch(0.95 0.02 320)",
      muted: "oklch(0.15 0.05 320)",
      mutedForeground: "oklch(0.65 0.05 320)",
      card: "oklch(0.12 0.02 320)",
      cardForeground: "oklch(0.95 0.02 320)",
      border: "oklch(0.22 0.05 320)",
      input: "oklch(0.22 0.05 320)",
      ring: "oklch(0.75 0.25 320)",
    },
  },
  {
    id: "matrix",
    name: "Matrix",
    description: "Tema cyberpunk inspirado en Matrix",
    icon: "🕶️",
    gradient: "from-green-900 via-green-600 to-black",
    colors: {
      primary: "oklch(0.65 0.25 140)", // Matrix green
      secondary: "oklch(0.85 0.10 140)",
      accent: "oklch(0.45 0.30 140)",
      background: "oklch(0.98 0.01 140)",
      foreground: "oklch(0.15 0.05 140)",
      muted: "oklch(0.92 0.02 140)",
      mutedForeground: "oklch(0.55 0.05 140)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.15 0.05 140)",
      border: "oklch(0.88 0.02 140)",
      input: "oklch(0.88 0.02 140)",
      ring: "oklch(0.65 0.25 140)",
    },
    darkColors: {
      primary: "oklch(0.75 0.30 140)",
      secondary: "oklch(0.25 0.15 140)",
      accent: "oklch(0.55 0.35 140)",
      background: "oklch(0.05 0.02 140)",
      foreground: "oklch(0.85 0.15 140)",
      muted: "oklch(0.12 0.05 140)",
      mutedForeground: "oklch(0.65 0.10 140)",
      card: "oklch(0.08 0.02 140)",
      cardForeground: "oklch(0.85 0.15 140)",
      border: "oklch(0.18 0.05 140)",
      input: "oklch(0.18 0.05 140)",
      ring: "oklch(0.75 0.30 140)",
    },
  },
  {
    id: "power-rangers",
    name: "Power Rangers",
    description: "Colores vibrantes de los Power Rangers",
    icon: "⚡",
    gradient: "from-red-500 via-yellow-400 to-blue-500",
    colors: {
      primary: "oklch(0.55 0.30 25)", // Ranger red
      secondary: "oklch(0.85 0.15 60)", // Ranger yellow
      accent: "oklch(0.65 0.25 240)", // Ranger blue
      background: "oklch(0.98 0.02 25)",
      foreground: "oklch(0.15 0.05 25)",
      muted: "oklch(0.92 0.05 25)",
      mutedForeground: "oklch(0.55 0.05 25)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.15 0.05 25)",
      border: "oklch(0.88 0.05 25)",
      input: "oklch(0.88 0.05 25)",
      ring: "oklch(0.55 0.30 25)",
    },
    darkColors: {
      primary: "oklch(0.65 0.30 25)",
      secondary: "oklch(0.25 0.15 60)",
      accent: "oklch(0.35 0.25 240)",
      background: "oklch(0.08 0.02 25)",
      foreground: "oklch(0.95 0.02 25)",
      muted: "oklch(0.15 0.05 25)",
      mutedForeground: "oklch(0.65 0.05 25)",
      card: "oklch(0.12 0.02 25)",
      cardForeground: "oklch(0.95 0.02 25)",
      border: "oklch(0.22 0.05 25)",
      input: "oklch(0.22 0.05 25)",
      ring: "oklch(0.65 0.30 25)",
    },
  },
  {
    id: "esoteric",
    name: "Esotérico",
    description: "Tema místico y esotérico",
    icon: "🔮",
    gradient: "from-purple-900 via-indigo-800 to-violet-900",
    colors: {
      primary: "oklch(0.55 0.25 280)", // Mystic purple
      secondary: "oklch(0.85 0.15 300)",
      accent: "oklch(0.65 0.20 260)",
      background: "oklch(0.98 0.02 280)",
      foreground: "oklch(0.15 0.05 280)",
      muted: "oklch(0.92 0.05 280)",
      mutedForeground: "oklch(0.55 0.05 280)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.15 0.05 280)",
      border: "oklch(0.88 0.05 280)",
      input: "oklch(0.88 0.05 280)",
      ring: "oklch(0.55 0.25 280)",
    },
    darkColors: {
      primary: "oklch(0.65 0.25 280)",
      secondary: "oklch(0.25 0.15 300)",
      accent: "oklch(0.35 0.20 260)",
      background: "oklch(0.06 0.02 280)",
      foreground: "oklch(0.90 0.05 280)",
      muted: "oklch(0.12 0.05 280)",
      mutedForeground: "oklch(0.65 0.05 280)",
      card: "oklch(0.09 0.02 280)",
      cardForeground: "oklch(0.90 0.05 280)",
      border: "oklch(0.18 0.05 280)",
      input: "oklch(0.18 0.05 280)",
      ring: "oklch(0.65 0.25 280)",
    },
  },
  {
    id: "harry-potter",
    name: "Harry Potter",
    description: "Tema mágico inspirado en Hogwarts",
    icon: "⚡",
    gradient: "from-amber-600 via-red-700 to-green-800",
    colors: {
      primary: "oklch(0.45 0.20 40)", // Gryffindor gold
      secondary: "oklch(0.85 0.10 40)",
      accent: "oklch(0.55 0.25 15)", // Gryffindor red
      background: "oklch(0.98 0.02 40)",
      foreground: "oklch(0.15 0.05 40)",
      muted: "oklch(0.92 0.05 40)",
      mutedForeground: "oklch(0.55 0.05 40)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.15 0.05 40)",
      border: "oklch(0.88 0.05 40)",
      input: "oklch(0.88 0.05 40)",
      ring: "oklch(0.45 0.20 40)",
    },
    darkColors: {
      primary: "oklch(0.55 0.20 40)",
      secondary: "oklch(0.25 0.10 40)",
      accent: "oklch(0.35 0.25 15)",
      background: "oklch(0.08 0.02 40)",
      foreground: "oklch(0.95 0.02 40)",
      muted: "oklch(0.15 0.05 40)",
      mutedForeground: "oklch(0.65 0.05 40)",
      card: "oklch(0.12 0.02 40)",
      cardForeground: "oklch(0.95 0.02 40)",
      border: "oklch(0.22 0.05 40)",
      input: "oklch(0.22 0.05 40)",
      ring: "oklch(0.55 0.20 40)",
    },
  },
]

export const getThemeById = (id: string): ThemeConfig | undefined => {
  return customThemes.find((theme) => theme.id === id)
}

export const applyTheme = (theme: ThemeConfig, isDark = false) => {
  const colors = isDark && theme.darkColors ? theme.darkColors : theme.colors
  const root = document.documentElement

  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, "-$1").toLowerCase()
    root.style.setProperty(`--${cssVar}`, value)
  })
}
