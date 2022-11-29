import { User } from 'models/User'
import { useCallback, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { useUser } from 'services/api/user/useUser'
import { useUserFormatter } from 'services/api/user/useUserFormatter'

export const useUserLogged = (options?: UseQueryOptions<Response>) => {
  const { endpoint, getMe } = useUser()
  const { format } = useUserFormatter()

  const queryKey = useMemo(() => [endpoint], [endpoint])

  const queryFn = useCallback<() => Promise<Response>>(async () => {
    const response = await getMe()

    return format(response)
  }, [getMe, format])

  const query = useQuery<Response>({
    ...options,
    queryKey,
    queryFn
  })

  return query
}

type Response = User
