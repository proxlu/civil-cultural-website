/* ----------- RESOURCES ----------- */
import axios from 'axios'

import { HttpException } from 'Utils/HtttpException'

export async function useAuthApi(deleted: boolean = false) {


  /*   if (deleted && tokenApi)
        deleteTokenApi()

    if (tokenApi)
        return tokenApi */

    const uri = process.env.NEXT_PUBLIC_URL_API
    const response = await axios.post(
        `${uri}/auth/login`,
        {
            email: process.env.NEXT_PUBLIC_API_USER,
            password: process.env.NEXT_PUBLIC_API_PASSWORD
        }
    )

    if (response.status !== 200)
        throw new HttpException(response.data.message, response.status, response.statusText)

    /* setTokenApi(
        response.data,
        {
            domain: process.env.COOKIE_DOMAIN,
            expires: 360 * 24 * 60 * 60 // 1 year
        }
    ) */
    return response.data
}