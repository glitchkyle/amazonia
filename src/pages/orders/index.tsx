import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'

export const getServerSideProps = ProtectPage({
  returnPath: '/orders'
})

const OrdersPage = (props: ProtectionReturn) => {
  const { permissions } = props

  return <UserLayout permissions={permissions}>Orders Page</UserLayout>
}

export default OrdersPage
