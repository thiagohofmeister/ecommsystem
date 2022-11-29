import { Brand } from 'models/Brand'
import { useCallback } from 'react'

import { BrandCreateRequest } from './models/BrandCreateRequest'

export const useBrandParser = () => {
  const parseCreate = useCallback<(brand: Brand) => BrandCreateRequest>(brand => {
    return {
      label: brand.label,
      description: brand.description,
      urn: brand.urn
    }
  }, [])

  const parseUpdate = useCallback<(brand: Brand) => Partial<BrandCreateRequest>>(brand => {
    return {
      description: brand.description,
      label: brand.label,
      urn: brand.urn
    }
  }, [])

  return {
    parseCreate,
    parseUpdate
  }
}
