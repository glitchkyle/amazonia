import { NavLink } from 'src/@core/layouts/types'
import { UserPermission } from 'src/types/auth'

export const PUBLIC_NAV_LINKS: NavLink[] = [
  {
    title: 'Catalog',
    path: '/catalog',
    icon: 'mdi:home-outline'
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: 'mdi:shopping-outline'
  },
  {
    title: 'Cart',
    path: '/cart',
    icon: 'mdi:cart-outline'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: 'mdi:account-outline'
  }
]

export function getAccessibleLinks(perms: UserPermission[]): NavLink[] {
  const list = []

  if (perms.includes(UserPermission.READ_PRODUCTS))
    list.push({
      title: 'Products',
      path: '/products',
      icon: 'mdi:package-variant'
    })

  if (perms.includes(UserPermission.READ_USERS))
    list.push({
      title: 'Manage',
      path: '/manage',
      icon: 'mdi:pencil-outline'
    })

  return list
}
