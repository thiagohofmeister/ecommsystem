import { useCallback } from 'react'

import { Authentication } from '../../../models/Authentication'
import { AuthenticationCreateResponse } from './models/AuthenticationCreateResponse'

export const useAuthenticationFormatter = () => {
  const format = useCallback<(apiEntity: AuthenticationCreateResponse) => Authentication>(
    apiEntity => ({
      authToken: apiEntity.authToken
    }),
    []
  )

  return { format }
}
