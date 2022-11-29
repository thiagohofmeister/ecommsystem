import { makeStyles, ThemeOptions } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

export const usePageContainerTopStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 30px',
      margin: '30px 30px 20px',
      background: '#FFF',
      minHeight: '75px'
    },
    left: {
      display: 'flex',
      '& > h1': {
        fontSize: '16px',
        color: theme.pageContainer?.titleColor
      },

      '&--with-backroute': {
        cursor: 'pointer',
        transition: '0.3s ease all',

        '&:hover': {
          opacity: '0.8'
        }
      }
    },
    right: {}
  }),
  {
    name: 'PageContainerTop'
  }
)

const PageContainerTop: React.FC<PageContainerTopProps> = ({ title, backRoute }) => {
  const classes = usePageContainerTopStyles()
  const navigate = useNavigate()

  return (
    <div className={classes.root}>
      <div
        className={classNames(classes.left, {
          [`${classes.left}--with-backroute`]: !!backRoute
        })}
        onClick={() => !!backRoute && navigate(backRoute)}>
        {!!backRoute && <ChevronLeftIcon />}
        <h1>{title}</h1>
      </div>

      <div className={classes.right}></div>
    </div>
  )
}

interface PageContainerTopProps extends PropsWithChildren {
  backRoute?: string
  title: string
}

export default PageContainerTop
