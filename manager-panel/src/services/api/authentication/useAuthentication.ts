import * as base64 from 'base-64'
import { useCallback } from 'react'

import { axiosInstance } from '../axios'

export const useAuthentication = () => {
  const instance = axiosInstance(false)
  const endpoint = 'authentication'

  const auth = useCallback(
    async (login: string, password: string) => {
      return (
        await instance.post(`${endpoint}`, null, {
          headers: {
            authorization: `Basic ${base64.encode(`${login}:${password}`)}`
          }
        })
      ).data
    },
    [instance]
  )

  return {
    endpoint,
    auth
  }
}
