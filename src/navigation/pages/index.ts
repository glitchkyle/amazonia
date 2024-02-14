import { getSession } from '@auth0/nextjs-auth0'
import { jwtDecode } from 'jwt-decode'
import { InferGetServerSidePropsType, NextPageContext } from 'next/types'
import { DecodedAccessToken, UserPermission } from 'src/types/auth'

/**
 * interface ProtectionProps
 *
 * `authorizedPerms: UserPermission[]`
 * Permissions authorized to access this page.
 * (Default) undefined - page can be accessed by anyone regardless of permissions.
 *
 * `returnPath: string`
 * Return URL after the user successfully authenticates.
 * (Default) undefined - page can be accessed publicly
 */
interface ProtectionProps {
  authorizedPerms?: UserPermission[]
  returnPath?: string
}

export const ProtectPage = (props: ProtectionProps) => {
  return async (ctx: NextPageContext) => {
    const session = await getSession(ctx.req, ctx.res)
    if (session) {
      const { user, accessToken } = session

      if (!accessToken) throw new Error('No access token')

      const decodedToken = jwtDecode(accessToken) as DecodedAccessToken
      const { aud, permissions } = decodedToken

      if (!aud) throw new Error('No audience in access token')

      const audiences = aud as string[]
      const serverAudience = process.env.AUTH0_AUDIENCE

      if (!serverAudience) throw new Error('No server audience')

      // Verify token audience claims
      if (!audiences.includes(serverAudience)) throw new Error('Unauthorized')

      if (props.authorizedPerms) {
        if (!permissions) throw new Error('Unauthorized')

        // Check if user is permitted to access this page
        const permitted = props.authorizedPerms.some(permission => permissions.includes(permission))
        if (!permitted) throw new Error('Unauthorized')
      }

      return { props: { user, permissions } }
    } else if (props.returnPath) {
      return {
        redirect: {
          destination: `/api/auth/login?returnTo=${props.returnPath}`,
          permanent: false
        }
      }
    }

    return { props: {} }
  }
}

export type ProtectionReturn = InferGetServerSidePropsType<typeof ProtectPage>
