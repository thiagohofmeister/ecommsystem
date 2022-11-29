import { Box } from '@material-ui/core'
import { FC, PropsWithChildren } from 'react'
import brandRoute from 'routes/brandRoute'
import { BrandGetListResponse } from 'services/api/brand/models/BrandGetListResponse'
import getRouteWithParams from 'utils/getRouteWithParams'

import { TableRowProvider, TableRowProviderProps } from '../TableRowProvider'

export const BrandRowProvider: FC<BrandRowProviderProps> = ({ children, item }) => {
  // const { open } = useModal()
  // const { mutateAsync: deleteBrand, isLoading } = useDeleteBrand()

  // const handleDelete = useCallback(
  //   (id: string) => {
  //     open(DeleteBrandModal, {
  //       onDelete: () => deleteBrand(id)
  //     })
  //   },
  //   [open, deleteBrand]
  // )

  return (
    <TableRowProvider
      columns={[
        {
          data: (
            <Box display="flex" alignItems="center" gridGap={15}>
              <span>{item.label}</span>
            </Box>
          )
        },
        {
          data: (
            <Box display="flex" alignItems="center" gridGap={15}>
              <span>{item.urn}</span>
            </Box>
          )
        }
      ]}
      actions={{
        EDIT: {
          link: getRouteWithParams(brandRoute.items.edit.path, { id: item.id })
        }
      }}
      isLoading={false}>
      {children}
    </TableRowProvider>
  )
}

type BrandRowProviderProps = TableRowProviderProps<BrandGetListResponse> & PropsWithChildren
