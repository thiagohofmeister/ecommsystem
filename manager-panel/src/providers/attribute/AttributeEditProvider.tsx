import { joiResolver } from '@hookform/resolvers/joi'
import { useAttributeGetById } from 'hooks/attribute/useAttributeGetById'
import { useAttributeSave } from 'hooks/attribute/useAttributeSave'
import Joi from 'joi'
import { Attribute } from 'models/Attribute'
import { EditProvider } from 'providers/EditProvider'
import { useMutationContext } from 'providers/MutationProvider'
import { FC, PropsWithChildren, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import attributeRoute from 'routes/attributeRoute'

const AttributeEditProvider: FC<PropsWithChildren> = ({ children }) => {
  const { id } = useParams<{ id: string | undefined }>()
  const navigate = useNavigate()

  const [immutableData, setImmutableData] = useState<Attribute>({
    id,
    label: '',
    values: []
  })

  useAttributeGetById(id, {
    useErrorBoundary: true,
    onSuccess: setImmutableData
  })

  const mutation = useAttributeSave(id, {
    onSuccess: mutatedData => {
      if (!id && !!mutatedData?.id) {
        navigate(attributeRoute.items.list.path)
      }
    }
  })

  const form = useForm<Attribute>({
    defaultValues: immutableData,
    resolver: joiResolver(
      Joi.object({
        id: Joi.string(),
        label: Joi.string().required().messages({
          'string.empty': 'Campo de preenchimento obrigatório'
        }),
        values: Joi.array().items(Joi.string().required())
      })
    )
  })

  return (
    <EditProvider form={form} mutation={mutation} immutableData={immutableData}>
      {children}
    </EditProvider>
  )
}

const useEditAttributeForm = () => useFormContext<Attribute>()

const useEditAttributeMutation = () => useMutationContext<Attribute, unknown, Attribute, unknown>()

export { useEditAttributeMutation, useEditAttributeForm, AttributeEditProvider }
