/*
  # Update security policies for leads table

  1. Security Updates
    - Add policy to prevent modification of submitted leads
    - Add policy to prevent deletion of leads
    - Ensure only authenticated users can view leads
*/

-- Prevent modification of submitted leads
CREATE POLICY "Prevent updates to leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (false);

-- Prevent deletion of leads
CREATE POLICY "Prevent deletion of leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (false);

-- Ensure the select policy exists and is properly configured
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'leads' 
    AND policyname = 'Authenticated users can view leads'
  ) THEN
    CREATE POLICY "Authenticated users can view leads"
      ON leads
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;