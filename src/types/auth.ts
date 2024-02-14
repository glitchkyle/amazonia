import { JwtPayload } from 'jsonwebtoken'

export enum UserPermission {
  READ_PRODUCTS = 'read:products',
  CREATE_PRODUCTS = 'create:products',
  DELETE_PRODUCTS = 'delete:products',

  READ_ORDERS = 'read:orders',
  CREATE_ORDERS = 'create:orders',
  DELETE_ORDERS = 'delete:orders',

  READ_USERS = 'read:users',
  CREATE_USERS = 'create:users',
  DELETE_USERS = 'delete:users'
}

export interface DecodedAccessToken extends JwtPayload {
  scope?: string
  permissions?: UserPermission[]
}
