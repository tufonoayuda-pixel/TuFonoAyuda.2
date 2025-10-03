"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, FileText, Phone, Mail } from "lucide-react"
import { patients } from "@/lib/enhanced-mock-data"

export function PatientManagementDemo() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lista de Pacientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPatient.id === patient.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={patient.avatarUrl || "/placeholder.svg"} />
                    <AvatarFallback>
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.age} años</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {patient.progress[patient.progress.length - 1]?.score || 0}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedPatient.avatarUrl || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedPatient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedPatient.name}</CardTitle>
                  <CardDescription>{selectedPatient.age} años</CardDescription>
                </div>
              </div>
              <Badge variant={selectedPatient.consent.status === "Aceptado" ? "default" : "secondary"}>
                {selectedPatient.consent.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="progress">Progreso</TabsTrigger>
                <TabsTrigger value="activities">Actividades</TabsTrigger>
                <TabsTrigger value="contact">Contacto</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Perfil del Paciente</h4>
                  <p className="text-sm text-muted-foreground">{selectedPatient.profile}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Diagnósticos</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.diagnoses.map((diagnosis, index) => (
                      <Badge key={index} variant="outline">
                        {diagnosis}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Última Sesión</h4>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedPatient.lastSession}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-4">Evolución del Progreso</h4>
                  <div className="space-y-4">
                    {selectedPatient.progress.map((entry, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{entry.date}</span>
                          <span className="text-sm text-muted-foreground">{entry.score}%</span>
                        </div>
                        <Progress value={entry.score} className="h-2" />
                        <p className="text-xs text-muted-foreground">{entry.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-4">Actividades Asignadas</h4>
                  <div className="space-y-3">
                    {selectedPatient.assignedActivities.map((activity) => (
                      <div key={activity.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-medium">{activity.title}</h5>
                            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">{activity.category}</Badge>
                              {activity.targetSkills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-4">Información de Contacto</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedPatient.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedPatient.contact.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Estado del Consentimiento</h4>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Estado:</span>
                      <Badge variant={selectedPatient.consent.status === "Aceptado" ? "default" : "secondary"}>
                        {selectedPatient.consent.status}
                      </Badge>
                    </div>
                    {selectedPatient.consent.date && (
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Fecha:</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(selectedPatient.consent.date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
