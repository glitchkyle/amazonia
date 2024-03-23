import { createMocks, RequestMethod } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next/types'

export function mockRequestResponse(method: RequestMethod = 'GET') {
  const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method })

  return { req, res }
}
