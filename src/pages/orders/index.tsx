import moment from 'moment'
import db from 'src/configs/db'
import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'
import TableSort from 'src/views/pages/table/data-grid/TableBasicSort'

export const getServerSideProps = ProtectPage({
  returnPath: '/orders',
  callback: async (ctx, user) => {
    if (!user) throw new Error('Unauthenticated')
    const orders = await db.order.findMany({ orderBy: { createdAt: 'desc' }, where: { buyer: { id: user.id } } })

    return {
      props: {
        orders: orders.map(order => {
          return {
            ...order,
            createdAt: moment(order.createdAt).toString(),
            updatedAt: moment(order.updatedAt).toString()
          }
        })
      }
    }
  }
})

const OrdersPage = (props: ProtectionReturn) => {
  const { permissions, orders } = props

  return (
    <UserLayout permissions={permissions}>
      <TableSort orders={orders} />
    </UserLayout>
  )
}

export default OrdersPage
