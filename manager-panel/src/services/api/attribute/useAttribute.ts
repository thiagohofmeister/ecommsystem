import { useCallback } from 'react'

import { axiosInstance } from '../axios'
import { QueryParams } from '../models/QueryParams'
import { AttributeCreateRequest } from './models/AttributeCreateRequest'

export const useAttribute = () => {
  const instance = axiosInstance()
  const endpoint = 'attribute'

  const create = useCallback(
    async (attribute: AttributeCreateRequest) => {
      return (await instance.post(`${endpoint}`, attribute)).data
    },
    [instance]
  )

  const update = useCallback(
    async (id: string, attribute: Partial<AttributeCreateRequest>) => {
      return (await instance.patch(`${endpoint}/${id}`, attribute)).data
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
