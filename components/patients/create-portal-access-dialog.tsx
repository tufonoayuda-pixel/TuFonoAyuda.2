"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Mail, Phone, Loader2 } from "lucide-react"
import { createPatientPortalAccess } from "@/lib/actions/patient-portal-actions"
import { useToast } from "@/hooks/use-toast"

interface CreatePortalAccessDialogProps {
  patientId: string
  patientName: string
  defaultEmail?: string
  defaultPhone?: string
}

export function CreatePortalAccessDialog({
  patientId,
  patientName,
  defaultEmail,
  defaultPhone,
}: CreatePortalAccessDialogProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState(defaultEmail || "")
  const [phone, setPhone] = useState(defaultPhone || "")
  const [isLoading, setIsLoading] = useState(false)
  const [accessCode, setAccessCode] = useState("")
  const { toast } = useToast()

  const handleCreate = async () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "El correo electrónico es requerido",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await createPatientPortalAccess(patientId, email, phone)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      if (result.data) {
        setAccessCode(result.data.access_code)
        toast({
          title: "Acceso creado",
          description: `Se ha creado el acceso al portal para ${patientName}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el acceso",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setAccessCode("")
    setEmail(defaultEmail || "")
    setPhone(defaultPhone || "")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <UserPlus className="h-4 w-4" />
          Crear Acceso al Portal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Acceso al Portal del Paciente</DialogTitle>
          <DialogDescription>
            Genera un código de acceso para que {patientName} pueda ingresar al portal
          </DialogDescription>
        </DialogHeader>

        {!accessCode ? (
          <>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="paciente@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono (opcional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button onClick={handleCreate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Acceso"
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="space-y-4 py-4">
              <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-lg text-center space-y-3">
                <p className="text-sm text-muted-foreground">Código de Acceso Generado</p>
                <div className="text-4xl font-bold font-mono tracking-wider text-primary">{accessCode}</div>
                <p className="text-xs text-muted-foreground">Comparte este código con el paciente</p>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">Instrucciones para el paciente:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Visitar: {process.env.NEXT_PUBLIC_APP_URL}/portal/login</li>
                  <li>Ingresar su correo: {email}</li>
                  <li>Ingresar el código de acceso: {accessCode}</li>
                </ol>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Cerrar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
