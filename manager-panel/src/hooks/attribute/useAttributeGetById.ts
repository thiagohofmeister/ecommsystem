import { Attribute } from 'models/Attribute'
import { useCallback, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { useAttribute } from 'services/api/attribute/useAttribute'
import { useAttributeFormatter } from 'services/api/attribute/useAttributeFormatter'

export const useAttributeGetById = (
  id: string | undefined,
  options?: Partial<UseQueryOptions<Response>>
) => {
  const { endpoint, getById } = useAttribute()
  const { format } = useAttributeFormatter()

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

type Response = Attribute
