import { Attribute } from 'models/Attribute'
import { useCallback, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { useAttribute } from 'services/api/attribute/useAttribute'
import { useAttributeFormatter } from 'services/api/attribute/useAttributeFormatter'
import { ListResponse } from 'services/api/models/ListResponse'
import { QueryParams } from 'services/api/models/QueryParams'

export const useAttributeGetList = (
  queryParams: QueryParams,
  options?: UseQueryOptions<Response>
) => {
  const { endpoint, getList } = useAttribute()
  const { formatList } = useAttributeFormatter()

  const queryKey = useMemo(() => [endpoint, queryParams], [endpoint, queryParams])

  const queryFn = useCallback<() => Promise<Response>>(async () => {
    const response = await getList(queryParams)

    return formatList(response)
  }, [getList, formatList, queryParams])

  const query = useQuery<Response>({
    ...options,
    queryKey,
    queryFn
  })

  return query
}

type Response = ListResponse<Attribute>
