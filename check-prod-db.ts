import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from "./shared/schema";

neonConfig.webSocketConstructor = ws;

const prodDbUrl = "postgresql://neondb_owner:npg_DBvVptGsU0O3@ep-proud-tree-aeksbsuv.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({ connectionString: prodDbUrl });
const db = drizzle({ client: pool, schema });

async function checkProdDatabase() {
  try {
    console.log("Connecting to production database...");
    
    // Check ALL testimonials
    const allTestimonials = await db.query.testimonials.findMany({
      orderBy: (testimonials, { desc }) => [desc(testimonials.id)]
    });
    
    console.log(`\nTotal testimonials in database: ${allTestimonials.length}`);
    
    // Check for testimonials with images
    const testimonialsWithImages = allTestimonials.filter(t => t.imageUrl);
    console.log(`Testimonials with images: ${testimonialsWithImages.length}`);
    
    // Check for testimonials with text
    const testimonialsWithText = allTestimonials.filter(t => t.text);
    console.log(`Testimonials with text: ${testimonialsWithText.length}`);
    
    // Show latest 10
    const testimonials = allTestimonials.slice(0, 10);
    
    console.log(`\nFound ${testimonials.length} testimonials in production database:`);
    testimonials.forEach((t, i) => {
      console.log(`\n${i + 1}. Name: ${t.name || 'No name'}`);
      console.log(`   Role: ${t.role || 'No role'}`);
      console.log(`   Rating: ${t.rating || 'No rating'}`);
      console.log(`   Text: ${t.text ? t.text.substring(0, 100) + '...' : 'No text'}`);
      console.log(`   Image: ${t.imageUrl || 'No image'}`);
    });
    
    // Check stats
    const stats = await db.query.stats.findFirst();
    console.log(`\nStats: ${stats ? 'Found' : 'Not found'}`);
    if (stats) {
      console.log(`  Members: ${stats.memberCount}`);
      console.log(`  Trades: ${stats.tradesCalled}`);
    }
    
    // Check stocks
    const stocks = await db.query.stocks.findMany({ limit: 5 });
    console.log(`\nStocks: Found ${stocks.length}`);
    
  } catch (error) {
    console.error("Error checking production database:", error);
  } finally {
    await pool.end();
  }
}

checkProdDatabase();
