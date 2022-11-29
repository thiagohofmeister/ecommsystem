import { FC } from 'react'

import { useDefaultActionItems } from './useDefaultActionItem'

export const DefaultActionItem: FC<DefaultActionItemProps> = ({
  icon,
  label,
  onClick,
  iconColor
}) => {
  const { classes } = useDefaultActionItems()

  return (
    <div className={classes.root} onClick={onClick}>
      <div className={`${classes.root}__icon`} style={{ color: iconColor }}>
        {icon}
      </div>
      <span>{label}</span>
    </div>
  )
}

type DefaultActionItemProps = {
  icon: JSX.Element
  label: string
  onClick: (() => void) | undefined
  iconColor?: React.CSSProperties['color']
}
