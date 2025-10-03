"use client"

import { useState, useEffect } from "react"
import { Crown, Star, Users, Calendar, Gift, Trophy, Heart, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getWaitlistCount } from "@/lib/auth-utils"

interface WaitlistUser {
  id: string
  name: string
  email: string
  joinedDate: string
  position: number
  isEarlyAccess: boolean
  specialty?: string
  testimonial?: string
}

export function WaitlistSection() {
  const [waitlistUsers] = useState<WaitlistUser[]>([
    {
      id: "1",
      name: "Dr. Carolina Méndez",
      email: "c.mendez@example.com",
      joinedDate: "2024-01-15",
      position: 1,
      isEarlyAccess: true,
      specialty: "Terapia del Habla Infantil",
      testimonial: "TuFonoAyuda revolucionó mi práctica desde el primer día",
    },
    {
      id: "2",
      name: "Lic. Roberto Silva",
      email: "r.silva@example.com",
      joinedDate: "2024-01-18",
      position: 2,
      isEarlyAccess: true,
      specialty: "Audiología Clínica",
      testimonial: "Las herramientas de IA son increíblemente precisas",
    },
    {
      id: "3",
      name: "Dra. Ana Gutiérrez",
      email: "a.gutierrez@example.com",
      joinedDate: "2024-01-22",
      position: 3,
      isEarlyAccess: true,
      specialty: "Neurorehabilitación",
      testimonial: "Ahorro 3 horas diarias en documentación",
    },
    {
      id: "4",
      name: "Lic. Miguel Torres",
      email: "m.torres@example.com",
      joinedDate: "2024-01-25",
      position: 4,
      isEarlyAccess: true,
      specialty: "Disfagia",
      testimonial: "El análisis del habla es impresionante",
    },
    {
      id: "5",
      name: "Dra. Patricia Rojas",
      email: "p.rojas@example.com",
      joinedDate: "2024-01-28",
      position: 5,
      isEarlyAccess: true,
      specialty: "Voz Profesional",
      testimonial: "Mis pacientes han mejorado notablemente",
    },
    {
      id: "6",
      name: "Lic. Carlos Herrera",
      email: "c.herrera@example.com",
      joinedDate: "2024-02-01",
      position: 6,
      isEarlyAccess: true,
      specialty: "Tartamudez",
      testimonial: "La plataforma más completa que he usado",
    },
  ])

  const [totalWaitlistUsers, setTotalWaitlistUsers] = useState(89)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const count = await getWaitlistCount()
        setTotalWaitlistUsers(count)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching waitlist count:", error)
        setTotalWaitlistUsers(89)
        setIsLoading(false)
      }
    }

    fetchWaitlistCount()

    // Update count periodically
    const interval = setInterval(fetchWaitlistCount, 120000) // Every 2 minutes
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <Crown className="mr-2 h-4 w-4" />
            Miembros Fundadores
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            Reconocimiento a nuestros <span className="text-primary">pioneros</span>
          </h2>

          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Estos profesionales creyeron en nuestra visión desde el principio y nos ayudaron a dar forma a la plataforma
            que conoces hoy.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Enhanced Stats Card */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {isLoading ? (
                      <div className="animate-pulse h-10 w-16 bg-muted rounded mx-auto"></div>
                    ) : (
                      totalWaitlistUsers
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">Miembros Fundadores</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">8</div>
                  <div className="text-sm text-muted-foreground">Meses de Desarrollo</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Feedback Incorporado</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">4.9</div>
                  <div className="text-sm text-muted-foreground">Calificación Promedio</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Benefits for Waitlist Users */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Gift className="h-6 w-6 text-primary" />
                Beneficios Exclusivos para Miembros Fundadores
              </CardTitle>
              <CardDescription>
                Como agradecimiento por su confianza temprana, nuestros miembros fundadores disfrutan de:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Descuento de por Vida</h4>
                      <p className="text-sm text-muted-foreground">30% de descuento permanente en cualquier plan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Zap className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Acceso Prioritario</h4>
                      <p className="text-sm text-muted-foreground">Primeros en probar nuevas funcionalidades</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Heart className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Soporte VIP</h4>
                      <p className="text-sm text-muted-foreground">Línea directa con el equipo de desarrollo</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Influencia en el Roadmap</h4>
                      <p className="text-sm text-muted-foreground">Sus sugerencias tienen prioridad en desarrollo</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Crown className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Reconocimiento Especial</h4>
                      <p className="text-sm text-muted-foreground">Badge de "Miembro Fundador" en su perfil</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Calendar className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Capacitación Exclusiva</h4>
                      <p className="text-sm text-muted-foreground">Sesiones privadas con expertos</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Featured Waitlist Members */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Nuestros Miembros Fundadores Destacados</CardTitle>
              <CardDescription>Profesionales que confiaron en nosotros desde el día uno</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {waitlistUsers.map((user, index) => (
                  <Card key={user.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 mx-auto">
                          <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <Badge variant="secondary" className="absolute -bottom-1 -right-1 text-xs px-2">
                          #{user.position}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{user.specialty}</p>
                        <p className="text-xs text-muted-foreground">
                          Miembro desde{" "}
                          {new Date(user.joinedDate).toLocaleDateString("es-ES", {
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>

                      {user.testimonial && (
                        <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/20 pl-3">
                          "{user.testimonial}"
                        </blockquote>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground mb-4">
                  Y {totalWaitlistUsers - waitlistUsers.length} miembros fundadores más que han transformado su
                  práctica...
                </p>
                <Button variant="outline" className="bg-transparent">
                  <Users className="mr-2 h-4 w-4" />
                  Ver Todos los Miembros Fundadores
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Success Stories Section */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-green-600" />
                Historias de Éxito
              </CardTitle>
              <CardDescription>Resultados reales de nuestros miembros fundadores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-muted-foreground">Reducción en tiempo de documentación</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-muted-foreground">Mejora en seguimiento de pacientes</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600">78%</div>
                  <div className="text-sm text-muted-foreground">Aumento en satisfacción del paciente</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action for Current Users */}
          <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">¿Quieres ser parte de la próxima evolución?</h3>
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                Aunque ya no estamos en lista de espera, siempre valoramos el feedback de nuestros usuarios para seguir
                mejorando la plataforma. Únete a nuestra comunidad de profesionales innovadores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Sesión de Feedback
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Unirse a la Comunidad
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
