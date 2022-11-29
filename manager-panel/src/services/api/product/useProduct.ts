import { useCallback } from 'react'

import { axiosInstance } from '../axios'
import { QueryParams } from '../models/QueryParams'

export const useProduct = () => {
  const instance = axiosInstance()
  const endpoint = 'product'

  const getList = useCallback(
    async (query?: QueryParams) => await (await instance.get(`${endpoint}`)).data,
    [instance]
  )

  return {
    endpoint,
    getList
  }
}
