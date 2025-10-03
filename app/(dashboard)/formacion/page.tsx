"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Video,
  FileText,
  Award,
  Calendar,
  CheckCircle2,
  Lock,
} from "lucide-react"

export default function FormacionPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Fundamentos de la Evaluación del Lenguaje Infantil",
      description: "Curso completo sobre técnicas de evaluación del desarrollo del lenguaje en niños de 0-8 años",
      instructor: "Dr. María Fernández",
      category: "Evaluación",
      level: "Intermedio",
      duration: "8 horas",
      lessons: 12,
      students: 1250,
      rating: 4.8,
      price: 89000,
      featured: true,
      progress: 0,
      enrolled: false,
      thumbnail: "/speech-therapy-evaluation.jpg",
      tags: ["Evaluación", "Infantil", "Lenguaje"],
    },
    {
      id: 2,
      title: "Intervención en Disfagia Orofaríngea",
      description: "Técnicas avanzadas de rehabilitación para trastornos de la deglución en adultos",
      instructor: "Dr. Roberto Sánchez",
      category: "Rehabilitación",
      level: "Avanzado",
      duration: "12 horas",
      lessons: 18,
      students: 890,
      rating: 4.9,
      price: 129000,
      featured: true,
      progress: 65,
      enrolled: true,
      thumbnail: "/dysphagia-therapy.jpg",
      tags: ["Disfagia", "Adultos", "Rehabilitación"],
    },
    {
      id: 3,
      title: "Terapia de Articulación: Métodos Modernos",
      description: "Enfoques contemporáneos para la corrección de trastornos articulatorios",
      instructor: "Lic. Carmen López",
      category: "Articulación",
      level: "Básico",
      duration: "6 horas",
      lessons: 10,
      students: 567,
      rating: 4.6,
      price: 69000,
      featured: false,
      progress: 100,
      enrolled: true,
      thumbnail: "/articulation-therapy.jpg",
      tags: ["Articulación", "Fonemas", "Terapia"],
    },
    {
      id: 4,
      title: "Neuroplasticidad y Rehabilitación del Lenguaje",
      description: "Principios neurocientíficos aplicados a la terapia del lenguaje",
      instructor: "Dr. Luis Martín",
      category: "Neurología",
      level: "Avanzado",
      duration: "10 horas",
      lessons: 15,
      students: 423,
      rating: 4.7,
      price: 149000,
      featured: false,
      progress: 0,
      enrolled: false,
      thumbnail: "/neuroplasticity-brain.png",
      tags: ["Neurología", "Rehabilitación", "Ciencia"],
    },
  ]

  const webinars = [
    {
      id: 1,
      title: "Nuevas Tendencias en Terapia del Habla 2024",
      date: "2024-02-15",
      time: "19:00",
      duration: "90 min",
      instructor: "Panel de Expertos",
      attendees: 500,
      status: "upcoming",
      free: true,
    },
    {
      id: 2,
      title: "Casos Clínicos: Afasia Post-ACV",
      date: "2024-02-20",
      time: "20:00",
      duration: "60 min",
      instructor: "Dr. Ana Rodríguez",
      attendees: 300,
      status: "upcoming",
      free: false,
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Primer Curso Completado",
      description: "Has completado tu primer curso de formación",
      icon: GraduationCap,
      earned: true,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Estudiante Dedicado",
      description: "Has estudiado más de 20 horas este mes",
      icon: Clock,
      earned: true,
      date: "2024-01-20",
    },
    {
      id: 3,
      title: "Experto en Evaluación",
      description: "Has completado 3 cursos de evaluación",
      icon: Award,
      earned: false,
      date: null,
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Básico":
        return "bg-green-100 text-green-800"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "Avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Formación Continua</h1>
          <p className="text-muted-foreground">
            Mantente actualizado con cursos, webinars y recursos de formación profesional
          </p>
        </div>
        <Button>
          <GraduationCap className="mr-2 h-4 w-4" />
          Explorar Cursos
        </Button>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="progress">Mi Progreso</TabsTrigger>
          <TabsTrigger value="certificates">Certificados</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.enrolled && course.progress > 0 && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <Progress value={course.progress} className="h-1" />
                    </div>
                  )}
                  {course.featured && (
                    <Badge className="absolute top-2 left-2 bg-primary">
                      <Star className="mr-1 h-3 w-3" />
                      Destacado
                    </Badge>
                  )}
                  {!course.enrolled && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="bg-white text-black hover:bg-white/90">
                        <Play className="mr-2 h-3 w-3" />
                        Vista Previa
                      </Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Por {course.instructor}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3 text-muted-foreground" />
                        <span>{course.lessons} lecciones</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{course.students}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {course.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-lg font-bold">{formatPrice(course.price)}</div>
                      {course.enrolled ? (
                        <Button size="sm">
                          {course.progress === 100 ? (
                            <>
                              <CheckCircle2 className="mr-2 h-3 w-3" />
                              Completado
                            </>
                          ) : course.progress > 0 ? (
                            <>
                              <Play className="mr-2 h-3 w-3" />
                              Continuar
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-3 w-3" />
                              Comenzar
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button size="sm">
                          <GraduationCap className="mr-2 h-3 w-3" />
                          Inscribirse
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {webinars.map((webinar) => (
              <Card key={webinar.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{webinar.title}</CardTitle>
                    {webinar.free ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Gratis
                      </Badge>
                    ) : (
                      <Badge variant="outline">Premium</Badge>
                    )}
                  </div>
                  <CardDescription>Por {webinar.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{webinar.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{webinar.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="h-3 w-3 text-muted-foreground" />
                        <span>{webinar.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{webinar.attendees} inscritos</span>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Registrarse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mi Progreso</CardTitle>
                <CardDescription>Resumen de tu actividad de aprendizaje</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cursos completados</span>
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cursos en progreso</span>
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Horas de estudio</span>
                    <span className="text-2xl font-bold">14</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Certificados obtenidos</span>
                    <span className="text-2xl font-bold">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logros</CardTitle>
                <CardDescription>Insignias y reconocimientos obtenidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${achievement.earned ? "bg-primary/10" : "bg-muted"}`}>
                        <achievement.icon
                          className={`h-4 w-4 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${!achievement.earned && "text-muted-foreground"}`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-muted-foreground">Obtenido el {achievement.date}</p>
                        )}
                      </div>
                      {!achievement.earned && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cursos Inscritos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses
                  .filter((course) => course.enrolled)
                  .map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">Por {course.instructor}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Progreso</span>
                            <span className="text-xs text-muted-foreground">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1.5" />
                        </div>
                      </div>
                      <Button size="sm">{course.progress === 100 ? "Revisar" : "Continuar"}</Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Certificados</h3>
            <p className="text-muted-foreground mb-4">Tus certificados de finalización aparecerán aquí</p>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Ver Certificado de Muestra
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
