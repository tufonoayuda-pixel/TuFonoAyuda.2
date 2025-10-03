-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_lab_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.standardized_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_baremos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisory_requests ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- USERS POLICIES
-- =====================================================

-- Users can read their own data
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- PATIENTS POLICIES
-- =====================================================

-- Users can view their own patients
CREATE POLICY "Users can view own patients"
  ON public.patients FOR SELECT
  USING (auth.uid() = owner_id);

-- Users can create patients
CREATE POLICY "Users can create patients"
  ON public.patients FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Users can update their own patients
CREATE POLICY "Users can update own patients"
  ON public.patients FOR UPDATE
  USING (auth.uid() = owner_id);

-- Users can delete their own patients
CREATE POLICY "Users can delete own patients"
  ON public.patients FOR DELETE
  USING (auth.uid() = owner_id);

-- =====================================================
-- PATIENT DIAGNOSES POLICIES
-- =====================================================

CREATE POLICY "Users can view diagnoses of own patients"
  ON public.patient_diagnoses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = patient_diagnoses.patient_id
    AND patients.owner_id = auth.uid()
  ));

CREATE POLICY "Users can create diagnoses for own patients"
  ON public.patient_diagnoses FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = patient_diagnoses.patient_id
    AND patients.owner_id = auth.uid()
  ));

CREATE POLICY "Users can update diagnoses of own patients"
  ON public.patient_diagnoses FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = patient_diagnoses.patient_id
    AND patients.owner_id = auth.uid()
  ));

CREATE POLICY "Users can delete diagnoses of own patients"
  ON public.patient_diagnoses FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = patient_diagnoses.patient_id
    AND patients.owner_id = auth.uid()
  ));

-- =====================================================
-- PATIENT CONSENTS POLICIES
-- =====================================================

CREATE POLICY "Users can view consents of own patients"
  ON public.patient_consents FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = patient_consents.patient_id
    AND patients.owner_id = auth.uid()
  ));

CREATE POLICY "Users can manage consents of own patients"
  ON public.patient_consents FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = patient_consents.patient_id
    AND patients.owner_id = auth.uid()
  ));

-- =====================================================
-- PROGRESS ENTRIES POLICIES
-- =====================================================

CREATE POLICY "Users can view progress of own patients"
  ON public.progress_entries FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = progress_entries.patient_id
    AND patients.owner_id = auth.uid()
  ));

CREATE POLICY "Users can manage progress of own patients"
  ON public.progress_entries FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = progress_entries.patient_id
    AND patients.owner_id = auth.uid()
  ));

-- =====================================================
-- ACTIVITIES POLICIES
-- =====================================================

CREATE POLICY "Users can view own activities"
  ON public.activities FOR SELECT
  USING (auth.uid() = owner_id OR is_template = true);

CREATE POLICY "Users can create activities"
  ON public.activities FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own activities"
  ON public.activities FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own activities"
  ON public.activities FOR DELETE
  USING (auth.uid() = owner_id);

-- =====================================================
-- PATIENT ACTIVITIES POLICIES
-- =====================================================

CREATE POLICY "Users can view activities of own patients"
  ON public.patient_activities FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = patient_activities.patient_id
    AND patients.owner_id = auth.uid()
  ));

CREATE POLICY "Users can manage activities of own patients"
  ON public.patient_activities FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = patient_activities.patient_id
    AND patients.owner_id = auth.uid()
  ));

-- =====================================================
-- SESSIONS POLICIES
-- =====================================================

CREATE POLICY "Users can view own sessions"
  ON public.sessions FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create sessions"
  ON public.sessions FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own sessions"
  ON public.sessions FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own sessions"
  ON public.sessions FOR DELETE
  USING (auth.uid() = owner_id);

-- =====================================================
-- VOICE LAB SESSIONS POLICIES
-- =====================================================

CREATE POLICY "Users can view voice lab sessions of own patients"
  ON public.voice_lab_sessions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = voice_lab_sessions.patient_id
    AND patients.owner_id = auth.uid()
  ));

CREATE POLICY "Users can manage voice lab sessions of own patients"
  ON public.voice_lab_sessions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.patients
    WHERE patients.id = voice_lab_sessions.patient_id
    AND patients.owner_id = auth.uid()
  ));

-- =====================================================
-- EVALUATIONS POLICIES
-- =====================================================

CREATE POLICY "Users can view own evaluations"
  ON public.evaluations FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create evaluations"
  ON public.evaluations FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own evaluations"
  ON public.evaluations FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own evaluations"
  ON public.evaluations FOR DELETE
  USING (auth.uid() = owner_id);

-- =====================================================
-- EVALUATION TOOLS POLICIES (Public Read)
-- =====================================================

CREATE POLICY "Anyone can view public evaluation tools"
  ON public.evaluation_tools FOR SELECT
  USING (is_public = true);

-- =====================================================
-- STANDARDIZED TESTS POLICIES (Public Read)
-- =====================================================

CREATE POLICY "Authenticated users can view standardized tests"
  ON public.standardized_tests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view test baremos"
  ON public.test_baremos FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- REFERENCES POLICIES
-- =====================================================

CREATE POLICY "Users can view own references"
  ON public.references FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create references"
  ON public.references FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own references"
  ON public.references FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own references"
  ON public.references FOR DELETE
  USING (auth.uid() = owner_id);

-- =====================================================
-- DOCUMENTS POLICIES
-- =====================================================

CREATE POLICY "Users can view own documents"
  ON public.documents FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create documents"
  ON public.documents FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own documents"
  ON public.documents FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own documents"
  ON public.documents FOR DELETE
  USING (auth.uid() = owner_id);

-- =====================================================
-- ADVISORY REQUESTS POLICIES
-- =====================================================

-- Anyone can create advisory requests (public form)
CREATE POLICY "Anyone can create advisory requests"
  ON public.advisory_requests FOR INSERT
  WITH CHECK (true);

-- Only admins can view/update advisory requests
-- Note: You'll need to add an is_admin column to users table or check plan = 'Admin'
CREATE POLICY "Admins can view all advisory requests"
  ON public.advisory_requests FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.users
    WHERE users.id = auth.uid()
    AND users.plan = 'Admin'
  ));

CREATE POLICY "Admins can update advisory requests"
  ON public.advisory_requests FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.users
    WHERE users.id = auth.uid()
    AND users.plan = 'Admin'
  ));
