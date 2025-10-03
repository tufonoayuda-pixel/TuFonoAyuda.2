"use client"

import Link from "next/link"
import { Brain, ArrowLeft, FileText, Scale, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppFooter } from "@/components/layout/footer"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TermsPage() {
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

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Scale className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Términos y Condiciones</h1>
            <p className="text-muted-foreground">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Por favor, lee estos términos cuidadosamente antes de usar TuFonoAyuda. Al acceder o usar nuestro
              servicio, aceptas estar sujeto a estos términos.
            </AlertDescription>
          </Alert>

          {/* Terms Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  1. Aceptación de los Términos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Al registrarte y utilizar TuFonoAyuda, aceptas cumplir con estos Términos y Condiciones, así como con
                  nuestra Política de Privacidad. Si no estás de acuerdo con alguna parte de estos términos, no debes
                  usar nuestro servicio.
                </p>
                <p>
                  TuFonoAyuda se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones
                  entrarán en vigor inmediatamente después de su publicación en la plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  2. Uso del Servicio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>2.1 Elegibilidad:</strong> Para usar TuFonoAyuda, debes ser un profesional de la
                  fonoaudiología con título válido, un estudiante de fonoaudiología matriculado en una institución
                  reconocida, o tener autorización expresa para acceder a la plataforma.
                </p>
                <p>
                  <strong>2.2 Cuenta de Usuario:</strong> Eres responsable de mantener la confidencialidad de tu cuenta
                  y contraseña. Debes notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.
                </p>
                <p>
                  <strong>2.3 Uso Profesional:</strong> TuFonoAyuda está diseñado exclusivamente para uso profesional en
                  el ámbito de la fonoaudiología. No debe utilizarse para fines no relacionados con la práctica clínica
                  o educativa.
                </p>
                <p>
                  <strong>2.4 Prohibiciones:</strong> No está permitido: (a) compartir tu cuenta con terceros, (b)
                  utilizar la plataforma para actividades ilegales, (c) intentar acceder a áreas restringidas del
                  sistema, (d) copiar, modificar o distribuir el contenido sin autorización.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  3. Responsabilidad Profesional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>3.1 Herramienta de Apoyo:</strong> TuFonoAyuda es una herramienta de apoyo para la práctica
                  fonoaudiológica. El profesional es el único responsable de las decisiones clínicas y terapéuticas que
                  tome con sus pacientes.
                </p>
                <p>
                  <strong>3.2 Contenido Generado por IA:</strong> Las actividades y contenidos generados por
                  inteligencia artificial (Claude de Anthropic) son sugerencias que deben ser revisadas y adaptadas por
                  el profesional según su criterio clínico y las necesidades específicas de cada paciente.
                </p>
                <p>
                  <strong>3.3 Cumplimiento Normativo:</strong> El usuario es responsable de cumplir con todas las
                  normativas profesionales, éticas y legales aplicables en su jurisdicción, incluyendo las regulaciones
                  del Colegio de Fonoaudiólogos correspondiente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  4. Protección de Datos de Pacientes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>4.1 Responsabilidad del Usuario:</strong> El usuario es el responsable del tratamiento de los
                  datos de sus pacientes y debe cumplir con todas las leyes de protección de datos aplicables.
                </p>
                <p>
                  <strong>4.2 Seguridad:</strong> TuFonoAyuda implementa medidas de seguridad técnicas y
                  organizacionales para proteger los datos almacenados en la plataforma. Sin embargo, el usuario debe
                  tomar precauciones adicionales para garantizar la confidencialidad de la información.
                </p>
                <p>
                  <strong>4.3 Consentimiento:</strong> El usuario debe obtener el consentimiento informado de sus
                  pacientes para el almacenamiento y procesamiento de sus datos en la plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  5. Planes y Pagos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>5.1 Suscripciones:</strong> TuFonoAyuda ofrece diferentes planes de suscripción. Los precios y
                  características de cada plan están disponibles en nuestra página de precios.
                </p>
                <p>
                  <strong>5.2 Período de Prueba:</strong> Ofrecemos un período de prueba gratuito de 5 días. Al
                  finalizar este período, se te cobrará automáticamente según el plan seleccionado, a menos que canceles
                  antes.
                </p>
                <p>
                  <strong>5.3 Renovación Automática:</strong> Las suscripciones se renuevan automáticamente al final de
                  cada período de facturación. Puedes cancelar en cualquier momento desde tu panel de configuración.
                </p>
                <p>
                  <strong>5.4 Reembolsos:</strong> Los pagos son no reembolsables, excepto cuando lo requiera la ley
                  aplicable o en circunstancias excepcionales a discreción de TuFonoAyuda.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  6. Propiedad Intelectual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>6.1 Derechos de TuFonoAyuda:</strong> Todo el contenido, diseño, código, marcas y materiales
                  de la plataforma son propiedad de TuFonoAyuda y están protegidos por leyes de propiedad intelectual.
                </p>
                <p>
                  <strong>6.2 Licencia de Uso:</strong> Te otorgamos una licencia limitada, no exclusiva y no
                  transferible para usar la plataforma según estos términos.
                </p>
                <p>
                  <strong>6.3 Contenido del Usuario:</strong> Mantienes todos los derechos sobre los datos y contenidos
                  que ingreses en la plataforma. Nos otorgas una licencia para procesar estos datos únicamente con el
                  fin de proporcionar el servicio.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  7. Limitación de Responsabilidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>7.1 Disponibilidad del Servicio:</strong> Nos esforzamos por mantener la plataforma disponible
                  24/7, pero no garantizamos un servicio ininterrumpido. Podemos realizar mantenimientos programados con
                  previo aviso.
                </p>
                <p>
                  <strong>7.2 Exclusión de Garantías:</strong> El servicio se proporciona "tal cual" sin garantías de
                  ningún tipo, expresas o implícitas.
                </p>
                <p>
                  <strong>7.3 Limitación de Daños:</strong> En ningún caso TuFonoAyuda será responsable por daños
                  indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de usar el
                  servicio.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  8. Terminación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>8.1 Terminación por el Usuario:</strong> Puedes cancelar tu cuenta en cualquier momento desde
                  la configuración de tu perfil.
                </p>
                <p>
                  <strong>8.2 Terminación por TuFonoAyuda:</strong> Nos reservamos el derecho de suspender o terminar tu
                  cuenta si violas estos términos o por cualquier otra razón justificada.
                </p>
                <p>
                  <strong>8.3 Efectos de la Terminación:</strong> Al terminar tu cuenta, perderás el acceso a la
                  plataforma. Puedes solicitar una copia de tus datos antes de la terminación.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  9. Ley Aplicable y Jurisdicción
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Estos términos se rigen por las leyes de Chile. Cualquier disputa relacionada con estos términos será
                  resuelta en los tribunales competentes de Chile.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  10. Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos:</p>
                <ul className="space-y-2">
                  <li>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("tufonoayuda@gmail.com")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      tufonoayuda@gmail.com
                    </a>
                  </li>
                  <li>
                    <strong>Instagram:</strong>{" "}
                    <a
                      href="https://www.instagram.com/tufonoayuda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      @tufonoayuda
                    </a>
                  </li>
                  <li>
                    <strong>Responsable:</strong> Flgo. Cristóbal San Martín Zamorano
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6 py-8">
            <p className="text-muted-foreground">Al registrarte en TuFonoAyuda, aceptas estos Términos y Condiciones</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Crear Cuenta</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/privacy">Ver Política de Privacidad</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
