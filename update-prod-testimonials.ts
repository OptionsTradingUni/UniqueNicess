import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from "./shared/schema";
import { MANUAL_TESTIMONIALS } from "./server/seed-data";

neonConfig.webSocketConstructor = ws;

const prodDbUrl = "postgresql://neondb_owner:npg_DBvVptGsU0O3@ep-proud-tree-aeksbsuv.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({ connectionString: prodDbUrl });
const db = drizzle({ client: pool, schema });

async function updateProductionTestimonials() {
  try {
    console.log("🔗 Connecting to production database...\n");
    
    // Delete all existing testimonials
    console.log("🗑️  Removing old incomplete testimonials...");
    await db.delete(schema.testimonials);
    console.log("✅ Old testimonials removed\n");
    
    // Insert the 10 manual testimonials with images
    console.log("📝 Adding your 10 custom testimonials with images...");
    const testimonialsToInsert = MANUAL_TESTIMONIALS.map(t => ({
      name: t.name,
      testimonial: t.testimonial,
      rating: t.rating,
      photo: t.photo,
      profit: t.profit,
      profitImage: t.profitImage,
      date: t.date
    }));
    
    await db.insert(schema.testimonials).values(testimonialsToInsert);
    
    console.log("✅ Successfully added 10 testimonials!\n");
    
    // Show what was added
    console.log("📋 Your new testimonials:");
    testimonialsToInsert.forEach((t, i) => {
      console.log(`\n${i + 1}. ${t.name}`);
      console.log(`   Text: ${t.testimonial?.substring(0, 60)}...`);
      console.log(`   Profit: ${t.profit}`);
      console.log(`   Photo: ${t.photo}`);
      console.log(`   Proof: ${t.profitImage}`);
    });
    
    console.log("\n\n🎉 Production database updated successfully!");
    console.log("Your website will now show these beautiful testimonials with images!");
    
  } catch (error) {
    console.error("❌ Error updating production database:", error);
  } finally {
    await pool.end();
  }
}

updateProductionTestimonials();
