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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MessageSquare, Clock, Send } from "lucide-react"
import { scheduleWhatsAppReminder } from "@/lib/actions/whatsapp-actions"
import { useToast } from "@/hooks/use-toast"

interface WhatsAppReminderDialogProps {
  sessionId: string
  patientId: string
  patientPhone: string
  patientName: string
}

export function WhatsAppReminderDialog({
  sessionId,
  patientId,
  patientPhone,
  patientName,
}: WhatsAppReminderDialogProps) {
  const [open, setOpen] = useState(false)
  const [reminderType, setReminderType] = useState<"24h" | "2h" | "30min" | "Custom">("24h")
  const [customMessage, setCustomMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleScheduleReminder = async () => {
    if (reminderType === "Custom" && !customMessage.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un mensaje personalizado",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await scheduleWhatsAppReminder(
        sessionId,
        patientId,
        patientPhone,
        reminderType,
        reminderType === "Custom" ? customMessage : undefined,
      )

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Recordatorio programado",
        description: `Se enviará un recordatorio por WhatsApp a ${patientName}`,
      })

      setOpen(false)
      setCustomMessage("")
      setReminderType("24h")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo programar el recordatorio",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <MessageSquare className="h-4 w-4" />
          Recordatorio WhatsApp
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Programar Recordatorio WhatsApp
          </DialogTitle>
          <DialogDescription>
            Envía un recordatorio automático por WhatsApp a {patientName} ({patientPhone})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Tipo de Recordatorio
            </Label>
            <RadioGroup value={reminderType} onValueChange={(value: any) => setReminderType(value)}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="24h" id="24h" />
                <Label htmlFor="24h" className="flex-1 cursor-pointer">
                  <div className="font-medium">24 horas antes</div>
                  <div className="text-sm text-muted-foreground">Recordatorio con 1 día de anticipación</div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="2h" id="2h" />
                <Label htmlFor="2h" className="flex-1 cursor-pointer">
                  <div className="font-medium">2 horas antes</div>
                  <div className="text-sm text-muted-foreground">Recordatorio el mismo día</div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="30min" id="30min" />
                <Label htmlFor="30min" className="flex-1 cursor-pointer">
                  <div className="font-medium">30 minutos antes</div>
                  <div className="text-sm text-muted-foreground">Recordatorio de última hora</div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="Custom" id="custom" />
                <Label htmlFor="custom" className="flex-1 cursor-pointer">
                  <div className="font-medium">Mensaje personalizado</div>
                  <div className="text-sm text-muted-foreground">Escribe tu propio mensaje</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {reminderType === "Custom" && (
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje Personalizado</Label>
              <Textarea
                id="message"
                placeholder="Escribe el mensaje que se enviará por WhatsApp..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                El mensaje se enviará 24 horas antes de la sesión programada
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleScheduleReminder} disabled={isLoading} className="gap-2">
            <Send className="h-4 w-4" />
            {isLoading ? "Programando..." : "Programar Recordatorio"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
