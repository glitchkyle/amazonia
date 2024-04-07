import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async () => {
    await prisma.$transaction([
        prisma.orderProduct.deleteMany({}),
        prisma.order.deleteMany({}),
        prisma.product.deleteMany({}),
        prisma.user.deleteMany({})
    ])
}
