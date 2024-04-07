// @ts-ignore
import { describe, expect, it, afterEach } from 'vitest'
import { find } from 'lodash'

import handler from 'src/pages/api/auth/upgrade'
import { mockRequestResponse } from 'src/tests/helpers'
import { downgradeFromSeller, getUserRoles } from 'src/lib/auth0'
import { UserRole } from 'src/types/lib/auth0'

describe.only('/api/auth/upgrade', () => {
    describe('POST', () => {
        const userSubjectId = process.env.AUTH0_TEST_USER_ID!
        const sellerRoleId = process.env.AUTH0_SELLER_ROLE_ID!

        afterEach(async () => {
            await downgradeFromSeller(userSubjectId)
        })

        it('Should update role to seller', async () => {
            const { req, res } = mockRequestResponse('POST')

            req.body = { userId: userSubjectId }

            await handler(req, res)

            expect(res.statusCode).toBe(200)

            // Role upgrade should have succeeded
            const response = await getUserRoles(userSubjectId)
            const userRoles = response.data as UserRole[]
            const sellerRole = find(userRoles, { id: sellerRoleId })
            expect(sellerRole).toBeDefined()
        })

        it('Should not affect role if already a seller', async () => {
            const { req, res } = mockRequestResponse('POST')

            req.body = { userId: userSubjectId }

            await handler(req, res)

            expect(res.statusCode).toBe(200)

            // Role upgrade should have succeeded but with no change
            const response = await getUserRoles(userSubjectId)
            const userRoles = response.data as UserRole[]
            const sellerRole = find(userRoles, { id: sellerRoleId })
            expect(sellerRole).toBeDefined()
        })

        it('Should fail when user ID is missing from request', async () => {
            const { req, res } = mockRequestResponse('POST')

            await handler(req, res)

            expect(res.statusCode).toBe(400)
        })

        it('Should fail when user ID does not exist', async () => {
            const { req, res } = mockRequestResponse('POST')

            req.body = { userId: '123' }

            await handler(req, res)

            expect(res.statusCode).toBe(500)
        })

        // TODO: Test Auth0-Nextjs instance session
    })
})
