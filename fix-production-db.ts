import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

const PRODUCTION_DB_URL = "postgresql://neondb_owner:npg_DBvVptGsU0O3@ep-proud-tree-aeksbsuv.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require";

async function fixProductionDatabase() {
  const pool = new Pool({ connectionString: PRODUCTION_DB_URL });
  
  try {
    console.log("🔧 Connecting to production database...");
    
    // Check if total_profit column exists
    console.log("📊 Checking stats table...");
    const statsCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'stats' AND column_name = 'total_profit'
    `);
    
    if (statsCheck.rows.length === 0) {
      console.log("➕ Adding total_profit column to stats table...");
      await pool.query(`
        ALTER TABLE stats ADD COLUMN IF NOT EXISTS total_profit REAL NOT NULL DEFAULT 0
      `);
      console.log("✅ total_profit column added!");
    } else {
      console.log("✅ total_profit column already exists");
    }
    
    // Check if analytics_events table exists
    console.log("📊 Checking analytics_events table...");
    const tableCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'analytics_events'
    `);
    
    if (tableCheck.rows.length === 0) {
      console.log("➕ Creating analytics_events table...");
      await pool.query(`
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
        )
      `);
      console.log("✅ analytics_events table created!");
    } else {
      console.log("✅ analytics_events table already exists");
    }
    
    console.log("\n🎉 Production database fixed successfully!");
    console.log("✅ All required tables and columns are now in place.");
    
  } catch (error) {
    console.error("❌ Error fixing production database:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

fixProductionDatabase().catch(console.error);
