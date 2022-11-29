import { makeStyles, ThemeOptions } from '@material-ui/core'

import UserTopBar from './UserTopBar'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      width: '100%',
      height: '60px',
      background: theme.topBar?.backgroundColor,
      borderBottom: `2px solid ${theme.topBar?.borderBottomColor}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px'
    }
  }),
  {
    name: 'TopBar'
  }
)

const TopBar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={`${classes.root}__left`}></div>

      <div className={`${classes.root}__right`}>
        <UserTopBar />
      </div>
    </div>
  )
}

export default TopBar
