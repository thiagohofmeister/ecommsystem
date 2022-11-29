import { Brand } from 'models/Brand'
import { useController } from 'react-hook-form'

export const useBrandDataForm = () => {
  const label = useController<Brand, 'label'>({
    name: 'label'
  })
  const urn = useController<Brand, 'urn'>({
    name: 'urn'
  })
  const description = useController<Brand, 'description'>({
    name: 'description'
  })

  return {
    label,
    urn,
    description
  }
}
