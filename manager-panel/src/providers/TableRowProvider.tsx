import { IListColumn } from 'components/List'
import { RowAction } from 'components/Table/TableRow'
import { createContext, FC, PropsWithChildren, useContext } from 'react'
import { useErrorHandler } from 'react-error-boundary'

export type TableRowProviderProps<Item = any> = {
  item: Item
}

export type TableRowProviderType = FC

export type TableRowStore = {
  columns: IListColumn[]
  actions?: RowAction
  isLoading?: boolean
  disabled?: boolean
}

export const TableRowContext = createContext<TableRowStore | undefined>(undefined)

export function useTableRowContext() {
  const handleError = useErrorHandler()
  const context = useContext<TableRowStore | undefined>(TableRowContext)

  if (context === undefined) {
    throw handleError('useTableRowContext can only be used inside TableRowProvider')
  }

  return context
}

export const TableRowProvider: FC<TableRowStore & PropsWithChildren> = ({ children, ...store }) => {
  return <TableRowContext.Provider value={store}>{children}</TableRowContext.Provider>
}
