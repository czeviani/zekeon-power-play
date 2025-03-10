/*
  # Add qualification status for leads

  1. Changes
    - Add `qualify_lead` column to `leads` table to track lead qualification status
    - Default value is 'qualified'
    - Possible values: 'qualified', 'desqualificado'

  2. Notes
    - Non-destructive change that preserves existing data
    - All existing leads will be marked as 'qualified' by default
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'qualify_lead'
  ) THEN
    ALTER TABLE leads 
    ADD COLUMN qualify_lead text NOT NULL DEFAULT 'qualified' 
    CHECK (qualify_lead IN ('qualified', 'desqualificado'));
  END IF;
END $$;