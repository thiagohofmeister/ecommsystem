import { makeStyles, ThemeOptions } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useMemo } from 'react'
import ReactPaginate from 'react-paginate'

import { useListPaginator } from './useListPaginator'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      display: 'flex',
      alignItems: 'center',

      '&__container': {
        display: 'flex',
        listStyle: 'none',
        alignItems: 'center',
        padding: 'unset'
      },

      '&__break': {
        margin: '2px 10px 0 5px',
        color: theme.list?.paginator?.breakColor
      },

      '&__page': {
        '&:not(:nth-last-child(2))': {
          marginRight: '5px'
        },

        '&-link': {
          cursor: 'pointer',
          backgroundColor: theme.list?.paginator?.page?.backgroundColor,
          borderRadius: '6px',
          border: '2px solid transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '14px',
          fontWeight: 'normal',
          height: '25px',
          padding: '0 5px',
          transition: '0.3s',
          outline: 'none',
          userSelect: 'none',

          '&:hover': {
            backgroundColor: theme.list?.paginator?.page?.hover?.backgroundColor,
            borderColor: theme.list?.paginator?.page?.hover?.borderColor
          }
        },

        '&--active': {
          '& > a': {
            backgroundColor: theme.list?.paginator?.page?.active?.backgroundColor,
            borderColor: theme.list?.paginator?.page?.active?.borderColor,
            color: '#333',
            fontWeight: 'bold',
            cursor: 'default'
          }
        }
      },

      '&__button': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        cursor: 'pointer',

        '& a, svg': {
          color: theme.list?.paginator?.page?.buttonPaginate?.iconColor
        },

        '& > a': {
          outline: 'none',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },

        '&--disabled': {
          cursor: 'default',

          '& a, svg': {
            color: theme.list?.paginator?.page?.buttonPaginate?.disabled?.iconColor
          }
        },

        '&:first-child': {
          marginRight: '10px'
        },

        '&:last-child': {
          marginLeft: '10px'
        }
      }
    }
  }),
  { name: 'ListPaginator' }
)

export const ListPaginator: React.FC<ListPaginatorProps> = props => {
  const classes = useStyles()
  const tablePaginatorHook = useListPaginator()

  const pageCount = useMemo(
    () => Math.ceil(props.total / tablePaginatorHook.pageSize),
    [props, tablePaginatorHook.pageSize]
  )

  const showPages = useMemo(
    () => props.total > tablePaginatorHook.pageSize,
    [props, tablePaginatorHook.pageSize]
  )

  return (
    <div className={classes.root}>
      {!!pageCount && showPages && (
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={4}
          marginPagesDisplayed={3}
          forcePage={props.currentPage - 1}
          disableInitialCallback
          onPageChange={({ selected }) => props.onChange(selected + 1, tablePaginatorHook.pageSize)}
          containerClassName={`${classes.root}__container`}
          pageClassName={`${classes.root}__page`}
          pageLinkClassName={`${classes.root}__page-link`}
          activeClassName={`${classes.root}__page--active`}
          previousClassName={`${classes.root}__button`}
          previousLabel={
            <>
              <ChevronLeftIcon fontSize="inherit" />
            </>
          }
          nextClassName={`${classes.root}__button`}
          nextLabel={
            <>
              <ChevronRightIcon fontSize="inherit" />
            </>
          }
          disabledClassName={`${classes.root}__button--disabled`}
          breakLabel={<></>}
          breakClassName={`${classes.root}__break`}
        />
      )}
    </div>
  )
}

type ListPaginatorProps = {
  currentPage: number
  total: number
  onChange: (page: number, pageSize: number) => void
  className?: string
}
