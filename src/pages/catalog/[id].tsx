import moment from 'moment'

import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'

import prisma from 'src/lib/prisma'

import { Grid } from '@mui/material'

import UserLayout from 'src/layouts/UserLayout'

import ProductViewLeft from 'src/views/pages/catalog/ProductViewLeft'
import ProductViewRight from 'src/views/pages/catalog/ProductViewRight'

export const getServerSideProps = ProtectPage({
    callback: async ctx => {
        const product = await prisma.product.findUnique({
            where: { id: ctx.query.id as string },
            include: { seller: true }
        })

        return {
            props: {
                product: {
                    ...product,
                    createdAt: moment(product?.createdAt).format('MM-DD-YYYY'),
                    updatedAt: moment(product?.updatedAt).format('MM-DD-YYYY'),
                    seller: {
                        ...product?.seller,
                        createdAt: moment(product?.seller.createdAt).format('MM-DD-YYYY'),
                        updatedAt: moment(product?.seller.updatedAt).format('MM-DD-YYYY')
                    }
                }
            }
        }
    }
})

const ProductCatalogPage = (props: ProtectionReturn) => {
    const { permissions, product } = props

    return (
        <UserLayout permissions={permissions}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={5} lg={4}>
                    <ProductViewLeft product={product} />
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <ProductViewRight product={product} />
                </Grid>
            </Grid>
        </UserLayout>
    )
}

export default ProductCatalogPage
