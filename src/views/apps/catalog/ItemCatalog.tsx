import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const Item = () => (
  <Card
    sx={{ maxWidth: 345 }}
    onClick={() => {
      console.log('Test')
    }}
  >
    <CardMedia
      sx={{ height: 140 }}
      image='https://seeklogo.com/images/A/auth0-logo-CB96B17A7D-seeklogo.com.png'
      title='green iguana'
    />
    <CardContent>
      <Typography gutterBottom variant='h5' component='div'>
        Item Name
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dignissim diam. Nam hendrerit risus sit amet
        enim tincidunt maximus.
      </Typography>
    </CardContent>
  </Card>
)

const ItemCatalog = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
    </Grid>
  )
}

export default ItemCatalog
