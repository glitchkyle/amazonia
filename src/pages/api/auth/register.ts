import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidationError, validate } from 'class-validator'
import type { NextApiRequest, NextApiResponse } from 'next/types'

import db from 'src/configs/db'
import { PrismaError } from 'src/types'

interface UserCreationForm {
  sub?: string
  email?: string
  emailVerified?: boolean
  firstName?: string
  lastName?: string
  picture?: string

  // We are also sending across a secret value to validate that this request is coming from Auth0
  secret?: string
}

class UserCreation implements UserCreationForm {
  @IsNotEmpty()
  @IsString()
  sub!: string

  @IsEmail()
  email!: string

  @IsBoolean()
  emailVerified!: boolean

  @IsNotEmpty()
  @IsString()
  firstName!: string

  @IsNotEmpty()
  @IsString()
  lastName!: string

  @IsOptional()
  picture?: string

  constructor(params: UserCreationForm) {
    Object.assign(this, params)
  }
}

interface ResponseData {
  message: string
}

interface ResponseError {
  data: ValidationError[]
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | ResponseError>) {
  switch (req.method) {
    case 'POST':
      const user = new UserCreation(req.body as UserCreationForm)
      const errors = await validate(user)
      if (errors.length > 0)
        res.status(401).json({
          message: 'Invalid fields provided',
          data: errors
        })

      if (req.body.secret === process.env.AUTH0_CLIENT_SECRET) {
        try {
          await db.user.create({ data: user })
        } catch (e) {
          const { message } = e as PrismaError
          res.status(500).json({ message })
        } finally {
          await db.$disconnect()
          res.status(201).send({ message: 'Successfully created user!' })
        }
      } else {
        res.status(401).json({ message: 'Not authorized to perform this action' })
      }
      break
    default:
      res.status(404).json({ message: 'Not found' })
  }
}
