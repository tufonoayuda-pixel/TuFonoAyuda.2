"use client"

import Link from "next/link"
import { Brain, ArrowLeft, Users, Target, Heart, Award, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppFooter } from "@/components/layout/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-8 w-8 text-primary" />
            <span>TuFonoAyuda</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Comenzar Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>

        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Sobre TuFonoAyuda</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Diseñado por fonoaudiólogos, para fonoaudiólogos
            </p>
          </div>

          {/* Mission Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Nuestra Misión</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                TuFonoAyuda nace de la experiencia clínica real y el compromiso de transformar la práctica
                fonoaudiológica mediante tecnología innovadora. Nuestra misión es proporcionar herramientas
                profesionales que optimicen el tiempo de los fonoaudiólogos, mejoren los resultados terapéuticos y
                faciliten la gestión integral de la práctica clínica.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Entendemos los desafíos diarios de nuestra profesión porque también son los nuestros. Por eso, cada
                funcionalidad está diseñada pensando en las necesidades reales de los profesionales de la
                fonoaudiología.
              </p>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Nuestros Valores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Compromiso Profesional</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nos comprometemos con la excelencia en la atención fonoaudiológica, proporcionando herramientas que
                    faciliten una práctica clínica basada en evidencia y centrada en el paciente.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Seguridad y Privacidad</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    La protección de datos médicos sensibles es nuestra prioridad. Cumplimos con todas las normativas de
                    privacidad y seguridad para garantizar la confidencialidad de la información de tus pacientes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Innovación Continua</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Incorporamos las últimas tecnologías de inteligencia artificial para ofrecer soluciones innovadoras
                    que mejoren constantemente la práctica fonoaudiológica.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Comunidad Profesional</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fomentamos una comunidad de fonoaudiólogos que comparten conocimientos, experiencias y mejores
                    prácticas para el crecimiento profesional colectivo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Creator Section */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Creador y Fundador</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Flgo. Cristóbal San Martín Zamorano</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fonoaudiólogo profesional con experiencia clínica en diversas áreas de la fonoaudiología. Cristóbal
                  identificó la necesidad de herramientas digitales especializadas que realmente comprendieran las
                  necesidades de los profesionales de la fonoaudiología.
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Con una visión de combinar la práctica clínica con la tecnología moderna, creó TuFonoAyuda como una
                solución integral que aborda los desafíos reales que enfrentan los fonoaudiólogos en su práctica diaria.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="outline" asChild>
                  <a href="https://www.instagram.com/flgo_crissanmartin" target="_blank" rel="noopener noreferrer">
                    @flgo_crissanmartin
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.instagram.com/tufonoayuda" target="_blank" rel="noopener noreferrer">
                    @tufonoayuda
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("tufonoayuda@gmail.com")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    tufonoayuda@gmail.com
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">¿Por qué elegir TuFonoAyuda?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <strong>Diseñado por profesionales:</strong> Cada funcionalidad nace de la experiencia clínica real
                    y las necesidades identificadas en la práctica diaria.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <strong>Tecnología de vanguardia:</strong> Utilizamos inteligencia artificial avanzada y las últimas
                    herramientas tecnológicas para optimizar tu práctica.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <strong>Soporte especializado:</strong> Nuestro equipo de soporte está formado por fonoaudiólogos
                    que comprenden tus necesidades profesionales.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <strong>Actualizaciones continuas:</strong> Mejoramos constantemente la plataforma basándonos en
                    feedback de la comunidad y evidencia científica actual.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <strong>Seguridad garantizada:</strong> Cumplimiento estricto de normativas de protección de datos
                    médicos y privacidad del paciente.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center space-y-6 py-8">
            <h2 className="text-3xl font-bold">¿Listo para transformar tu práctica?</h2>
            <p className="text-muted-foreground text-lg">
              Únete a más de 500 fonoaudiólogos que ya confían en TuFonoAyuda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Comenzar Prueba Gratuita</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">Ver Planes y Precios</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
