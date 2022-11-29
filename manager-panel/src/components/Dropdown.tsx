import { makeStyles } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { ExpandLess } from '@mui/icons-material'
import classNames from 'classnames'
import { PropsWithChildren, useCallback, useState } from 'react'

export const useDropdownStyles = makeStyles(
  {
    root: {
      position: 'relative',
      height: '20px',

      '&--with-hover': {
        '& $dropdownAction': {
          cursor: 'default'
        },

        '&:hover': {
          '& $dropdownContentContainer': {
            display: 'flex'
          }
        }
      }
    },

    dropdownAction: {
      position: 'absolute',
      whiteSpace: 'nowrap',
      right: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: 3
    },

    dropdownContentContainer: {
      display: 'none',
      position: 'absolute',
      flexDirection: 'column',
      justifyContent: 'center',
      top: '-5px',
      right: '5px',
      paddingTop: '30px',
      zIndex: 2,

      '&--opened': {
        display: 'flex'
      }
    },

    dropdownContent: {
      background: '#ffffff',
      border: '1px solid #dfdfdf',
      padding: '15px',
      borderRadius: '6px'
    }
  },
  { name: 'Dropdown' }
)

const Dropdown: React.FC<DropDownProps> = ({ label, openByHover, icon, children }) => {
  const classes = useDropdownStyles()

  const [isOpened, setOpened] = useState<boolean>(false)

  const toggleDropDown = useCallback(() => {
    if (openByHover) return

    setOpened(!isOpened)
  }, [openByHover, isOpened, setOpened])

  const renderIcon = useCallback(() => {
    if (icon) {
      return icon
    }

    return isOpened ? <ExpandLess /> : <ExpandMore />
  }, [isOpened, icon])

  return (
    <div
      className={classNames(classes.root, {
        [`${classes.root}--with-hover`]: openByHover
      })}>
      <div className={classes.dropdownAction} onClick={toggleDropDown}>
        {label}
        {renderIcon()}
      </div>

      <div
        className={classNames(classes.dropdownContentContainer, {
          [`${classes.dropdownContentContainer}--opened`]: isOpened
        })}>
        <div className={classes.dropdownContent}>{children}</div>
      </div>
    </div>
  )
}

interface DropDownProps extends PropsWithChildren {
  label?: JSX.Element
  icon?: JSX.Element
  openByHover?: boolean
}

export default Dropdown
