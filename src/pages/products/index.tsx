import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'
import { UserPermission } from 'src/types/auth'

export const getServerSideProps = ProtectPage({
  authorizedPerms: [UserPermission.READ_PRODUCTS],
  returnPath: '/products'
})

const ProductsPage = (props: ProtectionReturn) => {
  const { permissions } = props

  return <UserLayout permissions={permissions}>Products Page</UserLayout>
}

export default ProductsPage
