import EditIcon from '@material-ui/icons/Edit'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { useDefaultActionItems } from './useDefaultActionItem'

export const Edit: FC<EditProps> = ({ label, link }) => {
  const { classes: defaultClasses } = useDefaultActionItems()

  return (
    <Link className={defaultClasses.root} to={link}>
      <div className={`${defaultClasses.root}__icon`}>
        <EditIcon fontSize="inherit" />
      </div>

      <span>{label}</span>
    </Link>
  )
}

type EditProps = {
  label: string
  link: string
}
