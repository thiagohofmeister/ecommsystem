import { Product } from 'models/Product'
import { useCallback, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { ListResponse } from 'services/api/models/ListResponse'
import { QueryParams } from 'services/api/models/QueryParams'
import { useProduct } from 'services/api/product/useProduct'
import { useProductFormatter } from 'services/api/product/useProductFormatter'

export const useProductGetList = (
  queryParams?: QueryParams,
  options?: UseQueryOptions<Response>
) => {
  const { endpoint, getList } = useProduct()
  const { formatList } = useProductFormatter()

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

type Response = ListResponse<Product>
