import { FC } from 'react'

import { DefaultActionItem } from './DefaultActionItem'

export const Detail: FC<DetailProps> = ({ label, onClick }) => (
  <DefaultActionItem onClick={onClick} label={label} icon={<></>} />
)

type DetailProps = {
  label: string
  onClick: (() => void) | undefined
}
