import { useUserLogged } from 'hooks/user/useUserLogged'
import cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { Token } from 'models/Token'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import loginRoute from 'routes/loginRoute'
import { setCurrentStore, setLoggedUser } from 'store/layoutDuck'

export const useLayout = () => {
  const [viewLoading, setViewLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: loggedUser } = useUserLogged()

  const setUser = useCallback(
    (token: string) => {
      const decodedToken: Token = jwtDecode<Token>(token)
      dispatch(setCurrentStore(decodedToken?.store))

      if (loggedUser) dispatch(setLoggedUser(loggedUser))
    },
    [dispatch, loggedUser]
  )

  const logout = useCallback(() => {
    cookie.remove('token')
    navigate(loginRoute.path)
  }, [navigate])

  useEffect(() => {
    ;(async () => {
      const token = cookie.get('token')

      if (!token) {
        navigate(loginRoute.path)
        return
      }

      setUser(token!)

      setViewLoading(false)
    })()
  }, [setUser, navigate])

  return { viewLoading, logout }
}
