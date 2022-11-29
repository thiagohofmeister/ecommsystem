import { makeStyles } from '@material-ui/core'
import { PropsWithChildren, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { usePageContainerStyles } from './PageContainer'

const useStyles = makeStyles(
  {
    root: {
      padding: '20px 30px',
      margin: '20px 30px 0',
      background: '#FFF'
    }
  },
  { name: 'ContentBottom' }
)

export const LayoutContentBottom: React.FC<PropsWithChildren> = ({ children }) => {
  const [ref, setRef] = useState<Element | null>()
  const classes = useStyles()

  const pageContainerClasses = usePageContainerStyles()

  useEffect(() => {
    setRef(document.querySelector(`.${pageContainerClasses.root}`))
  }, [])

  const Component = <div className={classes.root}>{children}</div>

  return ref ? ReactDOM.createPortal(Component, ref) : <></>
}
