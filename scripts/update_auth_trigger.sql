-- Remove automatic profile creation for new signups
-- This way, public website signups won't create profiles automatically

-- Step 1: Drop the trigger that auto-creates profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 2: Drop the function
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 3: Create NEW function that saves to waitlist instead
CREATE OR REPLACE FUNCTION public.handle_waitlist_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into waitlist_signups table instead of profiles
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

-- Step 4: Create trigger for waitlist signups
CREATE TRIGGER on_waitlist_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_waitlist_signup();

-- Note: Now when users sign up through the public website, they go to waitlist_signups
-- When you manually create test users or launch the app, you'll need to manually create their profiles
