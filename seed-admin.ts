import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs' // Ou a lib que você usa para hash

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('SuaSenhaSegura123', 10)

  // 1. Criar o Usuário Admin
  const user = await prisma.user.upsert({
    where: { email: 'gabriel@saas.com' },
    update: {},
    create: {
      email: 'gabriel@saas.com',
      name: 'Gabriel',
      password: passwordHash,
      role: 'ADMIN', // Verifique se o seu schema tem esse campo
    },
  })

  // 2. Criar a Loja Principal
  const store = await prisma.store.upsert({
    where: { subdomain: 'premium' },
    update: {},
    create: {
      name: 'Concessionária Premium',
      subdomain: 'premium',
      slug: 'premium-auto',
      whatsapp: '5567999999999',
      primaryColor: '#000000',
    },
  })

  console.log('✅ Admin e Loja criados com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })