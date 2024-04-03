import moment from 'moment'
import prisma from 'src/lib/prisma'
import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'
import { UserPermission } from 'src/types/auth'
import TableStickyHeader from 'src/views/pages/table/mui/TableStickyHeader'

export const getServerSideProps = ProtectPage({
    requiredPerms: [UserPermission.READ_PRODUCTS],
    returnPath: '/inventory',
    callback: async (ctx, user) => {
        if (!user) throw new Error('Unauthenticated')
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            where: { seller: { id: user.id } }
        })

        return {
            props: {
                products: products.map(product => {
                    return {
                        ...product,
                        createdAt: moment(product.createdAt).toString(),
                        updatedAt: moment(product.updatedAt).toString()
                    }
                })
            }
        }
    }
})

const InventoryPage = (props: ProtectionReturn) => {
    const { permissions, products } = props

    return (
        <UserLayout permissions={permissions}>
            <TableStickyHeader products={products} />
        </UserLayout>
    )
}

export default InventoryPage
