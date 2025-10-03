-- =====================================================
-- TELECONSULTA (VIDEO CALLS)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.teleconsulta_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  room_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('Programada', 'En Curso', 'Finalizada', 'Cancelada')) DEFAULT 'Programada',
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER,
  recording_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- WHATSAPP REMINDERS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.whatsapp_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  message TEXT NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('Pendiente', 'Enviado', 'Fallido', 'Cancelado')) DEFAULT 'Pendiente',
  error_message TEXT,
  reminder_type TEXT NOT NULL CHECK (reminder_type IN ('24h', '2h', '30min', 'Custom')) DEFAULT '24h',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- TRANSBANK PAYMENTS (CHILE)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'CLP',
  status TEXT NOT NULL CHECK (status IN ('Pendiente', 'Aprobado', 'Rechazado', 'Anulado', 'Reembolsado')) DEFAULT 'Pendiente',
  payment_method TEXT NOT NULL CHECK (payment_method IN ('Transbank', 'Efectivo', 'Transferencia', 'Otro')) DEFAULT 'Transbank',
  transbank_token TEXT,
  transbank_order_id TEXT,
  transbank_response JSONB,
  payment_date TIMESTAMPTZ,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PATIENT PORTAL ACCESS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.patient_portal_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL UNIQUE REFERENCES public.patients(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  access_code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.patient_portal_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.patient_portal_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('Patient', 'Therapist')),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- ADVANCED VOICE ANALYSIS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.voice_analysis_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  recording_url TEXT NOT NULL,
  duration_seconds NUMERIC(10,2) NOT NULL,
  analysis_type TEXT NOT NULL CHECK (analysis_type IN ('Pitch', 'Intensity', 'Formants', 'Jitter', 'Shimmer', 'HNR', 'Complete')),
  
  -- Acoustic parameters
  fundamental_frequency_hz NUMERIC(10,2),
  f0_min_hz NUMERIC(10,2),
  f0_max_hz NUMERIC(10,2),
  f0_std_dev NUMERIC(10,2),
  
  -- Voice quality measures
  jitter_percent NUMERIC(10,4),
  shimmer_percent NUMERIC(10,4),
  hnr_db NUMERIC(10,2), -- Harmonics-to-Noise Ratio
  
  -- Intensity measures
  intensity_mean_db NUMERIC(10,2),
  intensity_min_db NUMERIC(10,2),
  intensity_max_db NUMERIC(10,2),
  
  -- Formants (vowel quality)
  f1_hz NUMERIC(10,2),
  f2_hz NUMERIC(10,2),
  f3_hz NUMERIC(10,2),
  f4_hz NUMERIC(10,2),
  
  -- Speech rate
  speech_rate_syllables_per_sec NUMERIC(10,2),
  articulation_rate NUMERIC(10,2),
  pause_duration_total_sec NUMERIC(10,2),
  
  -- AI-generated insights
  ai_analysis JSONB,
  recommendations TEXT[],
  pathology_indicators TEXT[],
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.voice_analysis_comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  baseline_session_id UUID NOT NULL REFERENCES public.voice_analysis_sessions(id) ON DELETE CASCADE,
  current_session_id UUID NOT NULL REFERENCES public.voice_analysis_sessions(id) ON DELETE CASCADE,
  improvement_score NUMERIC(5,2),
  comparison_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR NEW FEATURES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_teleconsulta_sessions_session_id ON public.teleconsulta_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_teleconsulta_sessions_patient_id ON public.teleconsulta_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_teleconsulta_sessions_therapist_id ON public.teleconsulta_sessions(therapist_id);
CREATE INDEX IF NOT EXISTS idx_teleconsulta_sessions_status ON public.teleconsulta_sessions(status);

CREATE INDEX IF NOT EXISTS idx_whatsapp_reminders_session_id ON public.whatsapp_reminders(session_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_reminders_patient_id ON public.whatsapp_reminders(patient_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_reminders_status ON public.whatsapp_reminders(status);
CREATE INDEX IF NOT EXISTS idx_whatsapp_reminders_scheduled_for ON public.whatsapp_reminders(scheduled_for);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_session_id ON public.payment_transactions(session_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_patient_id ON public.payment_transactions(patient_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_therapist_id ON public.payment_transactions(therapist_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON public.payment_transactions(status);

CREATE INDEX IF NOT EXISTS idx_patient_portal_users_patient_id ON public.patient_portal_users(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_portal_users_access_code ON public.patient_portal_users(access_code);

CREATE INDEX IF NOT EXISTS idx_patient_portal_activities_patient_id ON public.patient_portal_activities(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_portal_activities_activity_id ON public.patient_portal_activities(activity_id);

CREATE INDEX IF NOT EXISTS idx_patient_portal_messages_patient_id ON public.patient_portal_messages(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_portal_messages_therapist_id ON public.patient_portal_messages(therapist_id);
CREATE INDEX IF NOT EXISTS idx_patient_portal_messages_is_read ON public.patient_portal_messages(is_read);

CREATE INDEX IF NOT EXISTS idx_voice_analysis_sessions_patient_id ON public.voice_analysis_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_voice_analysis_sessions_therapist_id ON public.voice_analysis_sessions(therapist_id);
CREATE INDEX IF NOT EXISTS idx_voice_analysis_sessions_created_at ON public.voice_analysis_sessions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_voice_analysis_comparisons_patient_id ON public.voice_analysis_comparisons(patient_id);

-- =====================================================
-- UPDATED_AT TRIGGERS FOR NEW TABLES
-- =====================================================

CREATE TRIGGER update_teleconsulta_sessions_updated_at BEFORE UPDATE ON public.teleconsulta_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_whatsapp_reminders_updated_at BEFORE UPDATE ON public.whatsapp_reminders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON public.payment_transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_portal_users_updated_at BEFORE UPDATE ON public.patient_portal_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_voice_analysis_sessions_updated_at BEFORE UPDATE ON public.voice_analysis_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
