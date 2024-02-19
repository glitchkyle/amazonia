import dotenv from 'dotenv'

dotenv.config({ path: './.env.local' })

import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const numUsers = 50
const maxProductsPerUser = 50

const prisma = new PrismaClient()

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

async function main() {
  await prisma.user.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.order.deleteMany({})

  for (let i = 0; i < numUsers; i++) {
    const user = await prisma.user.create({
      data: {
        sub: faker.string.uuid(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        emailVerified: Math.random() < 0.5,
        picture: faker.image.avatar()
      }
    })

    for (; i < getRandomInt(0, maxProductsPerUser); i++) {
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          sellerId: user.id,
          picture: faker.image.urlLoremFlickr(),
          price: Number(faker.commerce.price()),
          currency: faker.finance.currency().code
        }
      })
    }
  }
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
