// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { buildNavigationList } from 'src/navigation'
import { UserPermission } from 'src/types/auth'

const navigation = (permissions?: UserPermission[]): VerticalNavItemsType => buildNavigationList(permissions)

export default navigation
