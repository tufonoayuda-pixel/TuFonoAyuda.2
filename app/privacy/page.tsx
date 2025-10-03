"use client"

import Link from "next/link"
import { Brain, ArrowLeft, Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppFooter } from "@/components/layout/footer"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PrivacyPage() {
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
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Política de Privacidad</h1>
            <p className="text-muted-foreground">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
          </div>

          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              En TuFonoAyuda, la protección de tus datos y los de tus pacientes es nuestra máxima prioridad. Esta
              política explica cómo recopilamos, usamos y protegemos tu información.
            </AlertDescription>
          </Alert>

          {/* Privacy Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  1. Información que Recopilamos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>1.1 Información de Cuenta:</strong> Cuando te registras, recopilamos tu nombre, correo
                  electrónico, tipo de usuario (estudiante/profesional), y contraseña encriptada.
                </p>
                <p>
                  <strong>1.2 Información de Pacientes:</strong> Como profesional, puedes ingresar datos de tus
                  pacientes necesarios para la práctica clínica, incluyendo: nombre, edad, diagnóstico, historial
                  clínico, notas de sesiones, y archivos relacionados con el tratamiento.
                </p>
                <p>
                  <strong>1.3 Información de Uso:</strong> Recopilamos datos sobre cómo usas la plataforma, incluyendo
                  funcionalidades utilizadas, frecuencia de acceso, y patrones de uso para mejorar el servicio.
                </p>
                <p>
                  <strong>1.4 Información Técnica:</strong> Dirección IP, tipo de navegador, sistema operativo, y datos
                  de dispositivo para garantizar la seguridad y funcionalidad de la plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  2. Cómo Usamos tu Información
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>2.1 Provisión del Servicio:</strong> Utilizamos tu información para proporcionar, mantener y
                  mejorar las funcionalidades de TuFonoAyuda.
                </p>
                <p>
                  <strong>2.2 Personalización:</strong> Adaptamos la experiencia de usuario según tu perfil y
                  preferencias profesionales.
                </p>
                <p>
                  <strong>2.3 Comunicaciones:</strong> Te enviamos notificaciones importantes sobre tu cuenta,
                  actualizaciones del servicio, y recordatorios de citas (si está habilitado).
                </p>
                <p>
                  <strong>2.4 Mejora del Servicio:</strong> Analizamos datos agregados y anonimizados para mejorar
                  funcionalidades y desarrollar nuevas características.
                </p>
                <p>
                  <strong>2.5 Seguridad:</strong> Monitoreamos actividades sospechosas y prevenimos fraudes o usos no
                  autorizados de la plataforma.
                </p>
                <p>
                  <strong>2.6 Cumplimiento Legal:</strong> Podemos usar tu información para cumplir con obligaciones
                  legales, resolver disputas, y hacer cumplir nuestros acuerdos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  3. Almacenamiento y Seguridad de Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>3.1 Infraestructura Segura:</strong> Utilizamos servicios de almacenamiento en la nube de
                  proveedores certificados (Supabase/Neon) con encriptación de datos en tránsito y en reposo.
                </p>
                <p>
                  <strong>3.2 Encriptación:</strong> Todos los datos sensibles, incluyendo contraseñas e información de
                  pacientes, están encriptados usando estándares de la industria (AES-256).
                </p>
                <p>
                  <strong>3.3 Acceso Restringido:</strong> Solo personal autorizado tiene acceso a los datos, y
                  únicamente cuando es necesario para proporcionar soporte técnico o cumplir con obligaciones legales.
                </p>
                <p>
                  <strong>3.4 Copias de Seguridad:</strong> Realizamos copias de seguridad regulares para prevenir
                  pérdida de datos, manteniendo la misma seguridad en las copias.
                </p>
                <p>
                  <strong>3.5 Ubicación de Datos:</strong> Los datos se almacenan en servidores ubicados en regiones con
                  estrictas leyes de protección de datos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  4. Compartir Información
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>4.1 No Vendemos tus Datos:</strong> Nunca vendemos, alquilamos o comercializamos tu
                  información personal o la de tus pacientes a terceros.
                </p>
                <p>
                  <strong>4.2 Proveedores de Servicios:</strong> Compartimos datos con proveedores de servicios
                  esenciales (hosting, procesamiento de pagos, análisis) que están obligados contractualmente a proteger
                  tu información.
                </p>
                <p>
                  <strong>4.3 Inteligencia Artificial:</strong> Al usar funcionalidades de IA (Claude de Anthropic), los
                  datos necesarios se procesan según las políticas de privacidad de Anthropic, que cumplen con
                  estándares de protección de datos médicos.
                </p>
                <p>
                  <strong>4.4 Requisitos Legales:</strong> Podemos divulgar información si es requerido por ley, orden
                  judicial, o para proteger nuestros derechos legales.
                </p>
                <p>
                  <strong>4.5 Transferencias Empresariales:</strong> En caso de fusión, adquisición o venta de activos,
                  tu información puede transferirse, pero seguirá protegida bajo esta política.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  5. Tus Derechos y Controles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>5.1 Acceso y Portabilidad:</strong> Puedes acceder, descargar y exportar todos tus datos en
                  cualquier momento desde tu panel de configuración.
                </p>
                <p>
                  <strong>5.2 Rectificación:</strong> Puedes actualizar o corregir tu información personal y la de tus
                  pacientes directamente en la plataforma.
                </p>
                <p>
                  <strong>5.3 Eliminación:</strong> Puedes solicitar la eliminación de tu cuenta y todos los datos
                  asociados. La eliminación es permanente e irreversible.
                </p>
                <p>
                  <strong>5.4 Restricción de Procesamiento:</strong> Puedes solicitar que limitemos el procesamiento de
                  ciertos datos en circunstancias específicas.
                </p>
                <p>
                  <strong>5.5 Oposición:</strong> Puedes oponerte al procesamiento de tus datos para ciertos fines, como
                  marketing directo.
                </p>
                <p>
                  <strong>5.6 Revocación de Consentimiento:</strong> Cuando el procesamiento se basa en tu
                  consentimiento, puedes revocarlo en cualquier momento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  6. Protección de Datos de Pacientes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>6.1 Responsabilidad Compartida:</strong> Como profesional de la salud, eres el responsable del
                  tratamiento de los datos de tus pacientes. TuFonoAyuda actúa como encargado del tratamiento.
                </p>
                <p>
                  <strong>6.2 Consentimiento del Paciente:</strong> Debes obtener el consentimiento informado de tus
                  pacientes para almacenar y procesar sus datos en la plataforma.
                </p>
                <p>
                  <strong>6.3 Minimización de Datos:</strong> Solo debes ingresar la información estrictamente necesaria
                  para la atención clínica.
                </p>
                <p>
                  <strong>6.4 Confidencialidad Médica:</strong> Todos los datos de pacientes están protegidos por el
                  secreto profesional y las leyes de confidencialidad médica aplicables.
                </p>
                <p>
                  <strong>6.5 Derechos de los Pacientes:</strong> Los pacientes pueden ejercer sus derechos de acceso,
                  rectificación y eliminación de sus datos a través de ti como profesional responsable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  7. Cookies y Tecnologías Similares
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>7.1 Uso de Cookies:</strong> Utilizamos cookies esenciales para el funcionamiento de la
                  plataforma, como mantener tu sesión activa y recordar tus preferencias.
                </p>
                <p>
                  <strong>7.2 Cookies de Análisis:</strong> Usamos cookies de análisis para entender cómo se usa la
                  plataforma y mejorar la experiencia del usuario.
                </p>
                <p>
                  <strong>7.3 Control de Cookies:</strong> Puedes configurar tu navegador para rechazar cookies, aunque
                  esto puede afectar la funcionalidad de la plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  8. Retención de Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>8.1 Período de Retención:</strong> Mantenemos tus datos mientras tu cuenta esté activa y
                  durante el tiempo necesario para cumplir con obligaciones legales.
                </p>
                <p>
                  <strong>8.2 Eliminación de Cuenta:</strong> Cuando eliminas tu cuenta, tus datos se eliminan
                  permanentemente dentro de 30 días, excepto cuando la ley requiera su conservación.
                </p>
                <p>
                  <strong>8.3 Datos de Respaldo:</strong> Los datos en copias de seguridad se eliminan según nuestro
                  ciclo regular de rotación de respaldos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  9. Menores de Edad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  TuFonoAyuda está diseñado para profesionales y estudiantes de fonoaudiología mayores de 18 años. No
                  recopilamos intencionalmente información de menores de edad sin el consentimiento de sus padres o
                  tutores legales.
                </p>
                <p>
                  Los datos de pacientes menores de edad deben ser ingresados por profesionales autorizados con el
                  consentimiento apropiado de los padres o tutores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  10. Cambios a esta Política
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos sobre cambios
                  significativos por correo electrónico o mediante un aviso destacado en la plataforma.
                </p>
                <p>
                  Te recomendamos revisar esta política regularmente para estar informado sobre cómo protegemos tu
                  información.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  11. Contacto y Preguntas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tus datos, puedes
                  contactarnos:
                </p>
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
                    <strong>Responsable de Protección de Datos:</strong> Flgo. Cristóbal San Martín Zamorano
                  </li>
                </ul>
                <p className="pt-4">
                  Nos comprometemos a responder a tus consultas dentro de 30 días hábiles y a trabajar contigo para
                  resolver cualquier inquietud sobre privacidad.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6 py-8">
            <p className="text-muted-foreground">
              Tu privacidad y la de tus pacientes es nuestra prioridad. Trabajamos constantemente para mantener los más
              altos estándares de seguridad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Crear Cuenta Segura</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/terms">Ver Términos y Condiciones</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
