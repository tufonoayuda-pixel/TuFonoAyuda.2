import { getTeleconsultaSession } from "@/lib/actions/teleconsulta-actions"
import { VideoRoom } from "@/components/teleconsulta/video-room"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

interface TeleconsultaPageProps {
  params: {
    roomId: string
  }
}

export default async function TeleconsultaPage({ params }: TeleconsultaPageProps) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: session, error } = await getTeleconsultaSession(params.roomId)

  if (error || !session) {
    redirect("/agenda")
  }

  const isTherapist = session.therapist_id === user.id

  return (
    <VideoRoom
      roomId={params.roomId}
      teleconsultaId={session.id}
      patientName={session.patient.name}
      isTherapist={isTherapist}
    />
  )
}
