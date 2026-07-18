import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './src/generated/prisma/client'
import { hashPassword } from './src/utils/bcrypt'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string })
const prisma = new PrismaClient({ adapter })

const USERS = [
  {
    email: 'superadmin@ben.com',
    password: 'SuperAdmin123!',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'SUPER_ADMIN' as const,
  },
  {
    email: 'admin@ben.com',
    password: 'Admin123!',
    firstName: 'Admin',
    lastName: 'Ben',
    role: 'ADMIN' as const,
  },
]

async function main() {
  for (const u of USERS) {
    const exists = await prisma.user.findUnique({ where: { email: u.email } })
    if (exists) {
      console.log(`⚠️  ${u.role} existe déjà — ignoré`)
      continue
    }
    await prisma.user.create({
      data: { ...u, password: await hashPassword(u.password) },
    })
    console.log(`✅ ${u.role} créé : ${u.email}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())