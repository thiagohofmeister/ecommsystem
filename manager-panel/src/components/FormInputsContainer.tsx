import { styled } from '@material-ui/core'

const FormInputsContainer = styled('div')(
  {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    '& > *:not(:last-child)': {
      marginBottom: '20px'
    }
  },
  {
    name: 'FormInputsContainer'
  }
)

export default FormInputsContainer
