import { makeStyles, ThemeOptions } from '@material-ui/core'
import classNames from 'classnames'
import { useInputModel } from 'hooks/useInputModel'
import { HTMLProps, useMemo } from 'react'
import { FieldError, UseControllerReturn } from 'react-hook-form'

import { InputErrorMessage } from './InputErrorMessage'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    container: {
      width: '100%',
      display: 'flex',
      height: '40px',
      border: `1px solid ${theme.inputContainer?.borderColor}`,
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: '3px',

      '& input': {
        width: '100%',
        height: '40px',
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        marginLeft: '10px',
        background: 'transparent'
      },

      '& span': {
        color: theme.inputContainer?.requiredColor,
        marginLeft: '3px',
        fontSize: '13px'
      },

      '&__label': {
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'relative'
      },

      '&:focus-within, &--with-value': {
        '& $labelTitle': {
          color: theme.inputContainer?.labelTitle?.onFocusColor,
          fontWeight: 'bold',
          fontSize: '9px',
          top: '5px'
        },

        '& input': {
          height: '30px',
          marginTop: '10px'
        }
      },

      '&__prefix, &__suffix': {
        background: theme.inputContainer?.prefixAndSuffix?.backgroundColor,
        color: theme.inputContainer?.prefixAndSuffix?.color,
        height: '100%',
        padding: '0 10px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px'
      }
    },
    labelTitle: {
      top: '11px',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      fontSize: '13px',
      transition: '0.3s all ease',
      left: '11px',
      color: theme.inputContainer?.labelTitle?.color
    }
  }),
  {
    name: 'InputContainer'
  }
)

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  input,
  prefix,
  suffix,
  hideErrorMessage,
  customError,
  controller,
  isRequired: required,
  ...props
}) => {
  const classes = useStyles()

  const error = useMemo<FieldError | undefined>(
    () => customError || controller?.fieldState.error,
    [customError, controller]
  )

  const { value, onChange } = useInputModel({
    controller,
    onChange: props.onChange,
    value: props.value
  })

  return (
    <div className={classes.root}>
      <div
        className={classNames(`${classes.container}`, {
          [`${classes.container}--with-value`]: !!value
        })}>
        {!!prefix && <div className={`${classes.container}__prefix`}>{prefix}</div>}

        <label className={`${classes.container}__label`}>
          {!!label && (
            <div className={classes.labelTitle}>
              {label} {required && <span>*</span>}
            </div>
          )}

          <input
            {...input}
            value={value || ''}
            onChange={event => onChange?.(event.target.value)}
            onBlur={controller?.field.onBlur}
            ref={controller?.field.ref}
            name={controller?.field.name}
          />
        </label>

        {!!suffix && <div className={`${classes.container}__suffix`}>{suffix}</div>}
      </div>
      {!!error && !hideErrorMessage && <InputErrorMessage error={error!} />}
    </div>
  )
}

interface InputContainerProps {
  prefix?: string
  suffix?: string
  label?: string
  value?: string | null | undefined
  isRequired?: boolean
  onChange?: (value: string) => void
  input?: HTMLProps<HTMLInputElement>
  controller?: UseControllerReturn<any, any>
  hideErrorMessage?: boolean
  customError?: FieldError | undefined
}

export default InputContainer
