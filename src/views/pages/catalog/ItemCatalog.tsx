import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Product } from '@prisma/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Item = ({ product }: { product: Product }) => {
  const router = useRouter()

  return (
    <Card
      sx={{ maxWidth: 345, height: 375 }}
      onClick={() => {
        router.push(`catalog/${product.id}`)
      }}
    >
      <CardMedia sx={{ height: 140 }} image={product.picture as string} />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {product.price} {product.currency}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {product.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

const ItemCatalog = ({ products }: { products: Product[] }) => {
  const [productListing] = useState<Product[]>(products)

  return (
    <>
      <Grid container spacing={4}>
        {productListing.map((product, idx) => (
          <Grid item xs={3} key={idx}>
            <Item product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ItemCatalog
