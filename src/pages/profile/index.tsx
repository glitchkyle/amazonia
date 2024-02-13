import { Grid } from '@mui/material'
import UserProfileHeader from 'src/views/pages/profile/UserProfileHeader'

const ProfilePage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader />
      </Grid>
    </Grid>
  )
}

ProfilePage.acl = {
  action: 'read',
  subject: 'profile'
}

export default ProfilePage
