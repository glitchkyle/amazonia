import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError
} from '@prisma/client/runtime/library'

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
  ADMIN = 'admin',

  // Demo purposes
  CLIENT = 'client'
}

export type PrismaError =
  | PrismaClientKnownRequestError
  | PrismaClientInitializationError
  | PrismaClientUnknownRequestError
  | PrismaClientValidationError
