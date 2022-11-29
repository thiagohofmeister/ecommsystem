import { makeStyles, ThemeOptions } from '@material-ui/core'
import classNames from 'classnames'
import { TableProviderProps, TableProviderType, useTableContext } from 'providers/TableProvider'
import { useCallback, useState } from 'react'

import { ActivityIndicator } from '../ActivityIndicator'
import { PanelMessage } from '../PanelMessage'
import { TableRow } from './TableRow'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      '&__header': {
        backgroundColor: theme.table?.header?.backgroundColor || '#f2f4f3',
        lineHeight: '18px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 30px',
        paddingRight: '100px'
      },

      '&__header-grid': {
        display: 'grid',
        flex: '1'
      },

      '&__checkbox': {
        display: 'flex',
        alignItems: 'center',
        marginRight: '13px'
      },

      '&__body': {
        position: 'relative'
      },

      '&__column-title': {
        color: theme.table?.body?.column?.color || '#a9aaaa',
        fontSize: '14px'
      },

      '&__empty, &__error': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 380px)'
      },

      '&__loading': {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '100%',
        height: '100%'
      },

      panelMessage: {
        height: 'calc(100vh - 392px)',
        '&__empty': {
          '&-message': {
            color: '#ccc',
            fontSize: '14px',
            marginTop: '10px'
          }
        },

        '&__error': {
          '&-retry': {
            color: 'green',
            fontSize: '14px',
            marginTop: '20px',

            '&:hover ': {
              transition: '0.3s',
              cursor: 'pointer',
              textDecoration: 'underline'
            }
          }
        }
      },

      unexpectedError: {
        height: 'calc(100vh - 392px)'
      }
    }
  }),
  { name: 'Table' }
)

const TableComponent: React.FC = <Item extends any>() => {
  const classes = useStyles()
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const props = useTableContext<Item>()

  // const toggleAllRows = useCallback<(checked: boolean) => void>(
  //   checked => {
  //     setSelectedRows(checked ? props.items!.map((_, index) => index) : [])
  //   },
  //   [props.items]
  // )

  const toggleRow = useCallback<(checked: boolean, index: number) => void>((checked, index) => {
    setSelectedRows(rows => (checked ? rows.concat(index) : rows.filter(i => i !== index)))
  }, [])

  // const selectedItems = useMemo<Item[]>(
  //   () => selectedRows.map(index => props.items![index]),
  //   [selectedRows, props.items]
  // )

  return (
    <div className={classes.root}>
      <div className={classNames(`${classes.root}__header`)}>
        {/* <div className={`${classes.root}__checkbox`}>
          <Checkbox
            checked={!!props.items?.length && props.items.length === selectedRows.length}
            onChange={toggleAllRows}
          />
        </div> */}

        <div
          className={`${classes.root}__header-grid`}
          style={{
            gridTemplateColumns: props.gridTemplateColumns
          }}>
          {props.columns.map((label, index) =>
            typeof label === 'string' ? (
              <span key={label} className={`${classes.root}__column-title`}>
                {label}
              </span>
            ) : (
              <div key={index} className={`${classes.root}__column-title`}>
                {label}
              </div>
            )
          )}
        </div>
      </div>

      {props.error && <div className={`${classes.root}__error`}>Error</div>}
      {!props.error && (
        <div className={`${classes.root}__body`}>
          {props.items.map((item, index) => {
            const selected: boolean = selectedRows.includes(index)

            return (
              <TableRow
                key={index}
                selected={selected}
                toggleRow={checked => toggleRow(checked, index)}
                item={item}
              />
            )
          })}
          {!props.items?.length && (
            <div className={`${classes.root}__empty`}>
              {!props.isLoading && (
                <PanelMessage
                  title="Sua pesquisa não encontrou nenhum resultado."
                  subTitle="Tente alterar os filtros ou o termo de pesquisa"
                />
              )}
            </div>
          )}
          {props.isLoading && (
            <div className={`${classes.root}__loading`}>
              <ActivityIndicator center />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export const Table: React.FC<TableProps> = <Item extends any>({
  provider: Provider,
  ...props
}: TableProps<Item>) => (
  <Provider {...props}>
    <TableComponent />
  </Provider>
)

type TableProps<Item = any> = TableProviderProps<Item> & {
  provider: TableProviderType<Item>
}
