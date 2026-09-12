-- O2MackDrive Car Trading — admin database schema
-- Target: PostgreSQL 14+

CREATE TABLE IF NOT EXISTS cars (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  variant TEXT,
  year INTEGER NOT NULL,
  price BIGINT NOT NULL,
  mileage INTEGER NOT NULL,
  transmission TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  body_type TEXT NOT NULL,
  color TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Available',
  location TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  spotlight BOOLEAN NOT NULL DEFAULT FALSE,
  highlight_label TEXT,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  date_added DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cars_status ON cars (status);
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars (brand);
CREATE INDEX IF NOT EXISTS idx_cars_date_added ON cars (date_added DESC);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created ON contact_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries (status);

CREATE TABLE IF NOT EXISTS sell_trade_inquiries (
  id SERIAL PRIMARY KEY,
  vehicle_year INTEGER,
  vehicle_make TEXT,
  vehicle_model TEXT,
  mileage INTEGER,
  target_price TEXT,
  notes TEXT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sell_trade_inquiries_created ON sell_trade_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sell_trade_inquiries_status ON sell_trade_inquiries (status);

CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inquiry workflow statuses: New, Reviewed, Replied, Closed