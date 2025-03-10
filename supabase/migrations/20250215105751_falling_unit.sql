/*
  # Create leads table for solar installation inquiries

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `installation_type` (text) - residential or business
      - `state` (text) - Brazilian state
      - `annual_bill` (numeric) - annual energy bill value
      - `phone` (text) - contact phone number
      - `created_at` (timestamp) - when the lead was created
      - `status` (text) - lead status (new, contacted, qualified, closed)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to insert new leads
    - Add policy for authenticated users to read leads
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_type text NOT NULL CHECK (installation_type IN ('residential', 'business')),
  state text NOT NULL,
  annual_bill numeric NOT NULL CHECK (annual_bill > 0),
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed'))
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert example data
INSERT INTO leads (installation_type, state, annual_bill, phone, status, created_at)
VALUES
  ('residential', 'São Paulo', 3600.00, '(11) 98765-4321', 'new', now() - interval '2 days'),
  ('business', 'Rio de Janeiro', 12000.00, '(21) 98765-4321', 'contacted', now() - interval '1 day'),
  ('residential', 'Minas Gerais', 2400.00, '(31) 98765-4321', 'qualified', now());