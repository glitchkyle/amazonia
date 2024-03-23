import { faker } from '@faker-js/faker'
import { UserCreationForm } from 'src/types/pages/api/auth/register'

export function mockFakeUserCreation(): UserCreationForm {
  return {
    sub: faker.string.uuid(),
    email: faker.internet.email(),
    emailVerified: faker.datatype.boolean(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    picture: faker.image.avatar(),

    // We are also sending across a secret value to validate that this request is coming from Auth0
    secret: process.env.AUTH0_CLIENT_SECRET
  }
}
