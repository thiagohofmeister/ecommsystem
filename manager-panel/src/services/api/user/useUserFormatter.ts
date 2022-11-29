import { User } from 'models/User'
import { useCallback } from 'react'

import { UserMeResponse } from './models/UserMeResponse'

export const useUserFormatter = () => {
  const format = useCallback<(apiEntity: UserMeResponse) => User>(
    apiEntity => ({
      id: apiEntity.id,
      name: apiEntity.name,
      documentNumber: apiEntity.documentNumber,
      email: apiEntity.email,
      status: apiEntity.status
    }),
    []
  )

  return { format }
}
