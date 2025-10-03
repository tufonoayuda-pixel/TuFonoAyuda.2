-- Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Update the admin user
UPDATE users 
SET role = 'admin' 
WHERE email = 'tufonoayuda@gmail.com';

-- Create index for faster role lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Add check constraint to ensure valid roles
ALTER TABLE users 
ADD CONSTRAINT check_user_role 
CHECK (role IN ('admin', 'user'));
