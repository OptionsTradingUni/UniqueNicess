# Fixing Production Database on Render

## The Problem

Your production database on Render is missing:
- The `total_profit` column in the `stats` table
- The `analytics_events` table

This is causing the app to crash on startup with errors:
```
Error: column "total_profit" does not exist
Error: relation "analytics_events" does not exist
```

## The Solution

You need to sync your database schema on Render. Here's how:

### Option 1: Run Migration via Render Shell

1. Go to your Render dashboard
2. Navigate to your web service
3. Click on "Shell" tab
4. Run this command:
```bash
npm run db:push
```

If that doesn't work, try:
```bash
npm run db:push --force
```

### Option 2: Add Migration to Build Command

Update your build command on Render to include the migration:

**Current build command:**
```bash
npm install; npm run build
```

**New build command:**
```bash
npm install; npm run db:push; npm run build
```

This will automatically sync your schema every time you deploy.

### Option 3: Manual Database Migration

If the above don't work, you can manually run the migration by:

1. Connect to your Render PostgreSQL database
2. Run these SQL commands:

```sql
-- Add total_profit column if missing
ALTER TABLE stats ADD COLUMN IF NOT EXISTS total_profit REAL NOT NULL DEFAULT 0;

-- Create analytics_events table if missing
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  page VARCHAR(500),
  button_name VARCHAR(255),
  form_name VARCHAR(255),
  details TEXT,
  duration INTEGER,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## Verify It's Fixed

After running the migration, check your Render logs. You should see:
```
✅ Default admin created:
   Username: admin
   Password: admin123
12:14:17 AM [express] serving on port 10000
==> Your service is live 🎉
```

Instead of the error messages.

## Important Note

The development database on Replit is already synced correctly. This fix is **only needed for your production database on Render**.
