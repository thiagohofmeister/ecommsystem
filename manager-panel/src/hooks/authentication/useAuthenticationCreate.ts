import cookie from 'js-cookie'
import { Authentication } from 'models/Authentication'
import { useCallback, useMemo } from 'react'
import { useMutation, UseMutationOptions } from 'react-query'
import { useAuthentication } from 'services/api/authentication/useAuthentication'
import { useAuthenticationFormatter } from 'services/api/authentication/useAuthenticationFormatter'

export const useAuthenticationCreate = (
  options?: UseMutationOptions<Authentication, unknown, TVariables>
) => {
  const { endpoint, auth } = useAuthentication()
  const { format } = useAuthenticationFormatter()

  const mutationKey = useMemo(() => [endpoint], [endpoint])

  const mutationFn = useCallback(
    async (user: TVariables) => {
      const response = await auth(user?.data!, user?.password!)

      return format(response)
    },
    [auth, format]
  )

  const mutation = useMutation<Authentication, unknown, TVariables>(mutationKey, mutationFn, {
    onError: () => {
      cookie.remove('token')
      window.location.href = '/login'
    },
    onSuccess: (data, variables, context) => {
      cookie.set('token', data.authToken)

      options?.onSuccess?.(data, variables, context)

      const params = new URLSearchParams(window.location.search)

      window.location.href = params.get('redirect') || '/'
    }
  })

  return mutation
}

interface TVariables {
  data: string
  password: string
}
