import { createContext, FC, PropsWithChildren, useContext } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { UseMutationResult } from 'react-query'

type MutationStore<TData = any, TError = any, TVariables = any, TContext = any> = UseMutationResult<
  TData,
  TError,
  TVariables,
  TContext
>

const MutationContext = createContext<MutationStore | undefined>(undefined)

export function useMutationContext<TData, TError, TVariables, TContext>() {
  const handleError = useErrorHandler()
  const context = useContext<MutationStore<TData, TError, TVariables, TContext> | undefined>(
    MutationContext
  )

  if (context === undefined) {
    throw handleError('useMutationContext can only be used inside MutationProvider')
  }

  return context
}

export const MutationProvider: FC<
  {
    mutation: UseMutationResult<any, any, any, any>
  } & PropsWithChildren
> = ({ children, mutation }) => {
  return <MutationContext.Provider value={mutation}>{children}</MutationContext.Provider>
}
