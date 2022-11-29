import { makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ActivityIndicator } from '../ActivityIndicator'
import { useTableRowLoader } from '../hooks/useTableRowLoader'

const useStyles = makeStyles(
  theme => ({
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF50',
      opacity: 0,
      transition: `opacity ${theme.transitions.duration.standard}s`,
      zIndex: 2
    },
    active: {
      opacity: 1
    }
  }),
  { name: 'TableRowLoader' }
)

export const TableRowLoader: FC<TableRowLoaderProps> = ({ active }) => {
  const classes = useStyles()
  const { loaderRef } = useTableRowLoader()

  return (
    <CSSTransition
      in={active}
      unmountOnExit
      timeout={300}
      classNames={{ enterActive: classes.active, enterDone: classes.active }}
      nodeRef={loaderRef}>
      <div
        ref={loaderRef}
        className={classNames(classes.root, {
          [classes.active]: !!active
        })}>
        <ActivityIndicator center />
      </div>
    </CSSTransition>
  )
}

type TableRowLoaderProps = {
  active?: boolean
}
