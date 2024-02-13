// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useUser } from '@auth0/nextjs-auth0/client'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const router = useRouter()

  const { user, isLoading } = useUser()

  useEffect(() => {
    if (!router.isReady) return

    if (window.localStorage.getItem('userData')) router.replace('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (isLoading || (!isLoading && user !== null)) return fallback

  return <>{children}</>
}

export default GuestGuard
