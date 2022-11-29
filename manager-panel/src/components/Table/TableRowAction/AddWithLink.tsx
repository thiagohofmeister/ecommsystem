import { makeStyles, ThemeOptions } from '@material-ui/core'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { useDefaultActionItems } from './useDefaultActionItem'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    icon: {
      color: theme.iconColor
    }
  }),
  { name: 'AddWithLink' }
)

export const AddWithLink: FC<AddWithLinkProps> = ({ label, link }) => {
  const classes = useStyles()
  const { classes: defaultClasses } = useDefaultActionItems()

  return (
    <Link className={defaultClasses.root} to={link}>
      <div className={`${defaultClasses.root}__icon`}>
        <div className={classes.icon}></div>
      </div>

      <span>{label}</span>
    </Link>
  )
}

type AddWithLinkProps = {
  label: string
  link: string
}
