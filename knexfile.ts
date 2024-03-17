import dotenv from 'dotenv'

dotenv.config({ path: './.env.local' })

import type { Knex } from 'knex'

// Update with your config settings.
const config: Knex.Config = {
  client: 'pg',
  connection: process.env.POSTGRES_PRISMA_URL,
  migrations: {
    extension: 'ts'
  }
}

export default config
