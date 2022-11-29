import { useCallback } from 'react'

import { axiosInstance } from '../axios'

export const useUser = () => {
  const instance = axiosInstance()
  const endpoint = 'user'

  const getMe = useCallback(
    async () => await (await instance.get(`${endpoint}/me`)).data,
    [instance]
  )

  return {
    endpoint,
    getMe
  }
}
