import { Attribute } from 'models/Attribute'
import { useCallback } from 'react'

import { AttributeCreateRequest } from './models/AttributeCreateRequest'

export const useAttributeParser = () => {
  const parseCreate = useCallback<(brand: Attribute) => AttributeCreateRequest>(brand => {
    return {
      label: brand.label,
      values: brand.values
    }
  }, [])

  const parseUpdate = useCallback<(brand: Attribute) => Partial<AttributeCreateRequest>>(brand => {
    return {
      values: brand.values,
      label: brand.label
    }
  }, [])

  return {
    parseCreate,
    parseUpdate
  }
}
