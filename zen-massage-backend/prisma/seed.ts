import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

async function main() {
  // Vérifier si la table User existe, sinon créer les tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "User" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      "firstName" TEXT NOT NULL,
      "lastName" TEXT NOT NULL,
      phone TEXT,
      avatar TEXT,
      role TEXT NOT NULL DEFAULT 'USER',
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "deletedAt" TIMESTAMP
    );
  `)

  const users = [
    {
      email: 'benmassageSuperAdmin@ben.com',
      password: '$2a$12$Vz4qJm9K7X5Y2L1R3tP6uOX8Wz4qJm9K7X5Y2L1R3tP6uOX8Wz4qJm9K7X5Y2L1R3tP6uOX8Wz4qJm9K7',
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
    },
    {
      email: 'benmassageAdmin@ben.com',
      password: '$2a$12$Vz4qJm9K7X5Y2L1R3tP6uOX8Wz4qJm9K7X5Y2L1R3tP6uOX8Wz4qJm9K7X5Y2L1R3tP6uOX8Wz4qJm9K7',
      firstName: 'Ben',
      lastName: 'Admin',
      role: 'ADMIN',
    },
  ]

  for (const u of users) {
    const { rows } = await pool.query('SELECT id FROM "User" WHERE email = $1', [u.email])
    if (rows.length > 0) {
      console.log(`⚠️  ${u.role} existe déjà — ignoré`)
      continue
    }
    const bcrypt = await import('bcryptjs')
    const hash = await bcrypt.hash(u.password === '$2a$12$Vz4qJm9K7X5Y2L1R3tP6uOX8Wz4qJm9K7X5Y2L1R3tP6uOX8Wz4qJm9K7X5Y2L1R3tP6uOX8Wz4qJm9K7' ? 'benmassageSuperAdmin753' : u.password, 12)
    await pool.query(
      'INSERT INTO "User" (id, email, password, "firstName", "lastName", role, "createdAt", "updatedAt") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, NOW(), NOW())',
      [u.email, hash, u.firstName, u.lastName, u.role]
    )
    console.log(`✅ ${u.role} créé : ${u.email}`)
  }

  await pool.end()
}

main().catch(console.error)
