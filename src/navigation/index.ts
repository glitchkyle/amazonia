import { NavLink } from 'src/@core/layouts/types'
import { PUBLIC_NAV_LINKS, getAccessibleLinks } from 'src/configs/acl'
import { UserPermission } from 'src/types/auth'

export function buildNavigationList(perms?: UserPermission[]): NavLink[] {
  // Initialize with list of publicly available routes
  const navigationList: NavLink[] = [...PUBLIC_NAV_LINKS]

  // No permission means publicly accessible
  if (!perms) return navigationList

  const accessibleLinks = getAccessibleLinks(perms)
  navigationList.push(...accessibleLinks)

  return navigationList
}
