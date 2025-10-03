"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  MonitorOff,
  Camera,
  Settings,
  MessageSquare,
} from "lucide-react"
import { WEBRTC_CONFIG, MEDIA_CONSTRAINTS, SCREEN_SHARE_CONSTRAINTS } from "@/lib/webrtc-config"
import { startTeleconsultaSession, endTeleconsultaSession } from "@/lib/actions/teleconsulta-actions"
import { useRouter } from "next/navigation"

interface VideoRoomProps {
  roomId: string
  teleconsultaId: string
  patientName: string
  isTherapist: boolean
}

export function VideoRoom({ roomId, teleconsultaId, patientName, isTherapist }: VideoRoomProps) {
  const router = useRouter()
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")
  const [callDuration, setCallDuration] = useState(0)
  const [showChat, setShowChat] = useState(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    initializeCall()
    return () => {
      cleanup()
    }
  }, [])

  useEffect(() => {
    if (connectionStatus === "connected") {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [connectionStatus])

  const initializeCall = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia(MEDIA_CONSTRAINTS)
      localStreamRef.current = stream

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      // Create peer connection
      const peerConnection = new RTCPeerConnection(WEBRTC_CONFIG)
      peerConnectionRef.current = peerConnection

      // Add local stream tracks to peer connection
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream)
      })

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0]
        }
      }

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        const state = peerConnection.connectionState
        if (state === "connected") {
          setConnectionStatus("connected")
          if (isTherapist) {
            startTeleconsultaSession(teleconsultaId)
          }
        } else if (state === "disconnected" || state === "failed" || state === "closed") {
          setConnectionStatus("disconnected")
        }
      }

      // TODO: Implement signaling server connection for WebRTC
      // This would typically use WebSocket or Socket.io to exchange SDP and ICE candidates

      setConnectionStatus("connected") // Simulated for now
    } catch (error) {
      console.error("Error initializing call:", error)
      setConnectionStatus("disconnected")
    }
  }

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioEnabled(audioTrack.enabled)
      }
    }
  }

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia(SCREEN_SHARE_CONSTRAINTS)
        screenStreamRef.current = screenStream

        // Replace video track with screen share track
        const screenTrack = screenStream.getVideoTracks()[0]
        const sender = peerConnectionRef.current?.getSenders().find((s) => s.track?.kind === "video")

        if (sender) {
          sender.replaceTrack(screenTrack)
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream
        }

        screenTrack.onended = () => {
          stopScreenShare()
        }

        setIsScreenSharing(true)
      } else {
        stopScreenShare()
      }
    } catch (error) {
      console.error("Error toggling screen share:", error)
    }
  }

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop())
      screenStreamRef.current = null
    }

    // Restore camera video
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      const sender = peerConnectionRef.current?.getSenders().find((s) => s.track?.kind === "video")

      if (sender && videoTrack) {
        sender.replaceTrack(videoTrack)
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current
      }
    }

    setIsScreenSharing(false)
  }

  const endCall = async () => {
    if (isTherapist) {
      await endTeleconsultaSession(teleconsultaId)
    }
    cleanup()
    router.push("/agenda")
  }

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop())
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Video className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-lg font-semibold">Teleconsulta con {patientName}</h1>
            <div className="flex items-center gap-2">
              <Badge variant={connectionStatus === "connected" ? "default" : "secondary"}>
                {connectionStatus === "connected" ? "Conectado" : "Conectando..."}
              </Badge>
              {connectionStatus === "connected" && (
                <span className="text-sm text-muted-foreground">{formatDuration(callDuration)}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* Remote Video */}
        <Card className="relative overflow-hidden bg-black">
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">{patientName}</span>
          </div>
        </Card>

        {/* Local Video */}
        <Card className="relative overflow-hidden bg-black">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">Tú</span>
          </div>
          {!isVideoEnabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Camera className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </Card>
      </div>

      {/* Controls */}
      <div className="bg-card border-t p-4">
        <div className="flex items-center justify-center gap-3">
          <Button
            variant={isVideoEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full h-14 w-14"
          >
            {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isAudioEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full h-14 w-14"
          >
            {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          {isTherapist && (
            <Button
              variant={isScreenSharing ? "secondary" : "outline"}
              size="lg"
              onClick={toggleScreenShare}
              className="rounded-full h-14 w-14"
            >
              {isScreenSharing ? <MonitorOff className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
            </Button>
          )}

          <Button variant="outline" size="lg" onClick={() => setShowChat(!showChat)} className="rounded-full h-14 w-14">
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button variant="outline" size="lg" className="rounded-full h-14 w-14 bg-transparent">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="destructive" size="lg" onClick={endCall} className="rounded-full h-14 w-14">
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
