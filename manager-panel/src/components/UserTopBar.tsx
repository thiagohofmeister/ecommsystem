import { makeStyles } from '@material-ui/core'
import { useLayoutState } from 'store/layoutDuck'

import Button from './Button'
import Dropdown from './Dropdown'
import { useLayout } from './hooks/useLayout'

const useStyles = makeStyles(
  {
    root: {}
  },
  { name: 'UserTopBar' }
)

const UserTopBar = () => {
  const classes = useStyles()

  const { loggedUser } = useLayoutState()
  const { logout } = useLayout()

  return (
    <div className={classes.root}>
      <Dropdown label={<>{loggedUser?.name}</>}>
        <Button label="Sair" type="cancel" onClick={logout} />
      </Dropdown>
    </div>
  )
}

export default UserTopBar
