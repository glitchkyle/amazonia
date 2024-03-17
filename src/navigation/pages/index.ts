import { getSession } from '@auth0/nextjs-auth0'
import { User } from '@prisma/client'
import { jwtDecode } from 'jwt-decode'
import { InferGetServerSidePropsType, NextPageContext } from 'next/types'
import db from 'src/configs/db'
import { DecodedAccessToken, UserPermission } from 'src/types/auth'

/**
 * interface ProtectionProps
 *
 * @param requiredPerms
 * UserPermission[] - Permissions authorized to access this page.
 * (Default) undefined - page can be accessed by anyone regardless of permissions.
 *
 * @param returnPath
 * string - Return URL after the user successfully authenticates. This is usually the page route.
 * (Default) undefined - page can be accessed without authenticating.
 *
 * @param callback
 * function - Callback to run server-side before executing any authorization and authentication processes
 * (Default) undefined
 */
interface ProtectionProps {
  requiredPerms?: UserPermission[]
  returnPath?: string
  callback?: (context: NextPageContext, app_user: User | null) => Promise<{ props: { [key: string]: unknown } }>
}

/**
 * function ProtectPage
 *
 * Middleware server-side function that should be executed before rendering
 * a page to authenticate and authorize the user, if necessary.
 *
 * Authentication and authorization will be required if specified
 * in the `ProtectionProps` parameter.
 *
 * @param params ProtectionProps
 * @returns getServerSideProps function
 */
export const ProtectPage = (params: ProtectionProps) => {
  return async (ctx: NextPageContext) => {
    const { requiredPerms, returnPath, callback } = params

    // Get Auth0 session
    const session = await getSession(ctx.req, ctx.res)

    let cbProps = {}
    if (callback) {
      try {
        if (session?.user) {
          const user = await db.user.findUnique({ where: { email: session.user.email } })
          const { props } = await callback(ctx, user)
          cbProps = { ...props }
        } else {
          const { props } = await callback(ctx, null)
          cbProps = { ...props }
        }
      } catch (err: any) {
        if (err.message === 'Unauthenticated') {
          return {
            redirect: {
              destination: `/401`,
              permanent: false
            }
          }
        } else {
          return {
            redirect: {
              destination: `/500`,
              permanent: false
            }
          }
        }
      }
    }

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
            destination: `/403`,
            permanent: false
          }
        }

      // If page is restricted to certain permissions
      if (requiredPerms) {
        if (!permissions)
          return {
            redirect: {
              destination: `/403`,
              permanent: false
            }
          }

        // Verify permissions (scopes)
        const permitted = requiredPerms.every(permission => permissions.includes(permission))
        if (!permitted)
          return {
            redirect: {
              destination: `/403`,
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
