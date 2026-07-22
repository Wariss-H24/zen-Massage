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

const SERVICES = [
  {
    nom: 'Consultation + Bilan',
    description: "Évaluation personnalisée pour définir le soin le plus adapté à vos besoins.",
    duree: 20,
    prix: 10000
  },
  {
    nom: 'Séance de Détox',
    description: "Soin ciblé pour favoriser l'élimination des toxines et revitaliser l'organisme",
    duree: 30,
    prix: 10000
  },
  {
    nom: 'Massage Plantaire (Les pieds)',
    description: 'Massage relaxant des pieds pour soulager les tensions et stimuler les points de pression.',
    duree: 30,
    prix: 10000
  },
  {
    nom: 'Massage Semi (Pieds et dos)',
    description: 'Soin ciblé pour détendre le dos et les pieds tout en réduisant les tensions musculaires.',
    duree: 45,
    prix: 15000
  },
  {
    nom: 'Massage Complet (Tout le corps)',
    description: 'Massage intégral pour une détente profonde et un bien-être général.',
    duree: 60,
    prix: 20000
  },
  {
    nom: 'Cure Amincissante',
    description: 'Programme de soins favorisant le raffermissement de la silhouette et le drainage du corps.',
    duree: 90,
    prix: 30000
  }
]

async function main() {
  // Créer les utilisateurs (admin et superadmin)
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

  // Créer les types de séance
  for (const service of SERVICES) {
    const exists = await prisma.typeSeance.findUnique({ where: { nom: service.nom } }) 
    if (exists) {
      console.log(`⚠️  Service "${service.nom}" existe déjà — ignoré`)
      continue
    }
    await prisma.typeSeance.create({
      data: service
    })
    console.log(`✅ Service créé : ${service.nom}`)
  }

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
