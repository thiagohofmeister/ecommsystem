import { makeStyles } from '@material-ui/core'
import { FC, Fragment } from 'react'
import { FieldError } from 'react-hook-form'

const useStyles = makeStyles(
  theme => ({
    root: {
      color: theme.palette.error.light,
      marginTop: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 11
    }
  }),
  { name: 'InputErrorMessageMessage' }
)

export const InputErrorMessage: FC<InputErrorMessageProps> = ({ error }) => {
  const classes = useStyles()

  if (!error || !error.type) return <Fragment />

  return (
    <div className={classes.root}>
      <span>{error.message}</span>
    </div>
  )
}

type InputErrorMessageProps = {
  error: FieldError | undefined
}
