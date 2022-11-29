import { useCallback } from 'react'

import { Product } from '../../../models/Product'
import { ListResponse } from '../models/ListResponse'
import { ProductGetListResponse } from './models/ProductGetListResponse'
import { ProductGetOneResponse } from './models/ProductGetOneResponse'

export const useProductFormatter = () => {
  const format = useCallback<(apiEntity: ProductGetOneResponse) => Product>(
    apiEntity => ({
      title: apiEntity.title
    }),
    []
  )

  const formatList = useCallback<
    (response: ListResponse<ProductGetListResponse>) => ListResponse<Product>
  >(
    response => ({
      items: response.items.map((item: ProductGetListResponse) => format(item)),
      total: response.total
    }),
    [format]
  )

  return { format, formatList }
}
