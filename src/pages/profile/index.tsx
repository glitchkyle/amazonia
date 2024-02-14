import { Grid } from '@mui/material'

import UserProfileHeader from 'src/views/pages/profile/UserProfileHeader'
import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'

export const getServerSideProps = ProtectPage({
  returnPath: '/profile'
})

const ProfilePage = (props: ProtectionReturn) => {
  const { user, permissions } = props

  return (
    <UserLayout permissions={permissions}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <UserProfileHeader user={user} />
        </Grid>
      </Grid>
    </UserLayout>
  )
}

export default ProfilePage
