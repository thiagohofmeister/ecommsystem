import { Brand } from 'models/Brand'
import { useCallback, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { useBrand } from 'services/api/brand/useBrand'
import { useBrandFormatter } from 'services/api/brand/useBrandFormatter'

export const useBrandGetById = (
  id: string | undefined,
  options?: Partial<UseQueryOptions<Response>>
) => {
  const { endpoint, getById } = useBrand()
  const { format } = useBrandFormatter()

  const queryKey = useMemo(() => [endpoint, id], [endpoint, id])

  const queryFn = useCallback<() => Promise<Response>>(async () => {
    const response = await getById(id!)

    return format(response)
  }, [getById, format, id])

  const query = useQuery<Response>({
    ...options,
    queryKey,
    queryFn,
    enabled: !!id
  })

  return query
}

type Response = Brand
