import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, validate } from 'class-validator'
import type { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/lib/prisma'
import { PrismaError } from 'src/types'
import { ResponseType } from 'src/types/pages/api'
import { UserCreationForm } from 'src/types/pages/api/auth/register'

class UserCreation implements UserCreationForm {
  @IsNotEmpty()
  @IsString()
  sub!: string

  @IsEmail()
  email!: string

  @IsBoolean()
  emailVerified?: boolean

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  picture?: string

  constructor(params: UserCreationForm) {
    // Required Fields
    this.sub = params.sub as string
    this.email = params.email as string

    // Optional Fields
    this.emailVerified = params.emailVerified === true
    this.firstName = params.firstName
    this.lastName = params.lastName
    this.picture = params.picture
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  switch (req.method) {
    case 'POST':
      const user = new UserCreation(req.body as UserCreationForm)
      const errors = await validate(user)
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Invalid fields provided',
          data: errors
        })
      }

      if (req.body.secret === process.env.AUTH0_CLIENT_SECRET) {
        try {
          await prisma.user.create({ data: user })
          res.status(201).send({ message: 'Successfully created user!' })
        } catch (e) {
          const { message } = e as PrismaError
          res.status(500).json({ message })
        } finally {
          await prisma.$disconnect()
        }
      } else {
        res.status(401).json({ message: 'Not authorized to perform this action' })
      }
      break
    default:
      res.status(404).json({ message: 'Not found' })
  }
}
