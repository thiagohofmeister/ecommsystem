import { makeStyles } from '@material-ui/core'
import Form from 'components/Form/Form'
import InputContainer from 'components/InputContainer'
import { useAuthenticationCreate } from 'hooks/authentication/useAuthenticationCreate'
import { useCallback, useState } from 'react'

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',

      '& > h1': {
        fontSize: '18px',
        margin: 0
      },

      '& > p': {
        fontSize: '14px',
        margin: '20px 0'
      },

      '&__form': {
        width: '400px'
      }
    }
  },
  {
    name: 'Login'
  }
)

const Login = () => {
  const classes = useStyles()
  const { mutateAsync: auth } = useAuthenticationCreate()
  const [user, setUser] = useState({ data: '', password: '' })

  const handleSubmit = useCallback(async () => {
    await auth(user)
  }, [user, auth])

  return (
    <div className={classes.root}>
      <h1>Bem-vindo</h1>

      <p>Informe seus dados de autenticação para acessar a plataforma.</p>

      <Form onSubmit={handleSubmit} btnSubmitLabel="Acessar" className={`${classes.root}__form`}>
        <InputContainer
          label="Usuário"
          value={user.data}
          onChange={data => setUser(prev => ({ ...prev, data }))}
        />

        <InputContainer
          input={{ type: 'password' }}
          label="Senha"
          value={user.password}
          onChange={password => setUser(prev => ({ ...prev, password }))}
        />
      </Form>
    </div>
  )
}

export default Login
