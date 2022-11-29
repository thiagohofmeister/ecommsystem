import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { TitledComponentProps, TitleProps } from './withTitle'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      marginBottom: 10,
      color: theme.palette.text.primary,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center'
    }
  }),
  { name: 'TitledComponent' }
)

export const useWithTitle = (props: TitledComponentProps) => {
  const titleText = useMemo<string | undefined>(() => {
    if (props.title) {
      if (typeof props.title === 'object') {
        return props.title.text
      }

      return props.title
    }
  }, [props.title])

  const rightComponent = useMemo<TitleProps['rightComponent']>(() => {
    if (props.title) {
      if (typeof props.title === 'object') {
        return props.title.rightComponent
      }
    }
  }, [props.title])

  return {
    classes: useStyles(),
    title: titleText,
    rightComponent
  }
}
