import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'

export const getServerSideProps = ProtectPage({
  returnPath: '/cart'
})

const CartPage = (props: ProtectionReturn) => {
  const { permissions } = props

  return <UserLayout permissions={permissions}>Cart Page</UserLayout>
}

export default CartPage
