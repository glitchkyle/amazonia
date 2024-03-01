import moment from 'moment'

import { GetStaticPropsContext } from 'next/types'

import { Grid } from '@mui/material'

import db from 'src/configs/db'

import { ProtectionReturn } from 'src/navigation/pages'

import UserLayout from 'src/layouts/UserLayout'

import ProductViewLeft from 'src/views/pages/catalog/ProductViewLeft'
import ProductViewRight from 'src/views/pages/catalog/ProductViewRight'

export async function getStaticPaths() {
  const products = await db.product.findMany({ orderBy: { createdAt: 'desc' } })

  const paths = products.map(product => {
    return {
      params: {
        id: product.id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params) return { props: {} }
  const product = await db.product.findUnique({ where: { id: params.id as string }, include: { seller: true } })

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

const ProductCatalogPage = (props: ProtectionReturn) => {
  const { product } = props

  return (
    <UserLayout>
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
