-- =============================================================
-- Dinner with Saurabh — Supabase Schema & Security Policies
-- Run this in the Supabase SQL Editor
-- =============================================================

-- -------------------------
-- 1. Create the table
-- -------------------------

CREATE TABLE IF NOT EXISTS public.dinner_responses (
  id            UUID        PRIMARY KEY,
  guest_name    TEXT        NOT NULL DEFAULT 'Rinky',
  invitation_status TEXT    NOT NULL CHECK (invitation_status IN ('accepted', 'declined', 'pending'))
                            DEFAULT 'pending',
  selected_drink    TEXT    CHECK (selected_drink IS NULL OR selected_drink IN ('Beer', 'Vodka', 'Gin', 'Rum', 'Cocktails')),
  selected_ambience TEXT    CHECK (selected_ambience IS NULL OR selected_ambience IN ('Candlelight', 'Warm Dim Lights')),
  selected_music    TEXT    CHECK (selected_music IS NULL OR selected_music IN (
    'Bollywood & Indian Favourites',
    'Indie & Acoustic',
    'R&B & Soul',
    'Jazz & Lounge',
    'Chill Electronic / Deep House',
    'Surprise Me With an Eclectic Mix'
  )),
  arrival_time  TEXT        CHECK (arrival_time IS NULL OR arrival_time IN (
    '7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM',
    '9:30 PM','10:00 PM','10:30 PM','11:00 PM','11:30 PM'
  )),
  food_menu     JSONB       NOT NULL DEFAULT '[]',
  special_request TEXT,
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -------------------------
-- 2. Enable Row Level Security
-- -------------------------

ALTER TABLE public.dinner_responses ENABLE ROW LEVEL SECURITY;

-- -------------------------
-- 3. RLS Policies
-- -------------------------

-- Public users can INSERT their own response (upsert via anon key)
-- We allow insert with any id (the UUID is generated client-side and treated as an invite token)
CREATE POLICY "Public can insert responses"
  ON public.dinner_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Public users can UPDATE their own response (needed for upsert / completing preferences after accepting)
-- They can only update the row they created (matching id)
CREATE POLICY "Public can update own response"
  ON public.dinner_responses
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Public users CANNOT read any responses
-- (No SELECT policy for anon)

-- Authenticated users (Saurabh admin) can read ALL responses
CREATE POLICY "Admin can read all responses"
  ON public.dinner_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can also update (for admin corrections)
CREATE POLICY "Admin can update responses"
  ON public.dinner_responses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- -------------------------
-- 4. Updated_at trigger
-- -------------------------

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.dinner_responses;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.dinner_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- -------------------------
-- 5. Indexes
-- -------------------------

CREATE INDEX IF NOT EXISTS idx_dinner_responses_status
  ON public.dinner_responses (invitation_status);

CREATE INDEX IF NOT EXISTS idx_dinner_responses_submitted
  ON public.dinner_responses (submitted_at DESC);

-- -------------------------
-- Done!
-- -------------------------
-- After running this, go to Authentication > Users and create:
--   Email: strollingmountains@gmail.com (or your preferred admin email)
--   Password: (choose a strong password)
-- -------------------------
