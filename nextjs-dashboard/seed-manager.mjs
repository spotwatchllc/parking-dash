import postgres from 'postgres';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { randomUUID } from 'node:crypto'; // Import specifically for Node environment

// Ensure the connection string exists
if (!process.env.POSTGRES_URL) {
  console.error('❌ Error: POSTGRES_URL is not defined in your .env file.');
  process.exit(1);
}

const sql = postgres(process.env.POSTGRES_URL);

async function seed() {
  try {
    console.log('Hasing password...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    console.log('Inserting manager into database...');
    // Using RETURNING to confirm the write was successful
    const result = await sql`
      INSERT INTO users (id, name, email, password, role)
      VALUES (${randomUUID()}, 'Faizan Manager', 'faizan@spotwatch.com', ${hashedPassword}, 'manager')
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, role;
    `;
    
    if (result.length > 0) {
      console.log('✅ Manager user created successfully:', result[0].email);
    } else {
      console.log('⚠️ User already exists. No new user was created.');
    }

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await sql.end(); // Wait for the connection to close properly
    process.exit();
  }
}

seed();