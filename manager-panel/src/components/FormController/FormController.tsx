import { makeStyles } from '@material-ui/core'
import Button from 'components/Button'
import { withSuspense } from 'hocs/withSuspense'
import { useEditContext } from 'providers/EditProvider'
import { useMutationContext } from 'providers/MutationProvider'
import { Fragment } from 'react'

import { useFormController } from './useFormController'

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      gap: '40px',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  },
  { name: 'FormButtons' }
)

export const FormController = ({ controller }: FormControllerProps) => {
  const { isLoading } = useMutationContext()
  const { hasChanges, saveChanges, discardChanges } = controller
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {hasChanges && (
        <Button
          label="Desfazer modificações"
          type="cancel"
          disabled={isLoading}
          onClick={discardChanges}
        />
      )}

      <Button label="Salvar" type="success" onClick={saveChanges} />
    </div>
  )
}

export const FormControllerDefault = () => {
  const { immutableData } = useEditContext()
  const controller = useFormController(immutableData)

  return <FormController controller={controller} />
}

export const FormControllerCustom = withSuspense<{
  useController: () => FormControllerController
}>(
  ({ useController }) => {
    const controller = useController()

    return <FormController controller={controller} />
  },
  {
    fallback: <Fragment />
  }
)

export type FormControllerController = {
  hasChanges: boolean
  saveChanges: () => Promise<void>
  discardChanges: () => void
}

export type FormControllerProps = {
  controller: FormControllerController
}
