import { createContext, FC, PropsWithChildren, useContext } from 'react'
import { useErrorHandler } from 'react-error-boundary'

import { TableRowProviderType } from './TableRowProvider'

export type TableProviderProps<Item> = {
  items: Item[]
  isLoading?: boolean
  onExecuteAction?: () => void
  error?: boolean
  retry?: () => void
}

export type TableProviderType<Item> = FC<TableProviderProps<Item>>

export type TableStore<Item = any> = {
  gridTemplateColumns: string
  columns: React.ReactNode[]
  items: Item[]
  rowProvider: (item: Item) => TableRowProviderType
  isLoading?: boolean
  onExecuteAction?: () => void
  error?: boolean
  retry?: () => void
}

export const TableContext = createContext<TableStore | undefined>(undefined)

export function useTableContext<Item = any>() {
  const handleError = useErrorHandler()
  const context = useContext<TableStore<Item> | undefined>(TableContext)

  if (context === undefined) {
    throw handleError('useTableContext can only be used inside TableProvider')
  }

  return context
}

export const TableProvider = <Item extends any>({
  children,
  ...store
}: PropsWithChildren<TableStore<Item>>) => {
  return <TableContext.Provider value={store}>{children}</TableContext.Provider>
}
