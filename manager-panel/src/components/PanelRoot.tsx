import { FC, HTMLAttributes } from 'react'

import { ActivityIndicator } from './ActivityIndicator'

export const PanelRoot: FC<PanelRootProps> = ({ isLoading, children, ...props }) => {
  return (
    <div {...props}>
      {isLoading && <ActivityIndicator center />}
      {children}
    </div>
  )
}

export type PanelRootProps = HTMLAttributes<HTMLDivElement> & {
  isLoading?: boolean
}
