import { FC } from 'react'

import { DefaultActionItem } from './DefaultActionItem'

export const Duplicate: FC<DuplicateProps> = ({ label, onClick }) => (
  <DefaultActionItem onClick={onClick} label={label} icon={<></>} />
)

type DuplicateProps = {
  label: string
  onClick: (() => void) | undefined
}
