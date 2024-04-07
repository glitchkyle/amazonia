// @ts-ignore
import { beforeEach } from 'vitest'

import resetDb from './reset-db'
import { fetchManagementApiToken } from 'src/lib/auth0'

beforeEach(async () => {
    await resetDb()

    await fetchManagementApiToken()
})
