export interface UserCreationForm {
  sub?: string
  email?: string
  emailVerified?: boolean
  firstName?: string
  lastName?: string
  picture?: string

  // We are also sending across a secret value to validate that this request is coming from Auth0
  secret?: string
}
