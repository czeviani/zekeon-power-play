/*
  # Add anonymous insert policy

  1. Security Changes
    - Add policy for anonymous inserts to leads table
*/

-- Drop existing insert policy if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'leads' 
    AND policyname = 'Anyone can insert leads'
  ) THEN
    DROP POLICY "Anyone can insert leads" ON leads;
  END IF;
END $$;

-- Create new anonymous insert policy
CREATE POLICY "Allow anonymous inserts"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);