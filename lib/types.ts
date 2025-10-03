"use client"

// Re-export all types from the specific files for backward compatibility
export type {
  Patient,
  ProgressEntry,
  Activity,
  Session,
  SavedSession,
  Reference,
  EvaluationTool,
  Document,
  AdvisoryRequest,
  BaremoEntry,
  AgeBaremo,
  StandardizedTest,
  Consent,
} from "./patient-types"

export type {
  GeneratePersonalizedActivityInput,
  GeneratePersonalizedActivityOutput,
  AnalyzeEvaluationReportOutput,
  EnhanceInterventionPlanOutput,
  SummarizePatientProgressInput,
  SummarizePatientProgressOutput,
  PatientProfile,
  TopicDetail,
  Goal,
} from "./ai-types"

// Additional types specific to this application
export interface UserAccount {
  id: string
  name: string
  email: string
  avatarUrl: string
  lastLogin: string
  plan: "Estudiante" | "Profesional" | "Experto" | "Admin"
  status: "Activo" | "Inactivo" | "Suspendido"
}

export interface Evaluation {
  id: string
  patientId: string
  title: string
  type: string
  date: string
  results: Record<string, any>
  recommendations: string[]
  nextSteps: string[]
}

// Legacy type aliases for backward compatibility
export type TestBaremo = any // Placeholder for BaremoEntry
export type TestData = any // Placeholder for StandardizedTest
