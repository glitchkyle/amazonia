// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useUser } from '@auth0/nextjs-auth0/client'
import options from 'src/configs'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

// Verifies that user is authenticted
const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady || isLoading) return

      if (!user) {
        // If there is no user and no stored user data
        if (router.asPath !== '/') {
          // If user is trying to access auth protected page, redirect to login

          router.replace({
            pathname: `/api/auth/login`,
            query: { returnTo: router.asPath }
          })
        } else {
          // If guest is trying to access root page, redirect to default page
          router.replace(options.rootUrl)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, user, isLoading]
  )

  if (isLoading || user === null) return fallback

  return <>{children}</>
}

export default AuthGuard
