import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Product } from '@prisma/client'

const Item = ({ product }: { product: Product }) => (
  <Card
    sx={{ maxWidth: 345 }}
    onClick={() => {
      console.log('Test')
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

const ItemCatalog = ({ products }: { products: Product[] }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product, idx) => (
        <Grid item xs={3} key={idx}>
          <Item product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ItemCatalog
