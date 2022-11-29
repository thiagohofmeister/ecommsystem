import { makeStyles } from '@material-ui/core'
import { TableProviderType } from 'providers/TableProvider'
import { useEffect } from 'react'
import { UseQueryOptions, UseQueryResult } from 'react-query'
import { ListResponse } from 'services/api/models/ListResponse'
import { DefaultQueryParams } from 'services/api/models/QueryParams'
import { QueryParamsFilter } from 'services/api/models/QueryParamsFilter'
import { useListActions, useListState } from 'store/listDuck'

import { ListPaginator } from './ListPaginator/ListPaginator'
import { Panel } from './Panel'
import { Table } from './Table/Table'

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',

      '&__footer': {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 15px'
      }
    }
  },
  {
    name: 'List'
  }
)

const List: React.FC<ListProps> = props => {
  const classes = useStyles()
  const listState = useListState()
  const { listActions, dispatch } = useListActions()

  const query = props.query(listState, {
    onSuccess: result => props.onLoadData?.(result.items)
  })

  useEffect(() => {
    if (!query.data?.items.length && !!query.data?.total && !!listState.params.page) {
      dispatch(listActions.setPagination({ page: listState.params.page - 1 }))
    }
  }, [query.data, listState, listActions, dispatch])

  return (
    <Panel>
      <div className={classes.root}>
        {props.tableProvider && (
          <Table
            provider={props.tableProvider}
            isLoading={query.isLoading || query.isFetching}
            items={query.data?.items || []}
            onExecuteAction={query.refetch}
            error={!!query.error}
            retry={query.refetch}
          />
        )}

        {!!query.data?.items.length && !query.error && (
          <div className={`${classes.root}__footer`}>
            <div className={`${classes.root}__items-count`}>{query.data!.total} registros</div>
            <ListPaginator
              total={query.data!.total}
              currentPage={listState.params.page || 1}
              onChange={(page: number, size: number) =>
                dispatch(listActions.setPagination({ page, size }))
              }
            />
          </div>
        )}
      </div>
    </Panel>
  )
}

export interface IListColumn {
  data: React.ReactText | JSX.Element
}

interface ListProps<Item = any> {
  tableProvider?: TableProviderType<Item>
  query: (
    queryParams: { filters?: QueryParamsFilter; params?: DefaultQueryParams },
    options?: UseQueryOptions<ListResponse<Item>>
  ) => UseQueryResult<ListResponse<Item>>
  onEmptyData?: JSX.Element
  onLoadData?: (items: Item[]) => void
}

export default List
