-- Migration script: Move waitlist users from profiles to waitlist_signups
-- Keep only test accounts and admin in profiles table

-- Step 1: Copy non-test users to waitlist_signups table
INSERT INTO public.waitlist_signups (email, display_name, created_at)
SELECT 
  u.email,
  p.display_name,
  p.created_at
FROM auth.users u
INNER JOIN public.profiles p ON u.id = p.id
WHERE u.email NOT IN (
  'user1@email.com',
  'user2@email.com', 
  'user3@email.com',
  'user4@email.com',
  'mrkizildag@gmail.com'
)
ON CONFLICT (email) DO NOTHING;  -- Skip if already exists

-- Step 2: Mark profiles as waitlist (add is_waitlist column first if it doesn't exist)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_waitlist BOOLEAN DEFAULT false;

-- Step 3: Mark non-test users as waitlist users
UPDATE public.profiles
SET is_waitlist = true
WHERE id IN (
  SELECT id FROM auth.users
  WHERE email NOT IN (
    'user1@email.com',
    'user2@email.com',
    'user3@email.com', 
    'user4@email.com',
    'mrkizildag@gmail.com'
  )
);

-- Step 4: Update RLS policy to hide waitlist users from other users
DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
CREATE POLICY "profiles_select_active" ON public.profiles
  FOR SELECT
  USING (
    (auth.role() = 'authenticated' AND is_waitlist = false)  -- Active users can see other active users
    OR auth.uid() = id  -- Users can always see their own profile
  );

-- Step 5: Verify the migration
SELECT 'Active profiles:' as info, COUNT(*) as count FROM public.profiles WHERE is_waitlist = false
UNION ALL
SELECT 'Waitlist profiles:' as info, COUNT(*) as count FROM public.profiles WHERE is_waitlist = true
UNION ALL
SELECT 'Waitlist signups:' as info, COUNT(*) as count FROM public.waitlist_signups
UNION ALL  
SELECT 'Auth users:' as info, COUNT(*) as count FROM auth.users;

-- Step 6: Show active users (the ones you kept)
SELECT 
  u.email,
  p.display_name,
  p.is_waitlist,
  p.created_at
FROM auth.users u
INNER JOIN public.profiles p ON u.id = p.id
WHERE p.is_waitlist = false
ORDER BY p.created_at;
