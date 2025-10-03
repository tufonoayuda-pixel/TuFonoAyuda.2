"use client"
import Link from "next/link"
import {
  Brain,
  CheckCircle2,
  X,
  Sparkles,
  Shield,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Star,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppFooter } from "@/components/layout/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingPage() {
  const plans = [
    {
      name: "Estudiante",
      icon: GraduationCap,
      description: "Herramientas esenciales para tu formación y práctica clínica",
      monthlyPrice: 4990,
      popular: false,
      trialDays: 5,
      features: [
        "Gestión de hasta 10 pacientes",
        "Generador de Actividades IA (30 usos/mes)",
        "Agenda digital con recordatorios por email",
        "Herramientas Clínicas básicas (CalcuTELator)",
        "Acceso completo a Academia FonoAyuda",
        "Soporte por comunidad estudiantil",
      ],
      limitations: [
        "Sin análisis del habla",
        "Sin reportes automáticos",
        "Sin integraciones",
        "Sin múltiples usuarios",
      ],
      highlight: "Ideal para aprender",
    },
    {
      name: "Profesional",
      icon: Briefcase,
      description: "Para el profesional que busca crecer y optimizar su consulta",
      monthlyPrice: 12990,
      popular: true,
      trialDays: 5,
      features: [
        "Pacientes ilimitados",
        "Generador de Actividades IA (USOS ILIMITADOS)",
        "Recordatorios por WhatsApp automáticos",
        "Módulo completo de Finanzas y Reportes",
        "Teleconsulta (10 sesiones/mes incluidas)",
        "Soporte prioritario 24/7",
        "Todas las herramientas clínicas",
        "Exportación profesional de reportes",
      ],
      limitations: ["Sin múltiples usuarios", "Sin API personalizada"],
      highlight: "Más elegido por profesionales",
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-8 w-8 text-primary" />
            <span>TuFonoAyuda</span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Características
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-foreground">
              Precios
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contacto
            </Link>
          </nav>

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

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Sparkles className="mr-2 h-4 w-4" />
              Planes diseñados para cada etapa profesional
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              Elige el plan perfecto para <span className="text-primary">tu práctica</span>
            </h1>

            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Desde estudiantes hasta clínicas especializadas, tenemos las herramientas que necesitas para revolucionar
              tu práctica fonoaudiológica.
            </p>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span>Certificado ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Datos médicos seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>95% satisfacción</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => {
              return (
                <Card
                  key={plan.name}
                  className={`relative ${plan.popular ? "border-primary scale-105 shadow-lg" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="mr-1 h-3 w-3" />
                        Más Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <plan.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    </div>

                    <CardDescription className="text-base mb-6">{plan.description}</CardDescription>

                    <div className="space-y-2">
                      <div className="text-4xl font-bold">
                        {formatPrice(plan.monthlyPrice)}
                        <span className="text-sm font-normal text-muted-foreground">/mes</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {plan.trialDays} días gratis
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Button
                      className={`w-full ${plan.popular ? "" : "bg-transparent"}`}
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                      asChild
                    >
                      <Link href="/register">
                        Comenzar Prueba
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-primary font-medium">{plan.highlight}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-foreground">Incluye:</h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {plan.limitations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-3 text-muted-foreground">No incluye:</h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Trial Info */}
          <div className="text-center mt-12 space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Todos los planes incluyen 5 días de prueba gratuita</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sin tarjeta de crédito requerida • Cancela en cualquier momento • Soporte en español
            </p>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">
              Comparación detallada de <span className="text-primary">funcionalidades</span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Descubre qué incluye cada plan y encuentra el que mejor se adapte a tus necesidades
            </p>
          </div>

          <Tabs defaultValue="core" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="core">Funciones Core</TabsTrigger>
              <TabsTrigger value="ai">Inteligencia Artificial</TabsTrigger>
              <TabsTrigger value="support">Soporte y Extras</TabsTrigger>
            </TabsList>

            <TabsContent value="core" className="mt-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Funcionalidad</th>
                      <th className="text-center p-4 font-semibold">Estudiante</th>
                      <th className="text-center p-4 font-semibold">Profesional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Número de pacientes</td>
                      <td className="text-center p-4">Hasta 10</td>
                      <td className="text-center p-4">Ilimitados</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Historiales clínicos</td>
                      <td className="text-center p-4">
                        <CheckCircle2 className="h-4 w-4 text-primary mx-auto" />
                      </td>
                      <td className="text-center p-4">
                        <CheckCircle2 className="h-4 w-4 text-primary mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Agenda y citas</td>
                      <td className="text-center p-4">Básica</td>
                      <td className="text-center p-4">Avanzada</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Acceso móvil</td>
                      <td className="text-center p-4">
                        <CheckCircle2 className="h-4 w-4 text-primary mx-auto" />
                      </td>
                      <td className="text-center p-4">
                        <CheckCircle2 className="h-4 w-4 text-primary mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Funcionalidad IA</th>
                      <th className="text-center p-4 font-semibold">Estudiante</th>
                      <th className="text-center p-4 font-semibold">Profesional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Actividades generadas por IA</td>
                      <td className="text-center p-4">30/mes</td>
                      <td className="text-center p-4">Ilimitadas</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Personalización avanzada</td>
                      <td className="text-center p-4">
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />
                      </td>
                      <td className="text-center p-4">
                        <CheckCircle2 className="h-4 w-4 text-primary mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Herramientas clínicas</td>
                      <td className="text-center p-4">Básicas</td>
                      <td className="text-center p-4">Completas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Soporte y Extras</th>
                      <th className="text-center p-4 font-semibold">Estudiante</th>
                      <th className="text-center p-4 font-semibold">Profesional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Tipo de soporte</td>
                      <td className="text-center p-4">Comunidad</td>
                      <td className="text-center p-4">Prioritario 24/7</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Recordatorios</td>
                      <td className="text-center p-4">Email</td>
                      <td className="text-center p-4">WhatsApp automático</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Reportes y finanzas</td>
                      <td className="text-center p-4">
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />
                      </td>
                      <td className="text-center p-4">
                        <CheckCircle2 className="h-4 w-4 text-primary mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Teleconsulta</td>
                      <td className="text-center p-4">
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />
                      </td>
                      <td className="text-center p-4">10 sesiones/mes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">
              Preguntas <span className="text-primary">frecuentes</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo cambiar de plan en cualquier momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se reflejan inmediatamente
                  y se prorratea el costo según corresponda.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué incluye la prueba gratuita de 5 días?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  La prueba gratuita incluye acceso completo a todas las funcionalidades del plan Profesional, sin
                  limitaciones y sin necesidad de tarjeta de crédito.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Hay descuentos para estudiantes?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sí, ofrecemos el plan Estudiante a precio especial para estudiantes de fonoaudiología. Además, con
                  correo institucional válido puedes acceder a descuentos adicionales del 20%.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Los datos están seguros y son privados?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutamente. Cumplimos con todas las normativas de protección de datos médicos, incluyendo
                  encriptación end-to-end, servidores certificados ISO 27001 y cumplimiento GDPR.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo cancelar mi suscripción en cualquier momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario. No hay
                  penalizaciones ni cargos adicionales por cancelación.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Ofrecen capacitación para usar la plataforma?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sí, todos los planes incluyen recursos de capacitación. El plan Experto incluye sesiones
                  personalizadas con nuestros especialistas en fonoaudiología.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">¿Listo para transformar tu práctica?</h2>
            <p className="text-xl text-primary-foreground/80 text-pretty">
              Únete a más de 500 fonoaudiólogos que ya confían en TuFonoAyuda para su práctica diaria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link href="/register">
                  Comenzar Prueba Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Hablar con Ventas
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Cancela cuando quieras</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Soporte en español</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  )
}
