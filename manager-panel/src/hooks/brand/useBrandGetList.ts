import { Brand } from 'models/Brand'
import { useCallback, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { useBrand } from 'services/api/brand/useBrand'
import { useBrandFormatter } from 'services/api/brand/useBrandFormatter'
import { ListResponse } from 'services/api/models/ListResponse'
import { QueryParams } from 'services/api/models/QueryParams'

export const useBrandGetList = (queryParams: QueryParams, options?: UseQueryOptions<Response>) => {
  const { endpoint, getList } = useBrand()
  const { formatList } = useBrandFormatter()

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

type Response = ListResponse<Brand>
