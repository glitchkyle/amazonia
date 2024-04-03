import axios from 'src/configs/axios'

export async function fetchManagementApiToken() {
    const response = await axios.request({
        method: 'POST',
        url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: `${process.env.AUTH0_CLIENT_ID}`,
            client_secret: `${process.env.AUTH0_CLIENT_SECRET}`,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
        })
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`

    return response
}

export async function getUserRoles(id: string) {
    return await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}/roles`)
}

export async function upgradeToSeller(id: string) {
    return await axios.post(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}/roles`, {
        roles: [process.env.AUTH0_SELLER_ROLE_ID]
    })
}

export async function downgradeFromSeller(id: string) {
    return await axios.delete(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}/roles`, {
        data: { roles: [process.env.AUTH0_SELLER_ROLE_ID] }
    })
}
