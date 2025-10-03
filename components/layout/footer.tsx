"use client"

import { Mail, Instagram, User, FileText, Shield, Info } from "lucide-react"
import { Brain } from "lucide-react"
import Link from "next/link"

export function AppFooter() {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("tufonoayuda@gmail.com")}`

  return (
    <footer className="mt-auto border-t border-border bg-background/50 text-foreground py-8 px-4 sm:px-6 print:hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h3 className="font-bold text-xl">Diseñado por Fonoaudiólogos, para Fonoaudiólogos</h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Esta plataforma nace de la experiencia clínica real para resolver los desafíos diarios de nuestra profesión.
            Entendemos tus necesidades porque también son las nuestras.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg mb-4">Información Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/about"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors"
              >
                <Info className="h-4 w-4" />
                Quiénes Somos
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors"
              >
                <FileText className="h-4 w-4" />
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors"
              >
                <Shield className="h-4 w-4" />
                Política de Privacidad
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-bold text-lg mb-2">Contacto y Creador</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center justify-center md:justify-end gap-2">
              <User className="h-4 w-4" />
              <span>Flgo. Cristóbal San Martín Zamorano</span>
            </li>
            <li className="flex items-center justify-center md:justify-end gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              <a href={gmailUrl} target="_blank" rel="noopener noreferrer">
                tufonoayuda@gmail.com
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-end gap-2 hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
              <a href="https://www.instagram.com/flgo_crissanmartin" target="_blank" rel="noopener noreferrer">
                @flgo_crissanmartin
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-end gap-2 hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
              <a href="https://www.instagram.com/tufonoayuda" target="_blank" rel="noopener noreferrer">
                @tufonoayuda
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} TuFonoAyuda. Todos los derechos reservados.
      </div>
    </footer>
  )
}
