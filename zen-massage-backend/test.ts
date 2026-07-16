import "dotenv/config";
import { prisma } from "./src/prisma";

async function main() {
  const count = await prisma.user.count();
  console.log("Nombre d'utilisateurs :", count);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });