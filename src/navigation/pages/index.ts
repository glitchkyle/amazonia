import { getSession } from '@auth0/nextjs-auth0'
import { jwtDecode } from 'jwt-decode'
import { InferGetServerSidePropsType, NextPageContext } from 'next/types'
import { DecodedAccessToken, UserPermission } from 'src/types/auth'

/**
 * interface ProtectionProps
 *
 * `requiredPerms: UserPermission[]`
 * Permissions authorized to access this page.
 * (Default) undefined - page can be accessed by anyone regardless of permissions.
 *
 * `returnPath: string`
 * Return URL after the user successfully authenticates. This is usually the page route.
 * (Default) undefined - page can be accessed publicly.
 */
interface ProtectionProps {
  requiredPerms?: UserPermission[]
  returnPath?: string
  callback?: () => Promise<{ props: { [key: string]: unknown } }>
}

export const ProtectPage = (params: ProtectionProps) => {
  return async (ctx: NextPageContext) => {
    const { requiredPerms, returnPath, callback } = params

    let cbProps = {}
    if (callback) {
      const { props } = await callback()
      cbProps = { ...props }
    }

    // Get Auth0 session
    const session = await getSession(ctx.req, ctx.res)

    if (session) {
      // If user is authenticated

      const { user, accessToken } = session

      if (!accessToken)
        return {
          redirect: {
            destination: `/500`,
            permanent: false
          }
        }

      // Perform standard JWT validation.
      const decodedToken = jwtDecode(accessToken) as DecodedAccessToken
      const { aud, permissions } = decodedToken

      if (!aud)
        return {
          redirect: {
            destination: `/500`,
            permanent: false
          }
        }

      const audiences = aud as string[]
      const serverAudience = process.env.AUTH0_AUDIENCE

      if (!serverAudience)
        return {
          redirect: {
            destination: `/500`,
            permanent: false
          }
        }

      // Verify token audience claims
      if (!audiences.includes(serverAudience))
        return {
          redirect: {
            destination: `/401`,
            permanent: false
          }
        }

      // If page is restricted to certain permissions
      if (requiredPerms) {
        if (!permissions)
          return {
            redirect: {
              destination: `/401`,
              permanent: false
            }
          }

        // Verify permissions (scopes)
        const permitted = requiredPerms.every(permission => permissions.includes(permission))
        if (!permitted)
          return {
            redirect: {
              destination: `/401`,
              permanent: false
            }
          }
      }

      return { props: { ...cbProps, user, permissions } }
    } else {
      // If user is not authenticated
      if (returnPath) {
        // If return path after authenticating is defined
        return {
          redirect: {
            destination: `/api/auth/login?returnTo=${returnPath}`,
            permanent: false
          }
        }
      }
    }

    return { props: { ...cbProps } }
  }
}

export type ProtectionReturn = InferGetServerSidePropsType<typeof ProtectPage>
