import options from 'src/configs'
import { UserRole } from 'src/types'

/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  switch (role) {
    case UserRole.ADMIN:
      return '/'
    case UserRole.BUYER:
      return '/catalog'
    case UserRole.SELLER:
      return '/'
    case UserRole.CLIENT:
      return '/catalog'
    default:
      return options.rootUrl
  }
}

export default getHomeRoute
