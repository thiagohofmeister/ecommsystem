import { Box } from '@material-ui/core'
import { FC, PropsWithChildren } from 'react'
import attributeRoute from 'routes/attributeRoute'
import { AttributeGetListResponse } from 'services/api/attribute/models/AttributeGetListResponse'
import getRouteWithParams from 'utils/getRouteWithParams'

import { TableRowProvider, TableRowProviderProps } from '../TableRowProvider'

export const AttributeRowProvider: FC<AttributeRowProviderProps> = ({ children, item }) => {
  // const { open } = useModal()
  // const { mutateAsync: deleteAttribute, isLoading } = useDeleteAttribute()

  // const handleDelete = useCallback(
  //   (id: string) => {
  //     open(DeleteAttributeModal, {
  //       onDelete: () => deleteAttribute(id)
  //     })
  //   },
  //   [open, deleteAttribute]
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
              <span>{item.values.join(', ')}</span>
            </Box>
          )
        }
      ]}
      actions={{
        EDIT: {
          link: getRouteWithParams(attributeRoute.items.edit.path, { id: item.id })
        }
      }}
      isLoading={false}>
      {children}
    </TableRowProvider>
  )
}

type AttributeRowProviderProps = TableRowProviderProps<AttributeGetListResponse> & PropsWithChildren
