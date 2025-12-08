-- Script to add Early User Badge to existing users
-- Run this in your Supabase SQL Editor

-- Step 1: Add badges column to profiles table (if it doesn't exist)
-- This stores an array of badge names for each user
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS badges TEXT[] DEFAULT '{}';

-- Step 2: Add the "early_user" badge to all existing users
-- You can modify the WHERE clause to be more selective
UPDATE profiles 
SET badges = array_append(badges, 'early_user')
WHERE 'early_user' != ALL(badges); -- Only add if they don't already have it

-- Step 3 (Optional): If you want to only give it to users who signed up before a certain date
-- UPDATE profiles 
-- SET badges = array_append(badges, 'early_user')
-- WHERE created_at < '2025-12-08'  -- Change this date as needed
-- AND 'early_user' != ALL(badges);

-- Step 4: Verify the changes
SELECT id, badges, created_at 
FROM profiles 
WHERE 'early_user' = ANY(badges)
ORDER BY created_at ASC;
