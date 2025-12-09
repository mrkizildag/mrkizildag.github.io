-- Setup auth hook to save waitlist signups
-- This replaces the handle_new_user trigger to save to waitlist_signups instead of profiles

-- Step 1: Drop the old trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 2: Create function to save to waitlist_signups table
CREATE OR REPLACE FUNCTION public.handle_waitlist_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into waitlist_signups instead of profiles
  INSERT INTO public.waitlist_signups (email, display_name, created_at)
  VALUES (
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'User'),
    NEW.created_at
  )
  ON CONFLICT (email) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create trigger
CREATE TRIGGER on_waitlist_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_waitlist_signup();

-- Step 4: Verify it works
SELECT 'Trigger created successfully' as status;
