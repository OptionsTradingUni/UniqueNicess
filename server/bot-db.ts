import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Configure WebSocket for bot database connection
if (process.env.NODE_ENV !== 'production') {
  neonConfig.webSocketConstructor = ws;
}

if (!process.env.BOT_DATABASE_URL) {
  console.warn("BOT_DATABASE_URL not set. Recent wins will use static data.");
}

export const botPool = process.env.BOT_DATABASE_URL 
  ? new Pool({ connectionString: process.env.BOT_DATABASE_URL })
  : null;

// Interface for recent win data from bot database
export interface BotRecentWin {
  id?: number;
  member_name?: string;
  username?: string;
  name?: string;
  strategy?: string;
  trade_type?: string;
  profit?: number;
  profit_amount?: number;
  percentage?: number;
  percentage_return?: number;
  return_percentage?: number;
  date?: Date;
  created_at?: Date;
  timestamp?: Date;
  ticker?: string;
  symbol?: string;
}

// Fetch recent wins from bot database
export async function fetchRecentWins(): Promise<BotRecentWin[]> {
  if (!botPool) {
    console.log("Bot database not configured, using static data");
    return [];
  }

  try {
    // Try multiple possible table names and column variations
    const possibleQueries = [
      // Query 1: Standard trades/wins table
      `SELECT * FROM trades ORDER BY created_at DESC LIMIT 10`,
      // Query 2: Recent wins table
      `SELECT * FROM recent_wins ORDER BY date DESC LIMIT 10`,
      // Query 3: Wins table
      `SELECT * FROM wins ORDER BY timestamp DESC LIMIT 10`,
      // Query 4: Trading history
      `SELECT * FROM trading_history ORDER BY created_at DESC LIMIT 10`,
    ];

    for (const query of possibleQueries) {
      try {
        const result = await botPool.query(query);
        if (result.rows && result.rows.length > 0) {
          console.log(`Successfully fetched ${result.rows.length} recent wins from bot database`);
          return result.rows as BotRecentWin[];
        }
      } catch (err) {
        // Table doesn't exist, try next query
        continue;
      }
    }

    console.log("No matching tables found in bot database, using static data");
    return [];
  } catch (error) {
    console.error("Error fetching from bot database:", error);
    return [];
  }
}

// Get list of all tables in the bot database
export async function getBotDatabaseTables(): Promise<string[]> {
  if (!botPool) {
    return [];
  }

  try {
    const result = await botPool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    const tables = result.rows.map((row: any) => row.table_name);
    console.log("Bot database tables:", tables);
    return tables;
  } catch (error) {
    console.error("Error fetching bot database tables:", error);
    return [];
  }
}
