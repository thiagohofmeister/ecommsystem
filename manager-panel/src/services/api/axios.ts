import axios from 'axios'
import cookie from 'js-cookie'

const axiosInstance = (isLogged: boolean = true) => {
  const token = cookie.get('token')

  if (isLogged && !token) {
    window.location.href = `/login?redirect=${window.location.href}`
  }

  const headers: any = {}

  if (token) {
    headers.authorization = `Bearer ${token}`
  }

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers
  })

  instance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response.status === 401) {
        cookie.remove('token')
      }
    }
  )

  return instance
}

export { axiosInstance }
