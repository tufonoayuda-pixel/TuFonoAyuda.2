export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          plan: "Estudiante" | "Profesional" | "Experto" | "Admin"
          status: "Activo" | "Inactivo" | "Suspendido"
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          avatar_url?: string | null
          plan?: "Estudiante" | "Profesional" | "Experto" | "Admin"
          status?: "Activo" | "Inactivo" | "Suspendido"
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          plan?: "Estudiante" | "Profesional" | "Experto" | "Admin"
          status?: "Activo" | "Inactivo" | "Suspendido"
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          owner_id: string
          name: string
          age: number
          avatar_url: string | null
          icon: string | null
          profile: string | null
          email: string | null
          phone: string | null
          last_session: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          age: number
          avatar_url?: string | null
          icon?: string | null
          profile?: string | null
          email?: string | null
          phone?: string | null
          last_session?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          age?: number
          avatar_url?: string | null
          icon?: string | null
          profile?: string | null
          email?: string | null
          phone?: string | null
          last_session?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      patient_diagnoses: {
        Row: {
          id: string
          patient_id: string
          diagnosis: string
          diagnosed_date: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          diagnosis: string
          diagnosed_date?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          diagnosis?: string
          diagnosed_date?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      patient_consents: {
        Row: {
          id: string
          patient_id: string
          status: "Pendiente" | "Aceptado" | "Rechazado" | "Revocado"
          method: "Email" | "En Persona" | "WhatsApp" | null
          notes: string | null
          consent_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          status?: "Pendiente" | "Aceptado" | "Rechazado" | "Revocado"
          method?: "Email" | "En Persona" | "WhatsApp" | null
          notes?: string | null
          consent_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          status?: "Pendiente" | "Aceptado" | "Rechazado" | "Revocado"
          method?: "Email" | "En Persona" | "WhatsApp" | null
          notes?: string | null
          consent_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      progress_entries: {
        Row: {
          id: string
          patient_id: string
          date: string
          score: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          date: string
          score: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          date?: string
          score?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          owner_id: string
          title: string
          description: string
          category: string
          target_skills: string[]
          is_template: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          title: string
          description: string
          category: string
          target_skills?: string[]
          is_template?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          title?: string
          description?: string
          category?: string
          target_skills?: string[]
          is_template?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      patient_activities: {
        Row: {
          id: string
          patient_id: string
          activity_id: string
          assigned_date: string
          completed_date: string | null
          status: "Asignada" | "En Progreso" | "Completada" | "Cancelada"
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          activity_id: string
          assigned_date?: string
          completed_date?: string | null
          status?: "Asignada" | "En Progreso" | "Completada" | "Cancelada"
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          activity_id?: string
          assigned_date?: string
          completed_date?: string | null
          status?: "Asignada" | "En Progreso" | "Completada" | "Cancelada"
          notes?: string | null
          created_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          patient_id: string
          owner_id: string
          date: string
          time: string
          status: "Programada" | "Completada" | "Cancelada" | "Ausente"
          type: string
          color: string | null
          duration: number | null
          price: number | null
          payment_status: "Pagado" | "Pendiente" | "Anulado" | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          owner_id: string
          date: string
          time: string
          status?: "Programada" | "Completada" | "Cancelada" | "Ausente"
          type: string
          color?: string | null
          duration?: number | null
          price?: number | null
          payment_status?: "Pagado" | "Pendiente" | "Anulado" | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          owner_id?: string
          date?: string
          time?: string
          status?: "Programada" | "Completada" | "Cancelada" | "Ausente"
          type?: string
          color?: string | null
          duration?: number | null
          price?: number | null
          payment_status?: "Pagado" | "Pendiente" | "Anulado" | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      voice_lab_sessions: {
        Row: {
          id: string
          patient_id: string
          date: string
          time: string
          min_pitch_hz: number | null
          min_pitch_note: string | null
          min_pitch_octave: number | null
          max_pitch_hz: number | null
          max_pitch_note: string | null
          max_pitch_octave: number | null
          avg_pitch: number | null
          recorded_times: string[]
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          date: string
          time: string
          min_pitch_hz?: number | null
          min_pitch_note?: string | null
          min_pitch_octave?: number | null
          max_pitch_hz?: number | null
          max_pitch_note?: string | null
          max_pitch_octave?: number | null
          avg_pitch?: number | null
          recorded_times?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          date?: string
          time?: string
          min_pitch_hz?: number | null
          min_pitch_note?: string | null
          min_pitch_octave?: number | null
          max_pitch_hz?: number | null
          max_pitch_note?: string | null
          max_pitch_octave?: number | null
          avg_pitch?: number | null
          recorded_times?: string[]
          created_at?: string
        }
      }
      evaluations: {
        Row: {
          id: string
          patient_id: string
          owner_id: string
          title: string
          type: string
          date: string
          results: Json
          recommendations: string[]
          next_steps: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          owner_id: string
          title: string
          type: string
          date: string
          results?: Json
          recommendations?: string[]
          next_steps?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          owner_id?: string
          title?: string
          type?: string
          date?: string
          results?: Json
          recommendations?: string[]
          next_steps?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      evaluation_tools: {
        Row: {
          id: string
          name: string
          type: "Estandarizada" | "No Estandarizada"
          area: string
          description: string | null
          is_public: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: "Estandarizada" | "No Estandarizada"
          area: string
          description?: string | null
          is_public?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: "Estandarizada" | "No Estandarizada"
          area?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
        }
      }
      standardized_tests: {
        Row: {
          id: string
          name: string
          area: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          area: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          area?: string
          description?: string | null
          created_at?: string
        }
      }
      test_baremos: {
        Row: {
          id: string
          test_id: string
          age_from_years: number
          age_from_months: number
          age_to_years: number
          age_to_months: number
          score_range: string
          ds: string
          interpretation: string
          min_score: number
          max_score: number
          created_at: string
        }
        Insert: {
          id?: string
          test_id: string
          age_from_years: number
          age_from_months: number
          age_to_years: number
          age_to_months: number
          score_range: string
          ds: string
          interpretation: string
          min_score: number
          max_score: number
          created_at?: string
        }
        Update: {
          id?: string
          test_id?: string
          age_from_years?: number
          age_from_months?: number
          age_to_years?: number
          age_to_months?: number
          score_range?: string
          ds?: string
          interpretation?: string
          min_score?: number
          max_score?: number
          created_at?: string
        }
      }
      references: {
        Row: {
          id: string
          owner_id: string
          title: string
          authors: string
          year: string
          source: string
          evidence_level: string
          therapeutic_areas: string[]
          summary: string | null
          file_url: string | null
          data_uri: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          title: string
          authors: string
          year: string
          source: string
          evidence_level: string
          therapeutic_areas?: string[]
          summary?: string | null
          file_url?: string | null
          data_uri?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          title?: string
          authors?: string
          year?: string
          source?: string
          evidence_level?: string
          therapeutic_areas?: string[]
          summary?: string | null
          file_url?: string | null
          data_uri?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          patient_id: string | null
          owner_id: string
          name: string
          type: string
          description: string | null
          date: string
          file_url: string
          secure_path: string | null
          created_at: string
        }
        Insert: {
          id?: string
          patient_id?: string | null
          owner_id: string
          name: string
          type: string
          description?: string | null
          date: string
          file_url: string
          secure_path?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string | null
          owner_id?: string
          name?: string
          type?: string
          description?: string | null
          date?: string
          file_url?: string
          secure_path?: string | null
          created_at?: string
        }
      }
      advisory_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          status: "Pendiente" | "Respondido"
          response: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          status?: "Pendiente" | "Respondido"
          response?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: "Pendiente" | "Respondido"
          response?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
