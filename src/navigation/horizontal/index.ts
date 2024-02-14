// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import { buildNavigationList } from 'src/navigation'
import { UserPermission } from 'src/types/auth'

const navigation = (permissions?: UserPermission[]): HorizontalNavItemsType => buildNavigationList(permissions)

export default navigation
