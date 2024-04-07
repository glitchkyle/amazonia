import { getAccessToken, getSession, updateSession } from '@auth0/nextjs-auth0'
import { IsNotEmpty, IsString, validate } from 'class-validator'
import type { NextApiRequest, NextApiResponse } from 'next/types'

import { fetchManagementApiToken, upgradeToSeller } from 'src/lib/auth0'
import { ResponseType } from 'src/types/pages/api'
import { UserUpgradeForm } from 'src/types/pages/api/auth/upgrade'

class UserUpgrade implements UserUpgradeForm {
    @IsNotEmpty()
    @IsString()
    userId!: string

    constructor(params: UserUpgradeForm) {
        // Required Fields
        this.userId = params.userId as string
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    switch (req.method) {
        case 'POST':
            const user = new UserUpgrade(req.body as UserUpgradeForm)

            const errors = await validate(user)
            if (errors.length > 0) {
                return res.status(400).json({
                    message: 'Invalid fields provided',
                    data: errors
                })
            }

            // TODO: Management API Access Token does not need to be fetched everytime, only when access token expires
            try {
                await fetchManagementApiToken()
            } catch (e) {
                return res.status(500).json({ message: 'Failed to fetch new Management API token' })
            }

            try {
                await upgradeToSeller(user.userId)
            } catch (e) {
                return res.status(500).json({ message: 'Failed to upgrade to seller' })
            }

            // TODO: Upgrading roles should remove lower level roles

            // Update the current session, if there is one, to use fresh new access token containing new scopes
            const session = await getSession(req, res)
            if (session) {
                const { accessToken } = await getAccessToken(req, res, { refresh: true })
                await updateSession(req, res, {
                    ...session,
                    accessToken
                })
            }

            return res.status(200).json({ message: 'Successfully upgraded' })
        default:
            res.status(404).json({ message: 'Not found' })
    }
}
