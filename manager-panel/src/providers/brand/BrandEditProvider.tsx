import { joiResolver } from '@hookform/resolvers/joi'
import { useBrandGetById } from 'hooks/brand/useBrandGetById'
import { useBrandSave } from 'hooks/brand/useBrandSave'
import Joi from 'joi'
import { Brand } from 'models/Brand'
import { EditProvider } from 'providers/EditProvider'
import { useMutationContext } from 'providers/MutationProvider'
import { FC, PropsWithChildren, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import brandRoute from 'routes/brandRoute'

const BrandEditProvider: FC<PropsWithChildren> = ({ children }) => {
  const { id } = useParams<{ id: string | undefined }>()
  const navigate = useNavigate()

  const [immutableData, setImmutableData] = useState<Brand>({
    id,
    label: '',
    description: null,
    urn: ''
  })

  useBrandGetById(id, {
    useErrorBoundary: true,
    onSuccess: setImmutableData
  })

  const mutation = useBrandSave(id, {
    onSuccess: mutatedData => {
      if (!id && !!mutatedData?.id) {
        navigate(brandRoute.items.list.path)
      }
    }
  })

  const form = useForm<Brand>({
    defaultValues: immutableData,
    resolver: joiResolver(
      Joi.object({
        id: Joi.string(),
        label: Joi.string().required().messages({
          'string.empty': 'Campo de preenchimento obrigatório'
        }),
        description: Joi.string().allow(null, ''),
        image: Joi.string().allow(null),
        urn: Joi.string().allow('')
      })
    )
  })

  return (
    <EditProvider form={form} mutation={mutation} immutableData={immutableData}>
      {children}
    </EditProvider>
  )
}

const useEditBrandForm = () => useFormContext<Brand>()

const useEditBrandMutation = () => useMutationContext<Brand, unknown, Brand, unknown>()

export { useEditBrandMutation, useEditBrandForm, BrandEditProvider }
