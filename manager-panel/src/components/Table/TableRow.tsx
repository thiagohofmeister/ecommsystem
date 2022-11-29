import { makeStyles, ThemeOptions } from '@material-ui/core'
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp'
import classNames from 'classnames'
import Dropdown from 'components/Dropdown'
import { useTableContext } from 'providers/TableProvider'
import { useTableRowContext } from 'providers/TableRowProvider'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { TableColumn } from './TableColumn'
import { TableRowAction } from './TableRowAction/TableRowAction'
import { TableRowLoader } from './TableRowLoader'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      display: 'flex',
      padding: '10px 30px',
      paddingRight: '100px',
      position: 'relative',
      minHeight: '64px',
      alignItems: 'center',
      transition: 'background-color 0.3s',
      borderBottom: `1px solid ${theme.table?.body?.row?.borderBottomColor}`,

      '&:hover': {
        backgroundColor: theme.table?.body?.row?.hoverBackgroundColor,

        '& $tableRowActions': {
          display: 'flex',
          alignItems: 'center'
        }
      },

      '&--selected': {
        backgroundColor: theme.table?.body?.row?.selectedBackgroundColor
      },

      '&--has-click': {
        cursor: 'pointer'
      },

      '&--disabled': {
        backgroundColor: theme.table?.body?.row?.disabledBackgroundColor,

        '& div': {
          color: theme.table?.body?.row?.disabledColor
        }
      },

      '&--grid': {
        display: 'grid',
        flex: 1
      }
    },
    tableRowActions: {
      position: 'absolute',
      right: '30px',
      top: '0',
      height: '100%',
      display: 'none',
      transition: '0.3s',
      cursor: 'pointer'
    }
  }),
  { name: 'TableRow' }
)

const TableRowComponent: FC<TableRowProps> = <Item extends any>({
  selected,
  toggleRow
}: TableRowProps<Item>) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const row = useTableRowContext()
  const { gridTemplateColumns } = useTableContext<Item>()

  return (
    <div
      className={classNames(classes.root, {
        [`${classes.root}--selected`]: selected,
        [`${classes.root}--disabled`]: row.disabled,
        [`${classes.root}--has-click`]: !!row.actions?.EDIT
      })}
      onDoubleClick={() => {
        if (row.actions?.EDIT) {
          return navigate(row.actions.EDIT.link)
        }
      }}>
      <TableRowLoader active={row.isLoading} />
      {/* <div className="table__checkbox">
        <Checkbox checked={selected} onChange={checked => toggleRow(checked)} />
      </div> */}

      <div className={`${classes.root}--grid`} style={{ gridTemplateColumns }}>
        {row.columns.map(({ data }, index) => {
          return <TableColumn key={index}>{data}</TableColumn>
        })}

        {row.actions && (
          <div className={classes.tableRowActions}>
            <Dropdown openByHover icon={<MoreVertSharpIcon />}>
              {(Object.keys(row.actions) as TableRowActionType[]).map(actionType => (
                <TableRowAction key={actionType} actionType={actionType} actions={row.actions!} />
              ))}
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  )
}

export const TableRow: FC<TableRowProps> = <Item extends any>(props: TableRowProps<Item>) => {
  const { rowProvider } = useTableContext<Item>()

  const Provider = rowProvider(props.item)

  const { providerProps } = props

  return (
    <Provider {...providerProps}>
      <TableRowComponent {...props} />
    </Provider>
  )
}

type TableRowProps<Item = any> = {
  item: Item
  selected: boolean
  toggleRow: (checked: boolean) => void
  providerProps?: any
}

interface IAction {
  label?: string
}

interface IActionWithLink extends IAction {
  link: string
}

interface IActionWithCallback extends IAction {
  action: () => void
}

export enum TableRowActionType {
  ACTIVATE = 'ACTIVATE',
  DEACTIVATE = 'DEACTIVATE',
  DELETE = 'DELETE',
  DUPLICATE = 'DUPLICATE',
  EDIT = 'EDIT',
  DETAIL = 'DETAIL',
  ADD_WITH_LINK = 'ADD_WITH_LINK',
  ADD_WITH_ACTION = 'ADD_WITH_ACTION'
}

interface RowActionPayload {
  [TableRowActionType.ACTIVATE]: IActionWithCallback
  [TableRowActionType.DEACTIVATE]: IActionWithCallback
  [TableRowActionType.DELETE]: IActionWithCallback
  [TableRowActionType.DUPLICATE]: IActionWithCallback
  [TableRowActionType.DETAIL]: IActionWithCallback
  [TableRowActionType.EDIT]: IActionWithLink
  [TableRowActionType.ADD_WITH_LINK]: IActionWithLink
  [TableRowActionType.ADD_WITH_ACTION]: IActionWithCallback
}

export type RowAction = {
  [key in TableRowActionType]?: RowActionPayload[key]
}
