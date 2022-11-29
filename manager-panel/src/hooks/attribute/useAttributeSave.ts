import { toastSuccess } from 'components/Toast/Toast'
import { Attribute } from 'models/Attribute'
import { useCallback, useMemo } from 'react'
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query'
import { useAttribute } from 'services/api/attribute/useAttribute'
import { useAttributeFormatter } from 'services/api/attribute/useAttributeFormatter'
import { useAttributeParser } from 'services/api/attribute/useAttributeParser'

export const useAttributeSave = (
  id?: string,
  options?: UseMutationOptions<Attribute, unknown, Attribute>
) => {
  const queryClient = useQueryClient()
  const { endpoint, create, update } = useAttribute()
  const { format } = useAttributeFormatter()
  const { parseCreate, parseUpdate } = useAttributeParser()

  const mutationKey = useMemo(() => [endpoint, id], [endpoint, id])

  const mutationFn = useCallback(
    async (attribute: Attribute) => {
      if (id) {
        return format(await update(id, parseUpdate(attribute)))
      }

      return format(await create(parseCreate(attribute)))
    },
    [create, format]
  )

  const mutation = useMutation<Attribute, unknown, Attribute>(mutationKey, mutationFn, {
    onError: () => {},
    onSuccess: (data, variables, context) => {
      if (id) {
        queryClient.setQueryData(mutationKey, data)
        toastSuccess('Sucesso ao atualizar marca')
        return
      }

      toastSuccess('Sucesso ao cadastrar marca')

      options?.onSuccess?.(data, variables, context)
    }
  })

  return mutation
}
