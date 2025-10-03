"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Calendar, MessageSquare, TrendingUp, CheckCircle2, LogOut, Activity } from "lucide-react"
import {
  getPatientActivities,
  getPatientProgress,
  getPatientMessages,
  completeActivity,
  sendPatientMessage,
} from "@/lib/actions/patient-portal-actions"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

export default function PatientPortalDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [patientData, setPatientData] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = sessionStorage.getItem("patient_portal_data")
    if (!data) {
      router.push("/portal/login")
      return
    }

    const parsed = JSON.parse(data)
    setPatientData(parsed)
    loadData(parsed.patient_id)
  }, [router])

  const loadData = async (patientId: string) => {
    setIsLoading(true)
    try {
      const [activitiesResult, progressResult, messagesResult] = await Promise.all([
        getPatientActivities(patientId),
        getPatientProgress(patientId),
        getPatientMessages(patientId),
      ])

      if (activitiesResult.data) setActivities(activitiesResult.data)
      if (progressResult.data) setProgress(progressResult.data)
      if (messagesResult.data) setMessages(messagesResult.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteActivity = async (activityId: string) => {
    if (!patientData) return

    const result = await completeActivity(patientData.patient_id, activityId)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Actividad completada",
      description: "Has marcado la actividad como completada",
    })

    loadData(patientData.patient_id)
  }

  const handleSendMessage = async () => {
    if (!patientData || !newMessage.trim()) return

    const result = await sendPatientMessage(patientData.patient_id, patientData.patient.owner_id, newMessage)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
      return
    }

    setNewMessage("")
    loadData(patientData.patient_id)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("patient_portal_data")
    router.push("/portal/login")
  }

  if (isLoading || !patientData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const completedActivities = activities.filter((a) => a.status === "Completada").length
  const totalActivities = activities.length
  const completionRate = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Portal del Paciente</h1>
              <p className="text-sm text-muted-foreground">Bienvenido, {patientData.patient.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actividades Completadas</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedActivities}/{totalActivities}
              </div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progreso General</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {progress.length > 0 ? `${progress[progress.length - 1].score}%` : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Última evaluación</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensajes</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Conversaciones</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="activities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activities">Mis Actividades</TabsTrigger>
            <TabsTrigger value="progress">Mi Progreso</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="space-y-4">
            {activities.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No tienes actividades asignadas</p>
                </CardContent>
              </Card>
            ) : (
              activities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{activity.activity.title}</CardTitle>
                        <CardDescription className="mt-2">{activity.activity.description}</CardDescription>
                      </div>
                      <Badge variant={activity.status === "Completada" ? "default" : "secondary"}>
                        {activity.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(activity.assigned_date).toLocaleDateString("es-CL")}
                        </div>
                        <Badge variant="outline">{activity.activity.category}</Badge>
                      </div>
                      {activity.status !== "Completada" && (
                        <Button onClick={() => handleCompleteActivity(activity.activity_id)} size="sm">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Marcar como Completada
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolución de tu Progreso</CardTitle>
                <CardDescription>Seguimiento de tu avance terapéutico</CardDescription>
              </CardHeader>
              <CardContent>
                {progress.length === 0 ? (
                  <div className="py-12 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Aún no hay registros de progreso</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {progress.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-primary">{entry.score}%</div>
                            <div>
                              <p className="font-medium">{new Date(entry.date).toLocaleDateString("es-CL")}</p>
                              {entry.notes && <p className="text-sm text-muted-foreground">{entry.notes}</p>}
                            </div>
                          </div>
                        </div>
                        <Progress value={entry.score} className="w-32" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mensajes con tu Terapeuta</CardTitle>
                <CardDescription>Comunícate directamente con tu fonoaudiólogo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 max-h-96 overflow-y-auto space-y-3">
                  {messages.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">No hay mensajes aún</div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_type === "Patient" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender_type === "Patient"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.created_at).toLocaleString("es-CL")}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Escribe tu mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    Enviar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
