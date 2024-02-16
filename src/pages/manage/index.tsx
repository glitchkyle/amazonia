import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'
import { UserPermission } from 'src/types/auth'

export const getServerSideProps = ProtectPage({
  requiredPerms: [UserPermission.READ_USERS],
  returnPath: '/manage'
})

const ManagePage = (props: ProtectionReturn) => {
  const { permissions } = props

  return <UserLayout permissions={permissions}>Manage Page</UserLayout>
}

export default ManagePage
