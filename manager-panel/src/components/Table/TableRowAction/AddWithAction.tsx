import { makeStyles, ThemeOptions } from '@material-ui/core'
import { FC } from 'react'

import { DefaultActionItem } from './DefaultActionItem'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    icon: {
      color: theme.iconColor
    }
  }),
  { name: 'AddWithAction' }
)

export const AddWithAction: FC<AddWithActionProps> = ({ label, onClick }) => {
  const classes = useStyles()

  return (
    <DefaultActionItem
      onClick={onClick}
      label={label}
      icon={<div className={classes.icon}></div>}
    />
  )
}

type AddWithActionProps = {
  label: string
  onClick: (() => void) | undefined
}
