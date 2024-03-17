// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

import { Product } from '@prisma/client'
import { useDispatch } from 'react-redux'
import { handleAddItem } from 'src/store/apps/cart'

const UserViewLeft = ({ product }: { product: Product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(handleAddItem(product))
  }

  if (product) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                src={product.picture as string}
                variant='rounded'
                alt={product.name}
                sx={{ width: 300, height: 260, fontWeight: 600 }}
              />
              <Typography variant='h6'>{product.name}</Typography>
            </CardContent>

            <CardContent>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <Icon icon='mdi:tag' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      {product.price} {product.currency}
                    </Typography>
                    <Typography variant='body2'>Price</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant='contained' onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </Box>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Description</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(2)} !important` }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    {product.description}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
