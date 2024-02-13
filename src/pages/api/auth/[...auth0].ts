import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0'

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: 'https://api.amazonia.com/market',
      scope: 'openid email profile create:products delete:products read:orders create:orders delete:orders'
    }
  }),
  logout: handleLogout({
    returnTo: '/catalog'
  })
})
