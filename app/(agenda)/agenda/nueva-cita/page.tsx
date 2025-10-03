"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, MessageCircle, AlertTriangle, DollarSign, Gem, CalendarDays, ArrowLeft } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { patients } from "@/lib/mock-data"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { add, format, parseISO, nextMonday, nextWednesday, nextFriday, nextTuesday, nextThursday } from "date-fns"
import { es } from "date-fns/locale"
import { Textarea } from "@/components/ui/textarea"

export default function NewAppointmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [sendEmail, setSendEmail] = useState(true)
  const [sendWhatsApp, setSendWhatsApp] = useState(false)
  const [customMessage, setCustomMessage] = useState("")

  const [appointmentTime, setAppointmentTime] = useState("")
  const [isWhatsAppLocked, setIsWhatsAppLocked] = useState(true)
  const [frequency, setFrequency] = useState("once")
  const [weeks, setWeeks] = useState(4)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [upcomingDates, setUpcomingDates] = useState<Date[]>([])

  useEffect(() => {
    // Simulate user check - in real app this would check authentication
    const isCreator = Math.random() > 0.5 // Random for demo
    setIsWhatsAppLocked(!isCreator)
  }, [])

  useEffect(() => {
    if (!startDate || frequency === "once") {
      setUpcomingDates([])
      return
    }

    const dates: Date[] = []
    const sessionDays: ((date: Date) => Date)[] = []

    switch (frequency) {
      case "twice-weekly":
        sessionDays.push(nextMonday, nextWednesday)
        break
      case "thrice-weekly":
        sessionDays.push(nextMonday, nextWednesday, nextFriday)
        break
      case "five-times-weekly":
        sessionDays.push(nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday)
        break
    }

    if (sessionDays.length > 0) {
      for (let w = 0; w < weeks; w++) {
        for (const nextDayFn of sessionDays) {
          let sessionDate = nextDayFn(add(startDate, { weeks: w, days: -1 }))
          if (sessionDate <= add(startDate, { weeks: w - 1 })) {
            sessionDate = nextDayFn(add(startDate, { weeks: w }))
          }

          if (dates.length < weeks * sessionDays.length) {
            dates.push(sessionDate)
          }
        }
      }
    }

    const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime())
    const finalDates = Array.from(new Set(sortedDates.map((d) => d.toISOString().split("T")[0])))
      .slice(0, weeks * sessionDays.length)
      .map((d) => parseISO(d))

    setUpcomingDates(finalDates)
  }, [startDate, frequency, weeks])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      let toastDescription = "La nueva cita ha sido agendada."
      if (sendEmail && sendWhatsApp) {
        toastDescription += ` Se enviará una notificación por Email y WhatsApp.`
      } else if (sendEmail) {
        toastDescription += ` Se enviará una notificación por Email.`
      } else if (sendWhatsApp) {
        toastDescription += ` Se enviará una notificación por WhatsApp.`
      }

      toast({
        title: "Cita Creada",
        description: toastDescription,
      })
      router.push("/agenda")
    }, 1500)
  }

  const notificationScheduleMessage = useMemo(() => {
    if (!appointmentTime) return ""
    const hour = Number.parseInt(appointmentTime.split(":")[0])

    if (hour >= 8 && hour < 13) {
      return "Se enviarán 2 recordatorios: uno el día anterior a las 17:00 y otro el día de la cita a las 08:00."
    }
    if (hour >= 13) {
      return "Se enviará un recordatorio el día de la cita entre las 08:00 y las 11:00."
    }
    return ""
  }, [appointmentTime])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/agenda">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Nueva Cita</h1>
          <p className="text-muted-foreground">Agende una nueva sesión terapéutica para un paciente.</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Cita</CardTitle>
            <CardDescription>Complete la información para programar la nueva sesión.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Paciente</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha de Inicio</Label>
                  <Input id="date" type="date" required onChange={(e) => setStartDate(parseISO(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Input
                    id="time"
                    type="time"
                    required
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frecuencia</Label>
                  <Select onValueChange={setFrequency} defaultValue="once">
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Seleccionar frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Una vez</SelectItem>
                      <SelectItem value="twice-weekly">Dos veces por semana</SelectItem>
                      <SelectItem value="thrice-weekly">Tres veces por semana</SelectItem>
                      <SelectItem value="five-times-weekly">Cinco veces por semana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {frequency !== "once" && (
                  <div className="space-y-2">
                    <Label htmlFor="weeks">Repetir por (semanas)</Label>
                    <Input id="weeks" type="number" value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} />
                  </div>
                )}
              </div>

              {upcomingDates.length > 0 && (
                <Card className="bg-muted/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> Próximas Sesiones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {upcomingDates.map((date, index) => (
                      <Badge key={index} variant="secondary" className="justify-center">
                        {format(date, "EEEE, d 'de' MMMM", { locale: es })}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Sesión</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Terapia Individual</SelectItem>
                      <SelectItem value="grupal">Terapia Grupal</SelectItem>
                      <SelectItem value="evaluacion">Evaluación</SelectItem>
                      <SelectItem value="seguimiento">Seguimiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración (minutos)</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                      <SelectItem value="90">90 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precio de la Sesión (CLP)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="price" type="number" placeholder="Ej: 25000" className="pl-8" />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">Notificación al Paciente</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Envíe un recordatorio automático al paciente sobre su próxima cita.
                </p>
                <div className="flex gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="send-email"
                      checked={sendEmail}
                      onCheckedChange={(checked) => setSendEmail(!!checked)}
                    />
                    <Label htmlFor="send-email" className="flex items-center gap-2 cursor-pointer">
                      <Mail className="h-4 w-4" /> Enviar por Email
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="send-whatsapp"
                      checked={sendWhatsApp}
                      onCheckedChange={(checked) => setSendWhatsApp(!!checked)}
                      disabled={isWhatsAppLocked}
                    />
                    <Label
                      htmlFor="send-whatsapp"
                      className="flex items-center gap-2"
                      data-disabled={isWhatsAppLocked ? "true" : "false"}
                    >
                      <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
                      {isWhatsAppLocked && (
                        <Badge variant="outline" className="text-amber-600 border-amber-500/50">
                          <Gem className="mr-1 h-3 w-3" /> Profesional
                        </Badge>
                      )}
                    </Label>
                  </div>
                </div>

                {isWhatsAppLocked && (
                  <p className="text-xs text-muted-foreground">
                    Los recordatorios por WhatsApp están disponibles en el{" "}
                    <Link href="/precios" className="underline">
                      Plan Profesional
                    </Link>
                    .
                  </p>
                )}

                {(sendEmail || sendWhatsApp) && (
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="custom-message">Mensaje Personalizado (Opcional)</Label>
                    <Textarea
                      id="custom-message"
                      placeholder="Añada un mensaje personal a la notificación. Ej: 'Recuerda traer la libreta.'"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                    />
                  </div>
                )}

                {notificationScheduleMessage && (sendEmail || sendWhatsApp) && (
                  <Alert className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{notificationScheduleMessage}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="ghost" type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Agendar Cita
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  )
}
