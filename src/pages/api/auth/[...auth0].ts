import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0'

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: process.env.AUTH0_SCOPE
    }
  }),
  logout: handleLogout({
    returnTo: '/'
  })
})
