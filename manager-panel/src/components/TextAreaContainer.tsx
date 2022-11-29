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
      height: '130px',
      border: `1px solid ${theme.inputContainer?.borderColor}`,
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: '3px',

      '& textarea': {
        width: '100%',
        height: '130px',
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        marginLeft: '10px',
        resize: 'none',
        backgroundColor: 'transparent'
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
        '& textarea': {
          height: '110px',
          marginTop: '20px'
        }
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
    name: 'TextAreaContainer'
  }
)

const TextAreaContainer: React.FC<TextAreaContainerProps> = ({
  label,
  input,
  controller,
  customError,
  isRequired: required,
  hideErrorMessage,
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
        className={classNames(classes.container, {
          [`${classes.container}--with-value`]: !!value
        })}>
        <label className={`${classes.container}__label`}>
          {!!label && (
            <div className={classes.labelTitle}>
              {label} {required && <span>*</span>}
            </div>
          )}

          <textarea {...input} onChange={e => onChange?.(e.target.value)} value={value || ''} />
        </label>
      </div>

      {!!error && !hideErrorMessage && <InputErrorMessage error={error!} />}
    </div>
  )
}

interface TextAreaContainerProps {
  label?: string
  value?: string | null | undefined
  isRequired?: boolean
  onChange?: (value: string) => void
  input?: HTMLProps<HTMLTextAreaElement>
  controller?: UseControllerReturn<any, any>
  hideErrorMessage?: boolean
  customError?: FieldError | undefined
}

export default TextAreaContainer
