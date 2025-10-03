-- Setup admin user for TuFonoAyuda
-- This script ensures the admin user exists in the users table

-- First, ensure the role column exists
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Create index for faster role lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Add check constraint to ensure valid roles (drop first if exists)
DO $$ 
BEGIN
  ALTER TABLE users DROP CONSTRAINT IF EXISTS check_user_role;
  ALTER TABLE users ADD CONSTRAINT check_user_role CHECK (role IN ('admin', 'user'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Update existing user to admin if they exist
-- Note: The user must first be created in Supabase Auth before this will work
UPDATE users 
SET role = 'admin', plan = 'Admin'
WHERE email = 'tufonoayuda@gmail.com';

-- Show result
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM users WHERE email = 'tufonoayuda@gmail.com' AND role = 'admin')
    THEN 'Admin user configured successfully'
    ELSE 'Admin user not found - please register the account first at /admin/setup'
  END as status;
