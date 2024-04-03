// ** Demo Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ItemCatalog from 'src/views/pages/catalog/ItemCatalog'
import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'
import prisma from 'src/lib/prisma'
import moment from 'moment'

export const getServerSideProps = ProtectPage({
    callback: async () => {
        const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })

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

const CatalogPage = (props: ProtectionReturn) => {
    const { permissions, products } = props

    return (
        <UserLayout permissions={permissions}>
            <ApexChartWrapper>
                <KeenSliderWrapper>
                    <ItemCatalog products={products} />
                </KeenSliderWrapper>
            </ApexChartWrapper>
        </UserLayout>
    )
}

export default CatalogPage
