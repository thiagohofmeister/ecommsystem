import { makeStyles, ThemeOptions } from '@material-ui/core'
import classNames from 'classnames'
import { HTMLAttributes, Suspense } from 'react'

import { ActivityIndicator } from './ActivityIndicator'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      width: '100%',
      borderRadius: 6,
      backgroundColor: theme.panel?.backgroundColor || 'white',
      position: 'relative'
    }
  }),
  { name: 'Panel' }
)

export const Panel: React.FC<PanelProps> = ({ children, ...panelProps }) => {
  const classes = useStyles()

  return (
    <div {...panelProps} className={classNames(classes.root, panelProps.className)}>
      <Suspense fallback={<ActivityIndicator center />}>{children}</Suspense>
    </div>
  )
}

export type PanelProps = HTMLAttributes<HTMLDivElement>
