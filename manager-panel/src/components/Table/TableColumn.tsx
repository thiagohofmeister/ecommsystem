import { makeStyles, ThemeOptions } from '@material-ui/core'
import { PropsWithChildren } from 'react'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '2px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      color: theme.table?.body?.column?.color || '#ccc',
      fontSize: '14px'
    }
  }),
  {
    name: 'TableColumn'
  }
)

export const TableColumn: React.FC<ListColumnProps> = props => {
  const classes = useStyles()
  return <div className={classes.root}>{props.children}</div>
}

type ListColumnProps = {} & PropsWithChildren
