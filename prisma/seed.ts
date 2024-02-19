import { PrismaClient, User } from '@prisma/client'
import { faker } from '@faker-js/faker'

const numUsers = 50

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})

  const users: User[] = []

  for (let i = 0; i < numUsers; i++) {
    const user = {
      email: faker.internet.email(),
      sub: faker.string.uuid(),
      picture: faker.image.avatar()
    }

    users.push(user as never as User)
  }

  await prisma.user.createMany({ data: users })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
