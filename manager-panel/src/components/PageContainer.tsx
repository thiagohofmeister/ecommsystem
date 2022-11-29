import { makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'

import { useSideMenu } from './hooks/useSideMenu'
import PageContainerTop from './PageContainerTop'

export const usePageContainerStyles = makeStyles(
  {
    root: {
      width: '100%',
      marginLeft: '55px',
      transition: '0.3s ease all',
      overflowY: 'scroll',

      '&--side-bar-opened': {
        marginLeft: '250px'
      }
    },
    body: {
      padding: '30px',
      margin: '0 30px 30px',
      background: 'white'
    }
  },
  {
    name: 'PageContainer'
  }
)

const PageContainer: React.FC<PageContainerProps> = ({ pageTitle, backRoute, children }) => {
  const classes = usePageContainerStyles()
  const { sideMenuOpen } = useSideMenu()

  return (
    <div
      className={classNames(classes.root, {
        [`${classes.root}--side-bar-opened`]: sideMenuOpen
      })}>
      <PageContainerTop title={pageTitle} backRoute={backRoute} />

      {children && <div className={classes.body}>{children}</div>}
    </div>
  )
}

interface PageContainerProps extends PropsWithChildren {
  pageTitle: string
  backRoute?: string
}

export default PageContainer
