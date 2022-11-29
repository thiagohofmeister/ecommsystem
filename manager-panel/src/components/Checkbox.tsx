import { Checkbox as MuiCheckbox, FormControlLabel, makeStyles } from '@material-ui/core'
import { FC } from 'react'

const useStyles = makeStyles(
  {
    root: {
      padding: 0
    }
  },
  { name: 'Checkbox' }
)

export const Checkbox: FC<CheckboxProps> = ({ checked, label, onChange, disabled }) => {
  const classes = useStyles()

  return (
    <FormControlLabel
      className={classes.root}
      label={label}
      style={{ pointerEvents: 'none' }}
      control={
        <MuiCheckbox
          checked={checked}
          onChange={evt => onChange(evt.target.checked)}
          color="primary"
          disabled={disabled}
          style={{ pointerEvents: 'auto' }}
        />
      }
    />
  )
}

type CheckboxProps = {
  label?: React.ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}
