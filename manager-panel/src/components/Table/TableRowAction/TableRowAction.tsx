import { FC, Fragment } from 'react'

import { RowAction, TableRowActionType } from '../TableRow'
import { Activate } from '../TableRowAction/Activate'
import { Deactivate } from '../TableRowAction/Deactivate'
import { Delete } from '../TableRowAction/Delete'
import { Detail } from '../TableRowAction/Detail'
import { Duplicate } from '../TableRowAction/Duplicate'
import { Edit } from '../TableRowAction/Edit'
import { AddWithAction } from './AddWithAction'
import { AddWithLink } from './AddWithLink'

export const TableRowAction: FC<TableRowActionProps> = ({ actionType, actions }) => {
  switch (actionType) {
    case TableRowActionType.DUPLICATE:
      return (
        <Duplicate
          onClick={actions[actionType]!.action}
          label={actions[actionType]!.label || 'Duplicar'}
        />
      )

    case TableRowActionType.ACTIVATE:
      return (
        <Activate
          onClick={actions[actionType]!.action}
          label={actions[actionType]!.label || 'Ativar'}
        />
      )

    case TableRowActionType.DEACTIVATE:
      return (
        <Deactivate
          onClick={actions[actionType]!.action}
          label={actions[actionType]!.label || 'Desativar'}
        />
      )

    case TableRowActionType.DELETE:
      return (
        <Delete
          onClick={actions[actionType]!.action}
          label={actions[actionType]!.label || 'Remover'}
        />
      )

    case TableRowActionType.EDIT:
      return (
        <Edit link={actions[actionType]!.link} label={actions[actionType]!.label || 'Editar'} />
      )

    case TableRowActionType.DETAIL:
      return (
        <Detail
          onClick={actions[actionType]!.action}
          label={actions[actionType]!.label || 'Visualizar'}
        />
      )

    case TableRowActionType.ADD_WITH_LINK:
      return (
        <AddWithLink
          link={actions[actionType]!.link}
          label={actions[actionType]!.label || 'Adicionar'}
        />
      )

    case TableRowActionType.ADD_WITH_ACTION:
      return (
        <AddWithAction
          onClick={actions[actionType]!.action}
          label={actions[actionType]!.label || 'Adicionar'}
        />
      )

    default:
      return <Fragment key={actionType} />
  }
}

type TableRowActionProps = {
  actionType: TableRowActionType
  actions: RowAction
}
