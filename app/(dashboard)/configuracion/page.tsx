"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Settings,
  User,
  Bell,
  CreditCard,
  Download,
  Upload,
  Save,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  Calendar,
  Moon,
  Sun,
  Monitor,
  Plus,
  Palette,
} from "lucide-react"
import { ThemeSelector } from "@/components/theme/theme-selector"
import { PDFExport } from "@/components/export/pdf-export"
import { ZipExport } from "@/components/export/zip-export"

export default function ConfiguracionPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    appointments: true,
    reports: true,
    updates: false,
  })
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("es")
  const [timezone, setTimezone] = useState("America/Santiago")

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  // Mock data for exports
  const mockExportData = {
    patients: [
      { id: 1, name: "María González", age: 45, diagnosis: "Disfasia" },
      { id: 2, name: "Juan Pérez", age: 32, diagnosis: "Tartamudez" },
    ],
    sessions: [
      { id: 1, patientName: "María González", date: "2024-01-15", type: "Evaluación" },
      { id: 2, patientName: "Juan Pérez", date: "2024-01-16", type: "Terapia" },
    ],
    documents: [
      { id: 1, name: "Evaluación inicial", type: "PDF" },
      { id: 2, name: "Plan terapéutico", type: "DOC" },
    ],
    reports: [
      { id: 1, title: "Reporte mensual", date: "2024-01-31" },
      { id: 2, title: "Evaluación trimestral", date: "2024-01-31" },
    ],
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia y gestiona la configuración de tu cuenta</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="themes">Temas</TabsTrigger>
          <TabsTrigger value="export">Exportar</TabsTrigger>
          <TabsTrigger value="privacy">Privacidad</TabsTrigger>
          <TabsTrigger value="advanced">Avanzado</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza tu información de perfil y datos profesionales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-lg">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    Cambiar Foto
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" defaultValue="María" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" defaultValue="González" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="maria.gonzalez@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue="+56 9 1234 5678" />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Información Profesional</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="license">Número de Colegiatura</Label>
                    <Input id="license" defaultValue="12345" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad</Label>
                    <Select defaultValue="general">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Fonoaudiología General</SelectItem>
                        <SelectItem value="pediatric">Fonoaudiología Pediátrica</SelectItem>
                        <SelectItem value="neurological">Fonoaudiología Neurológica</SelectItem>
                        <SelectItem value="voice">Terapia de Voz</SelectItem>
                        <SelectItem value="dysphagia">Disfagia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Años de Experiencia</Label>
                    <Select defaultValue="5-10">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 años</SelectItem>
                        <SelectItem value="3-5">3-5 años</SelectItem>
                        <SelectItem value="5-10">5-10 años</SelectItem>
                        <SelectItem value="10+">Más de 10 años</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workplace">Lugar de Trabajo</Label>
                    <Input id="workplace" defaultValue="Clínica San Juan" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía Profesional</Label>
                  <Textarea
                    id="bio"
                    placeholder="Describe tu experiencia y especialidades..."
                    defaultValue="Fonoaudióloga especializada en terapia infantil con 8 años de experiencia en evaluación y tratamiento de trastornos del lenguaje."
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dirección</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" defaultValue="Av. Providencia 1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" defaultValue="Santiago" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Región</Label>
                    <Select defaultValue="rm">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rm">Región Metropolitana</SelectItem>
                        <SelectItem value="valparaiso">Valparaíso</SelectItem>
                        <SelectItem value="biobio">Biobío</SelectItem>
                        <SelectItem value="araucania">La Araucanía</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Select defaultValue="chile">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chile">Chile</SelectItem>
                        <SelectItem value="argentina">Argentina</SelectItem>
                        <SelectItem value="peru">Perú</SelectItem>
                        <SelectItem value="colombia">Colombia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cambiar Contraseña</CardTitle>
              <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input id="newPassword" type="password" placeholder="Ingresa tu nueva contraseña" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirma tu nueva contraseña" />
              </div>
              <Button>Actualizar Contraseña</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canales de Notificación</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Label>Notificaciones por Email</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Recibe notificaciones en tu correo electrónico</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(value) => handleNotificationChange("email", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Label>Notificaciones Push</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Recibe notificaciones en el navegador</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(value) => handleNotificationChange("push", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <Label>Notificaciones SMS</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Recibe notificaciones por mensaje de texto</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(value) => handleNotificationChange("sms", value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tipos de Notificaciones</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <Label>Recordatorios de Citas</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Recordatorios de citas próximas</p>
                    </div>
                    <Switch
                      checked={notifications.appointments}
                      onCheckedChange={(value) => handleNotificationChange("appointments", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <Label>Reportes Generados</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Cuando se generen nuevos reportes</p>
                    </div>
                    <Switch
                      checked={notifications.reports}
                      onCheckedChange={(value) => handleNotificationChange("reports", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <Label>Actualizaciones del Sistema</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Nuevas funciones y actualizaciones</p>
                    </div>
                    <Switch
                      checked={notifications.updates}
                      onCheckedChange={(value) => handleNotificationChange("updates", value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Horarios de Notificación</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Hora de Inicio</Label>
                    <Select defaultValue="08:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="06:00">06:00</SelectItem>
                        <SelectItem value="07:00">07:00</SelectItem>
                        <SelectItem value="08:00">08:00</SelectItem>
                        <SelectItem value="09:00">09:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Hora de Fin</Label>
                    <Select defaultValue="20:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18:00">18:00</SelectItem>
                        <SelectItem value="19:00">19:00</SelectItem>
                        <SelectItem value="20:00">20:00</SelectItem>
                        <SelectItem value="21:00">21:00</SelectItem>
                        <SelectItem value="22:00">22:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apariencia y Tema</CardTitle>
              <CardDescription>Personaliza la apariencia de la aplicación según tus preferencias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tema del Sistema</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      theme === "light" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="flex items-center gap-3">
                      <Sun className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Claro</p>
                        <p className="text-sm text-muted-foreground">Tema claro</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      theme === "dark" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="flex items-center gap-3">
                      <Moon className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Oscuro</p>
                        <p className="text-sm text-muted-foreground">Tema oscuro</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      theme === "system" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => setTheme("system")}
                  >
                    <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Sistema</p>
                        <p className="text-sm text-muted-foreground">Sigue el sistema</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Idioma y Región</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Zona Horaria</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Santiago">Santiago (GMT-3)</SelectItem>
                        <SelectItem value="America/Buenos_Aires">Buenos Aires (GMT-3)</SelectItem>
                        <SelectItem value="America/Lima">Lima (GMT-5)</SelectItem>
                        <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferencias de Interfaz</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animaciones Reducidas</Label>
                      <p className="text-sm text-muted-foreground">Reduce las animaciones para mejor rendimiento</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo Compacto</Label>
                      <p className="text-sm text-muted-foreground">Interfaz más compacta con menos espaciado</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sonidos del Sistema</Label>
                      <p className="text-sm text-muted-foreground">Reproducir sonidos para notificaciones</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="themes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Temas Personalizados
              </CardTitle>
              <CardDescription>
                Elige entre nuestros temas especiales inspirados en diferentes universos para hacer tu experiencia más
                atractiva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSelector />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PDFExport data={mockExportData} title="Reporte de Configuración" type="report" />
            <ZipExport data={mockExportData} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exportaciones Programadas</CardTitle>
              <CardDescription>Configura exportaciones automáticas de tus datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Automático Semanal</Label>
                  <p className="text-sm text-muted-foreground">Exporta automáticamente todos los datos cada semana</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reportes Mensuales PDF</Label>
                  <p className="text-sm text-muted-foreground">Genera reportes financieros automáticamente cada mes</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacidad y Seguridad</CardTitle>
              <CardDescription>Controla tu privacidad y la seguridad de tus datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacidad de Datos</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compartir Datos de Uso</Label>
                      <p className="text-sm text-muted-foreground">
                        Ayúdanos a mejorar compartiendo datos anónimos de uso
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Análisis de Rendimiento</Label>
                      <p className="text-sm text-muted-foreground">Permitir análisis para mejorar el rendimiento</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cookies de Marketing</Label>
                      <p className="text-sm text-muted-foreground">Personalizar contenido y anuncios</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Seguridad de la Cuenta</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticación de Dos Factores</Label>
                      <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sesiones Activas</Label>
                      <p className="text-sm text-muted-foreground">Gestiona tus sesiones activas</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Sesiones
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Descargar Mis Datos</Label>
                      <p className="text-sm text-muted-foreground">Descarga una copia de tus datos</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-destructive">Zona de Peligro</h3>
                <div className="space-y-4 p-4 border border-destructive/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Eliminar Cuenta</Label>
                      <p className="text-sm text-muted-foreground">
                        Elimina permanentemente tu cuenta y todos los datos asociados
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Eliminar Cuenta
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plan y Facturación</CardTitle>
              <CardDescription>Gestiona tu suscripción y métodos de pago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Plan Actual</h3>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Plan Profesional</h4>
                      <p className="text-sm text-muted-foreground">Facturación mensual</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$12.990</p>
                      <p className="text-sm text-muted-foreground">por mes</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      Cambiar Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancelar Suscripción
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Método de Pago</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expira 12/25</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Eliminar
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Método de Pago
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Historial de Facturación</h3>
                <div className="space-y-2">
                  {[
                    { date: "2024-01-15", amount: "$12.990", status: "Pagado" },
                    { date: "2023-12-15", amount: "$12.990", status: "Pagado" },
                    { date: "2023-11-15", amount: "$12.990", status: "Pagado" },
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-muted-foreground">Plan Profesional</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">{invoice.amount}</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {invoice.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración Avanzada</CardTitle>
              <CardDescription>Opciones avanzadas para usuarios experimentados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Importar/Exportar Datos</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Upload className="h-5 w-5" />
                      <h4 className="font-medium">Importar Datos</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Importa datos de pacientes desde otros sistemas
                    </p>
                    <Button variant="outline" size="sm">
                      Seleccionar Archivo
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Download className="h-5 w-5" />
                      <h4 className="font-medium">Exportar Datos</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Exporta todos tus datos en formato CSV</p>
                    <Button variant="outline" size="sm">
                      Exportar CSV
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API y Integraciones</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Clave API</Label>
                      <p className="text-sm text-muted-foreground">Para integraciones con sistemas externos</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Generar Clave
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Webhooks</Label>
                      <p className="text-sm text-muted-foreground">Configurar notificaciones automáticas</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuración del Sistema</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo Desarrollador</Label>
                      <p className="text-sm text-muted-foreground">Habilita funciones avanzadas de desarrollo</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Logs Detallados</Label>
                      <p className="text-sm text-muted-foreground">Registra información detallada del sistema</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Caché del Sistema</Label>
                      <p className="text-sm text-muted-foreground">Limpiar caché para resolver problemas</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Limpiar Caché
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
