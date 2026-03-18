import "dotenv/config"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./prisma/generated/client"
import bcrypt from "bcryptjs"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const passwordHash = await bcrypt.hash("SuaSenhaSegura123!", 12)

  await prisma.user.upsert({
    where: { email: "gabriel@saas.com" },
    update: {
      role: "SUPER_ADMIN",
      password: passwordHash,
      storeId: null,
    },
    create: {
      email: "gabriel@saas.com",
      name: "Gabriel",
      password: passwordHash,
      role: "SUPER_ADMIN",
      storeId: null,
    },
  })

  console.log("✅ Super Admin criado com sucesso!")
  console.log("Email: gabriel@saas.com")
  console.log("Senha: SuaSenhaSegura123!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })