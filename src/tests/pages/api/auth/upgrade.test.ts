// @ts-ignore
import { describe, expect, it, afterEach, vi } from 'vitest'
import { find } from 'lodash'

import handler from 'src/pages/api/auth/upgrade'
import { mockRequestResponse } from 'src/tests/helpers'
import { downgradeFromSeller, getUserRoles } from 'src/lib/auth0'
import { UserRole } from 'src/types/lib/auth0'
import { GetAccessTokenResult, Session } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next/types'

const mocks = vi.hoisted(() => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getSession: vi.fn(async (req: NextApiRequest, res: NextApiResponse) => {
            return new Session({
                sub: process.env.AUTH0_TEST_USER_ID!
            })
        })
    }
})

// TODO: Test Auth0-Nextjs instance session without mocking
vi.mock('@auth0/nextjs-auth0', async importOriginal => {
    const actual: any = await importOriginal()

    return {
        ...actual,
        getAccessToken: async () => {
            return {
                accessToken: 'fakeAccessToken'
            } as GetAccessTokenResult
        },
        getSession: mocks.getSession
    }
})

describe('/api/auth/upgrade', () => {
    describe('POST', () => {
        afterEach(async () => {
            await downgradeFromSeller(process.env.AUTH0_TEST_USER_ID!)
        })

        it('Should update role to seller', async () => {
            const { req, res } = mockRequestResponse('POST')

            await handler(req, res)

            expect(res.statusCode).toBe(200)

            // Role upgrade should have succeeded
            const response = await getUserRoles(process.env.AUTH0_TEST_USER_ID!)
            const userRoles = response.data as UserRole[]
            const sellerRole = find(userRoles, { id: process.env.AUTH0_SELLER_ROLE_ID! })
            expect(sellerRole).toBeDefined()
        })

        it('Should not affect role if already a seller', async () => {
            const { req, res } = mockRequestResponse('POST')

            await handler(req, res)

            // Calling twice to repeatedly upgrade role
            await handler(req, res)

            expect(res.statusCode).toBe(200)

            // Role upgrade should have succeeded but with no change
            const response = await getUserRoles(process.env.AUTH0_TEST_USER_ID!)
            const userRoles = response.data as UserRole[]
            const sellerRole = find(userRoles, { id: process.env.AUTH0_SELLER_ROLE_ID! })
            expect(sellerRole).toBeDefined()
        })

        it('Should fail when user ID does not exist', async () => {
            const { req, res } = mockRequestResponse('POST')

            const sess = (async () => {
                return new Session({
                    sub: '123'
                })
            })()

            mocks.getSession.mockReturnValue(sess)

            await handler(req, res)

            expect(res.statusCode).toBe(500)
        })
    })
})
