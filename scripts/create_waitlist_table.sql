-- Create waitlist_signups table for public website early access
-- This is completely separate from the main profiles table used in the mobile app

CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- No public access - only admins can read via service role
CREATE POLICY "waitlist_no_public_access" 
ON public.waitlist_signups 
FOR ALL
USING (false);

-- Create index for email lookups
CREATE INDEX idx_waitlist_email ON public.waitlist_signups(email);
CREATE INDEX idx_waitlist_created_at ON public.waitlist_signups(created_at DESC);

-- Grant access to authenticated role (but RLS still blocks it)
GRANT SELECT ON public.waitlist_signups TO authenticated;
GRANT INSERT ON public.waitlist_signups TO anon;  -- Allow anonymous signups
