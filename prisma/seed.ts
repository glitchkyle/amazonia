import dotenv from 'dotenv'

dotenv.config({ path: './.env.local' })

import { PrismaClient, Product } from '@prisma/client'
import { faker } from '@faker-js/faker'

const numUsers = 50
const maxProductsPerUser = 100
const maxOrdersPerUser = 100
const maxPurchasePerUser = 10

const prisma = new PrismaClient()

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

const randomEntity = <T>(entities: T[]): T => {
  return entities[Math.floor(Math.random() * entities.length)]
}

const orderStatuses = ['PENDING', 'AWAITING_PAYMENT', 'AWAITING_FULFILLMENT', 'SHIPPED', 'COMPLETED']

async function main() {
  await prisma.orderProduct.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.user.deleteMany({})

  for (let i = 0; i < numUsers; i++) {
    const sellingProducts = [] as Product[]

    // Create a random user
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

    // Generate random products sold by this user
    for (let j = 0; j < getRandomInt(0, maxProductsPerUser); j++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          sellerId: user.id,
          picture: faker.image.urlLoremFlickr(),
          price: Number(faker.commerce.price()),
          currency: 'USD',
          quantity: faker.number.int({ min: 1, max: 100 })
        }
      })

      sellingProducts.push(product)
    }

    const productsCount = await prisma.product.count()

    // Create orders for user
    for (let j = 0; j < getRandomInt(0, maxOrdersPerUser); j++) {
      const order = await prisma.order.create({
        data: {
          buyerId: user.id,

          // @ts-ignore
          status: randomEntity(orderStatuses)
        }
      })

      // Add random products included in this order
      for (let k = 0; k < getRandomInt(0, maxPurchasePerUser); k++) {
        const skip = Math.floor(Math.random() * productsCount)

        const randomProducts = await prisma.product.findMany({ take: 5, skip })
        const randomProduct = randomProducts[0]

        await prisma.orderProduct.create({
          data: {
            orderId: order.id,
            productId: randomProduct.id,
            quantity: faker.number.int({ min: 1, max: 15 })
          }
        })
      }
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
