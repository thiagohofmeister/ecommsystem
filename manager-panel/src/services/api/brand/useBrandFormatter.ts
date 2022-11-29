import { useCallback } from 'react'

import { Brand } from '../../../models/Brand'
import { ListResponse } from '../models/ListResponse'
import { BrandCreateResponse } from './models/BrandCreateResponse'
import { BrandGetListResponse } from './models/BrandGetListResponse'

export const useBrandFormatter = () => {
  const format = useCallback<(apiEntity: BrandCreateResponse | BrandGetListResponse) => Brand>(
    apiEntity => ({
      id: apiEntity.id,
      description: apiEntity.description,
      label: apiEntity.label,
      urn: apiEntity.urn
    }),
    []
  )

  const formatList = useCallback<
    (response: ListResponse<BrandGetListResponse>) => ListResponse<Brand>
  >(
    response => ({
      items: response.items.map((item: BrandGetListResponse) => format(item)),
      total: response.total
    }),
    [format]
  )

  return { format, formatList }
}
