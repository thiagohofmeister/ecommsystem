import { useBrandGetById } from 'hooks/brand/useBrandGetById'
import { useEditBrandForm, useEditBrandMutation } from 'providers/brand/BrandEditProvider'
import { useEffect } from 'react'

import { useBrandDataForm } from './useBrandDataForm'

export const useBrandData = () => {
  const controllers = useBrandDataForm()

  const { isLoading } = useEditBrandMutation()

  const { getValues, setValue } = useEditBrandForm()

  const { data } = useBrandGetById(getValues('id'), {
    suspense: true
  })

  useEffect(() => {
    if (!!data) {
      setValue('label', data.label)
      setValue('description', data.description)
      setValue('urn', data.urn)
    }
  }, [data, setValue])

  return {
    isLoading,
    controllers
  }
}
