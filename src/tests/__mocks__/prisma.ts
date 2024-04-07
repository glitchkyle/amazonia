import { PrismaClient } from '@prisma/client'

// @ts-ignore
import { beforeEach } from 'vitest'
// @ts-ignore
import { mockDeep, mockReset } from 'vitest-mock-extended'

beforeEach(() => {
    mockReset(prisma)
})

const prisma = mockDeep<PrismaClient>()
export default prisma
