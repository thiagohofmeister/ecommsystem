import { FC, PropsWithChildren } from 'react'
import { BrandGetListResponse } from 'services/api/brand/models/BrandGetListResponse'

import { TableProvider, TableProviderProps } from '../TableProvider'
import { BrandRowProvider } from './BrandRowProvider'

export const BrandTableProvider: FC<BrandTableProviderProps> = ({ children, ...props }) => {
  return (
    <TableProvider
      {...props}
      gridTemplateColumns="1fr 1fr"
      columns={['Marca', 'URN']}
      rowProvider={brand => props => <BrandRowProvider {...props} item={brand} />}>
      {children}
    </TableProvider>
  )
}

type BrandTableProviderProps = TableProviderProps<BrandGetListResponse> & PropsWithChildren
