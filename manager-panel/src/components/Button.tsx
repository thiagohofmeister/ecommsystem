import { makeStyles, ThemeOptions } from '@material-ui/core'
import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    button: {
      display: 'flex',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px',
      borderRadius: '3px',
      padding: '10px',
      justifyContent: 'center',

      '&--success': {
        ...theme.button?.success,
        fontWeight: 'bold',

        '&:hover': {
          ...theme.button?.success?.hover
        },

        '&:active': {
          ...theme.button?.success?.active
        }
      },

      '&--cancel': {
        ...theme.button?.cancel,

        '&:hover': {
          ...theme.button?.cancel?.hover
        },

        '&:active': {
          ...theme.button?.cancel?.active
        }
      }
    }
  }),
  {
    name: 'Button'
  }
)

const Button: React.FC<ButtonProps> = ({ label, type, ...props }) => {
  const classes = useStyles()

  return (
    <button
      {...props}
      className={classNames(classes.button, props.className, {
        [`${classes.button}--${type}`]: !!type
      })}>
      {label}
    </button>
  )
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'success' | 'cancel'
  label: string
}

export default Button
