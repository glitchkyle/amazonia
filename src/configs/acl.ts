import { AbilityBuilder, PureAbility } from '@casl/ability'
import { NavLink } from 'src/@core/layouts/types'
import { UserRole } from 'src/types'
import { UserPermission } from 'src/types/auth'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = PureAbility<[Actions, Subjects]> | undefined

export const AppAbility = PureAbility as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  switch (role) {
    case UserRole.ADMIN:
      can('manage', 'all')
      break
    case UserRole.BUYER:
      can('read', 'profile')
      break
    case UserRole.SELLER:
      can('read', 'profile')
      break
    case UserRole.CLIENT:
      can(['read'], 'acl-page')
      break
    default:
      can(['read', 'create', 'update', 'delete'], subject)
      break
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

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

export default defineRulesFor
