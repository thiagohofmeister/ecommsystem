import { makeStyles } from '@material-ui/core'
import { FC, InputHTMLAttributes } from 'react'
import { FieldError, UseControllerReturn } from 'react-hook-form'

const useBaseInputStyles = makeStyles(
  theme => ({
    input: {
      border: 'none',
      outline: 'none',
      height: '100%',
      width: '100%',
      paddingLeft: '13px',
      backgroundColor: 'transparent',
      '&:disabled': {
        cursor: 'not-allowed'
      },
      color: theme.palette.text.primary,
      fontSize: 14
    }
  }),
  { name: 'BaseInput' }
)

export const BaseInput: FC<BaseInputProps> = ({
  isLoading,
  controller,
  hideErrorMessage,
  customError,
  ...props
}) => {
  const classes = useBaseInputStyles()

  return (
    <input
      {...props}
      ref={controller?.field.ref}
      name={controller?.field.name}
      className={classes.input}
    />
  )
}

export type DefaultInputProps = {
  isLoading?: boolean
  controller?: UseControllerReturn<any, any>
  hideErrorMessage?: boolean
  customError?: FieldError | undefined
}

export type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'title'> &
  DefaultInputProps

export type OverrideValueInputProps = Omit<BaseInputProps, 'value' | 'onChange'>
