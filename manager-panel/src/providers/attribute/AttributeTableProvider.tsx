import { FC, PropsWithChildren } from 'react'
import { AttributeGetListResponse } from 'services/api/attribute/models/AttributeGetListResponse'

import { TableProvider, TableProviderProps } from '../TableProvider'
import { AttributeRowProvider } from './AttributeRowProvider'

export const AttributeTableProvider: FC<AttributeTableProviderProps> = ({ children, ...props }) => {
  return (
    <TableProvider
      {...props}
      gridTemplateColumns="1fr 1fr"
      columns={['Atributo', 'Valores']}
      rowProvider={item => props => <AttributeRowProvider {...props} item={item} />}>
      {children}
    </TableProvider>
  )
}

type AttributeTableProviderProps = TableProviderProps<AttributeGetListResponse> & PropsWithChildren
