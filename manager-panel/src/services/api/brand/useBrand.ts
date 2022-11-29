import { useCallback } from 'react'

import { axiosInstance } from '../axios'
import { QueryParams } from '../models/QueryParams'
import { BrandCreateRequest } from './models/BrandCreateRequest'

export const useBrand = () => {
  const instance = axiosInstance()
  const endpoint = 'brand'

  const create = useCallback(
    async (brand: BrandCreateRequest) => {
      return (await instance.post(`${endpoint}`, brand)).data
    },
    [instance]
  )

  const update = useCallback(
    async (id: string, brand: Partial<BrandCreateRequest>) => {
      return (await instance.patch(`${endpoint}/${id}`, brand)).data
    },
    [instance]
  )

  const getById = useCallback(
    async (id: string) => {
      return (await instance.get(`${endpoint}/${id}`)).data
    },
    [instance]
  )

  const getList = useCallback(
    async (query: QueryParams) =>
      await (
        await instance.get(`${endpoint}`, {
          params: { ...query.filters, ...query.params }
        })
      ).data,
    [instance]
  )

  return {
    endpoint,
    create,
    update,
    getById,
    getList
  }
}
