-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS AND AUTHENTICATION
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('Estudiante', 'Profesional', 'Experto', 'Admin')) DEFAULT 'Profesional',
  status TEXT NOT NULL CHECK (status IN ('Activo', 'Inactivo', 'Suspendido')) DEFAULT 'Activo',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PATIENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 0 AND age <= 120),
  avatar_url TEXT,
  icon TEXT,
  profile TEXT,
  email TEXT,
  phone TEXT,
  last_session TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Patient diagnoses (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.patient_diagnoses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  diagnosis TEXT NOT NULL,
  diagnosed_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Patient consent tracking
CREATE TABLE IF NOT EXISTS public.patient_consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('Pendiente', 'Aceptado', 'Rechazado', 'Revocado')) DEFAULT 'Pendiente',
  method TEXT CHECK (method IN ('Email', 'En Persona', 'WhatsApp')),
  notes TEXT,
  consent_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PROGRESS TRACKING
-- =====================================================

CREATE TABLE IF NOT EXISTS public.progress_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  score NUMERIC(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- ACTIVITIES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  target_skills TEXT[] NOT NULL DEFAULT '{}',
  is_template BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Patient assigned activities (many-to-many)
CREATE TABLE IF NOT EXISTS public.patient_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  assigned_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_date TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('Asignada', 'En Progreso', 'Completada', 'Cancelada')) DEFAULT 'Asignada',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(patient_id, activity_id)
);

-- =====================================================
-- SESSIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Programada', 'Completada', 'Cancelada', 'Ausente')) DEFAULT 'Programada',
  type TEXT NOT NULL,
  color TEXT,
  duration INTEGER CHECK (duration > 0), -- in minutes
  price NUMERIC(10,2) CHECK (price >= 0),
  payment_status TEXT CHECK (payment_status IN ('Pagado', 'Pendiente', 'Anulado')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- VOICE LAB SESSIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.voice_lab_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  min_pitch_hz NUMERIC(10,2),
  min_pitch_note TEXT,
  min_pitch_octave INTEGER,
  max_pitch_hz NUMERIC(10,2),
  max_pitch_note TEXT,
  max_pitch_octave INTEGER,
  avg_pitch NUMERIC(10,2),
  recorded_times TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- EVALUATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  date DATE NOT NULL,
  results JSONB NOT NULL DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',
  next_steps TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- EVALUATION TOOLS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.evaluation_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('Estandarizada', 'No Estandarizada')),
  area TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- STANDARDIZED TESTS AND BAREMOS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.standardized_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  area TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.test_baremos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id UUID NOT NULL REFERENCES public.standardized_tests(id) ON DELETE CASCADE,
  age_from_years INTEGER NOT NULL CHECK (age_from_years >= 0),
  age_from_months INTEGER NOT NULL CHECK (age_from_months >= 0 AND age_from_months < 12),
  age_to_years INTEGER NOT NULL CHECK (age_to_years >= 0),
  age_to_months INTEGER NOT NULL CHECK (age_to_months >= 0 AND age_to_months < 12),
  score_range TEXT NOT NULL,
  ds TEXT NOT NULL,
  interpretation TEXT NOT NULL,
  min_score NUMERIC(10,2) NOT NULL,
  max_score NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- REFERENCES AND DOCUMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.references (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  year TEXT NOT NULL,
  source TEXT NOT NULL,
  evidence_level TEXT NOT NULL,
  therapeutic_areas TEXT[] NOT NULL DEFAULT '{}',
  summary TEXT,
  file_url TEXT,
  data_uri TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  file_url TEXT NOT NULL,
  secure_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- ADVISORY REQUESTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.advisory_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pendiente', 'Respondido')) DEFAULT 'Pendiente',
  response TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_patients_owner_id ON public.patients(owner_id);
CREATE INDEX IF NOT EXISTS idx_patients_created_at ON public.patients(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_patient_diagnoses_patient_id ON public.patient_diagnoses(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_consents_patient_id ON public.patient_consents(patient_id);
CREATE INDEX IF NOT EXISTS idx_progress_entries_patient_id ON public.progress_entries(patient_id);
CREATE INDEX IF NOT EXISTS idx_progress_entries_date ON public.progress_entries(date DESC);
CREATE INDEX IF NOT EXISTS idx_activities_owner_id ON public.activities(owner_id);
CREATE INDEX IF NOT EXISTS idx_patient_activities_patient_id ON public.patient_activities(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_activities_activity_id ON public.patient_activities(activity_id);
CREATE INDEX IF NOT EXISTS idx_sessions_patient_id ON public.sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_sessions_owner_id ON public.sessions(owner_id);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON public.sessions(date DESC);
CREATE INDEX IF NOT EXISTS idx_voice_lab_sessions_patient_id ON public.voice_lab_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_patient_id ON public.evaluations(patient_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_owner_id ON public.evaluations(owner_id);
CREATE INDEX IF NOT EXISTS idx_test_baremos_test_id ON public.test_baremos(test_id);
CREATE INDEX IF NOT EXISTS idx_references_owner_id ON public.references(owner_id);
CREATE INDEX IF NOT EXISTS idx_documents_patient_id ON public.documents(patient_id);
CREATE INDEX IF NOT EXISTS idx_documents_owner_id ON public.documents(owner_id);
CREATE INDEX IF NOT EXISTS idx_advisory_requests_status ON public.advisory_requests(status);
CREATE INDEX IF NOT EXISTS idx_advisory_requests_created_at ON public.advisory_requests(created_at DESC);

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_consents_updated_at BEFORE UPDATE ON public.patient_consents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_entries_updated_at BEFORE UPDATE ON public.progress_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evaluations_updated_at BEFORE UPDATE ON public.evaluations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_references_updated_at BEFORE UPDATE ON public.references
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_advisory_requests_updated_at BEFORE UPDATE ON public.advisory_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
