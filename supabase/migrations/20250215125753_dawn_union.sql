/*
  # Add example leads data
  
  1. Changes
    - Insert example lead records into the leads table
    
  2. Notes
    - Adds three example leads with different installation types and statuses
    - Timestamps are set relative to current time for better data distribution
*/

-- Insert example data if not exists
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM leads 
    WHERE phone IN ('(11) 98765-4321', '(21) 98765-4321', '(31) 98765-4321')
  ) THEN
    INSERT INTO leads (installation_type, state, annual_bill, phone, status, created_at)
    VALUES
      ('residential', 'São Paulo', 3600.00, '(11) 98765-4321', 'new', now() - interval '2 days'),
      ('business', 'Rio de Janeiro', 12000.00, '(21) 98765-4321', 'contacted', now() - interval '1 day'),
      ('residential', 'Minas Gerais', 2400.00, '(31) 98765-4321', 'qualified', now());
  END IF;
END $$;