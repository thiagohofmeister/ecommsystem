import { useCallback } from 'react'

import { Attribute } from '../../../models/Attribute'
import { ListResponse } from '../models/ListResponse'
import { AttributeCreateResponse } from './models/AttributeCreateResponse'
import { AttributeGetListResponse } from './models/AttributeGetListResponse'

export const useAttributeFormatter = () => {
  const format = useCallback<
    (apiEntity: AttributeCreateResponse | AttributeGetListResponse) => Attribute
  >(
    apiEntity => ({
      id: apiEntity.id,
      label: apiEntity.label,
      values: apiEntity.values
    }),
    []
  )

  const formatList = useCallback<
    (response: ListResponse<AttributeGetListResponse>) => ListResponse<Attribute>
  >(
    response => ({
      items: response.items.map((item: AttributeGetListResponse) => format(item)),
      total: response.total
    }),
    [format]
  )

  return { format, formatList }
}
