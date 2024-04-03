// @ts-ignore
import { describe, expect, it } from 'vitest'

import handler from 'src/pages/api/auth/register'
import prisma from 'src/tests/helpers/prisma'
import { mockRequestResponse } from 'src/tests/helpers'
import { mockFakeUserCreation } from 'src/tests/__mocks__'

describe('/api/auth/register', () => {
    describe('POST', () => {
        it('Should create a user when user body is completely valid', async () => {
            const user = mockFakeUserCreation()

            const { req, res } = mockRequestResponse('POST')
            req.body = user

            await handler(req, res)

            const newUser = await prisma.user.findUnique({ where: { email: user.email } })

            expect(res.statusCode).toBe(201)
            expect(newUser).not.toBeNull()
            expect(newUser?.email).toStrictEqual(user.email)
        })

        it('Should not create a user when user sub is missing', async () => {
            const user = mockFakeUserCreation()

            const subject = user.sub
            delete user.sub

            const { req, res } = mockRequestResponse('POST')
            req.body = user

            await handler(req, res)

            const newUser = await prisma.user.findUnique({ where: { sub: subject } })

            expect(res.statusCode).toBe(400)
            expect(newUser).toBeNull()
        })

        it('Should not create a user when user email is missing', async () => {
            const user = mockFakeUserCreation()

            const email = user.email
            delete user.email

            const { req, res } = mockRequestResponse('POST')
            req.body = user

            await handler(req, res)

            const newUser = await prisma.user.findUnique({ where: { email } })

            expect(res.statusCode).toBe(400)
            expect(newUser).toBeNull()
        })

        it('Should create a user when user body is valid but missing user name', async () => {
            const user = mockFakeUserCreation()

            delete user.firstName
            delete user.lastName

            const { req, res } = mockRequestResponse('POST')
            req.body = user

            await handler(req, res)

            const newUser = await prisma.user.findUnique({ where: { email: user.email } })

            expect(res.statusCode).toBe(201)
            expect(newUser).not.toBeNull()
            expect(newUser?.email).toStrictEqual(user.email)
            expect(newUser?.firstName).toStrictEqual(null)
            expect(newUser?.lastName).toStrictEqual(null)
        })

        it('Should create a user when user body is valid but missing email verified', async () => {
            const user = mockFakeUserCreation()

            delete user.emailVerified

            const { req, res } = mockRequestResponse('POST')
            req.body = user

            await handler(req, res)

            const newUser = await prisma.user.findUnique({ where: { email: user.email } })

            expect(res.statusCode).toBe(201)
            expect(newUser).not.toBeNull()
            expect(newUser?.email).toStrictEqual(user.email)
            expect(newUser?.emailVerified).toStrictEqual(false)
        })

        it('Should respond with unauthorized access with invalid secret value', async () => {
            const user = mockFakeUserCreation()

            const { req, res } = mockRequestResponse('POST')
            req.body = { ...user, secret: 'RANDOM' }

            await handler(req, res)

            const newUser = await prisma.user.findUnique({ where: { email: user.email } })

            expect(res.statusCode).toBe(401)
            expect(newUser).toBeNull()
        })

        it('Should be able to handle concurrent API requests', async () => {
            const user = mockFakeUserCreation()
            const anotherUser = mockFakeUserCreation()

            const mockReqRes1 = mockRequestResponse('POST')
            const mockReqRes2 = mockRequestResponse('POST')

            mockReqRes1.req.body = user
            mockReqRes2.req.body = anotherUser

            await Promise.all([handler(mockReqRes1.req, mockReqRes1.res), handler(mockReqRes2.req, mockReqRes2.res)])
            const newUser1 = await prisma.user.findUnique({ where: { email: user.email } })
            const newUser2 = await prisma.user.findUnique({ where: { email: anotherUser.email } })

            expect(mockReqRes1.res.statusCode).toBe(201)
            expect(newUser1).not.toBeNull()
            expect(newUser1?.email).toStrictEqual(user.email)

            expect(mockReqRes2.res.statusCode).toBe(201)
            expect(newUser2).not.toBeNull()
            expect(newUser2?.email).toStrictEqual(anotherUser.email)
        })

        it('Should not succeed when there are users with duplicate subjects', async () => {
            const user = mockFakeUserCreation()
            const anotherUser = mockFakeUserCreation()

            const mockReqRes1 = mockRequestResponse('POST')
            const mockReqRes2 = mockRequestResponse('POST')

            mockReqRes1.req.body = user
            mockReqRes2.req.body = { ...anotherUser, sub: user.sub }

            await handler(mockReqRes1.req, mockReqRes1.res)
            await handler(mockReqRes2.req, mockReqRes2.res)
            const newUser1 = await prisma.user.findUnique({ where: { email: user.email } })
            const newUser2 = await prisma.user.findUnique({ where: { email: anotherUser.email } })

            expect(mockReqRes1.res.statusCode).toBe(201)
            expect(newUser1).not.toBeNull()
            expect(newUser1?.sub).toStrictEqual(user.sub)

            expect(mockReqRes2.res.statusCode).toBe(500)
            expect(newUser2).toBeNull()
        })

        it('Should not succeed when there are users with duplicate emails', async () => {
            const user = mockFakeUserCreation()
            const anotherUser = mockFakeUserCreation()

            const mockReqRes1 = mockRequestResponse('POST')
            const mockReqRes2 = mockRequestResponse('POST')

            mockReqRes1.req.body = user
            mockReqRes2.req.body = { ...anotherUser, email: user.email }

            await handler(mockReqRes1.req, mockReqRes1.res)
            await handler(mockReqRes2.req, mockReqRes2.res)
            const newUser1 = await prisma.user.findUnique({ where: { email: user.email } })
            const newUser2 = await prisma.user.findUnique({ where: { email: anotherUser.email } })

            expect(mockReqRes1.res.statusCode).toBe(201)
            expect(newUser1).not.toBeNull()
            expect(newUser1?.email).toStrictEqual(user.email)

            expect(mockReqRes2.res.statusCode).toBe(500)
            expect(newUser2).toBeNull()
        })

        // TODO: Test when query fails
    })
})
