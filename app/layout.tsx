import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TuFonoAyuda - Plataforma Profesional para Fonoaudiólogos",
  description:
    "La plataforma completa para fonoaudiólogos profesionales. Gestión de pacientes, actividades con IA, análisis del habla y herramientas especializadas para optimizar tu práctica clínica.",
  keywords:
    "fonoaudiología, terapia del habla, gestión de pacientes, agenda médica, IA terapéutica, análisis acústico, speech therapy",
  authors: [{ name: "Cristóbal San Martín Zamorano", url: "https://tufonoayuda.com" }],
  creator: "TuFonoAyuda",
  publisher: "TuFonoAyuda",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://tufonoayuda.com",
    siteName: "TuFonoAyuda",
    title: "TuFonoAyuda - Plataforma Profesional para Fonoaudiólogos",
    description: "La plataforma completa para fonoaudiólogos profesionales con herramientas de IA y gestión clínica.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TuFonoAyuda - Plataforma Profesional para Fonoaudiólogos",
    description: "La plataforma completa para fonoaudiólogos profesionales con herramientas de IA y gestión clínica.",
    creator: "@tufonoayuda",
  },
  generator: "TuFonoAyuda Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
