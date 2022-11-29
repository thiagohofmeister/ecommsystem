import { FC } from 'react'

import { DefaultActionItem } from './DefaultActionItem'

export const Delete: FC<DeleteProps> = ({ label, onClick }) => (
  <DefaultActionItem onClick={onClick} label={label} icon={<></>} />
)

type DeleteProps = {
  label: string
  onClick: (() => void) | undefined
}
