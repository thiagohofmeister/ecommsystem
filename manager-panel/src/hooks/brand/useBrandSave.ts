import { toastSuccess } from 'components/Toast/Toast'
import { Brand } from 'models/Brand'
import { useCallback, useMemo } from 'react'
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query'
import { useBrand } from 'services/api/brand/useBrand'
import { useBrandFormatter } from 'services/api/brand/useBrandFormatter'
import { useBrandParser } from 'services/api/brand/useBrandParser'

export const useBrandSave = (id?: string, options?: UseMutationOptions<Brand, unknown, Brand>) => {
  const queryClient = useQueryClient()
  const { endpoint, create, update } = useBrand()
  const { format } = useBrandFormatter()
  const { parseCreate, parseUpdate } = useBrandParser()

  const mutationKey = useMemo(() => [endpoint, id], [endpoint, id])

  const mutationFn = useCallback(
    async (brand: Brand) => {
      if (id) {
        return format(await update(id, parseUpdate(brand)))
      }

      return format(await create(parseCreate(brand)))
    },
    [id, create, update, format, parseUpdate, parseCreate]
  )

  const mutation = useMutation<Brand, unknown, Brand>(mutationKey, mutationFn, {
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
