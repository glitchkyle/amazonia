import { getAccessToken, getSession, updateSession } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next/types'

import { fetchManagementApiToken, upgradeToSeller } from 'src/lib/auth0'
import { ResponseType } from 'src/types/pages/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    switch (req.method) {
        case 'POST':
            const session = await getSession(req, res)
            if (!session) return res.status(401).json({ message: 'Not authenticated' })

            // TODO: Management API Access Token does not need to be fetched everytime, only when access token expires
            try {
                await fetchManagementApiToken()
            } catch (e) {
                return res.status(500).json({ message: 'Failed to fetch new Management API token' })
            }

            try {
                await upgradeToSeller(session.user.sub)
            } catch (e) {
                return res.status(500).json({ message: 'Failed to upgrade to seller' })
            }

            // TODO: Upgrading roles should remove lower level roles

            // Update the current session to use fresh new access token containing new scopes
            const { accessToken } = await getAccessToken(req, res, { refresh: true })
            await updateSession(req, res, {
                ...session,
                accessToken
            })

            return res.status(200).json({ message: 'Successfully upgraded' })
        default:
            res.status(404).json({ message: 'Not found' })
    }
}
