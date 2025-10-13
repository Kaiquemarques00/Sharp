/*
  # SharpBook Database Schema

  1. New Tables
    - `barbershops`
      - `id` (uuid, primary key)
      - `name` (text, barbershop name)
      - `whatsapp_phone` (text, phone number)
      - `barber_count` (integer, number of barbers)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)
    
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text, user's full name)
      - `email` (text, unique email address)
      - `barbershop_id` (uuid, references barbershops)
      - `created_at` (timestamptz, creation timestamp)
    
    - `subscriptions`
      - `id` (uuid, primary key)
      - `barbershop_id` (uuid, references barbershops)
      - `plan_type` (text, plan name: essencial, profissional, premium)
      - `billing_cycle` (text, monthly or annual)
      - `price` (numeric, subscription price)
      - `status` (text, active, cancelled, expired)
      - `started_at` (timestamptz, subscription start date)
      - `expires_at` (timestamptz, subscription expiration date)
      - `created_at` (timestamptz, creation timestamp)
    
    - `lead_submissions`
      - `id` (uuid, primary key)
      - `barbershop_name` (text, submitted barbershop name)
      - `email` (text, contact email)
      - `phone_whatsapp` (text, contact phone)
      - `created_at` (timestamptz, submission timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
    - Add policies for users to manage their barbershop data
*/

-- Create barbershops table
CREATE TABLE IF NOT EXISTS barbershops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  whatsapp_phone text,
  barber_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE barbershops ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  barbershop_id uuid REFERENCES barbershops(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  barbershop_id uuid REFERENCES barbershops(id) ON DELETE CASCADE NOT NULL,
  plan_type text NOT NULL CHECK (plan_type IN ('essencial', 'profissional', 'premium')),
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('mensal', 'anual')),
  price numeric NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  started_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create lead_submissions table
CREATE TABLE IF NOT EXISTS lead_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  barbershop_name text NOT NULL,
  email text NOT NULL,
  phone_whatsapp text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lead_submissions ENABLE ROW LEVEL SECURITY;

-- Barbershops policies
CREATE POLICY "Users can view their own barbershop"
  ON barbershops FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.barbershop_id = barbershops.id
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own barbershop"
  ON barbershops FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.barbershop_id = barbershops.id
      AND profiles.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.barbershop_id = barbershops.id
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own barbershop"
  ON barbershops FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Subscriptions policies
CREATE POLICY "Users can view their barbershop subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.barbershop_id = subscriptions.barbershop_id
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can insert subscriptions for their barbershop"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.barbershop_id = subscriptions.barbershop_id
      AND profiles.id = auth.uid()
    )
  );

-- Lead submissions policy
CREATE POLICY "Anyone can submit leads"
  ON lead_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_barbershop_id ON profiles(barbershop_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_barbershop_id ON subscriptions(barbershop_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);