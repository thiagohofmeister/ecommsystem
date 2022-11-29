import './App.scss'
import 'components/Toast/Toast.scss'

import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { Suspense } from 'react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { ActivityIndicator } from './components/ActivityIndicator'
import queryClient from './configs/queryClient'
import { useRoutes } from './hooks/useRoutes'
import store from './store'
import AppTheme from './theme/AppTheme'

function App() {
  const { router } = useRoutes()

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={AppTheme}>
          <CssBaseline />
          <Provider store={store}>
            <Suspense fallback={<ActivityIndicator center />}>{router}</Suspense>

            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
          </Provider>
        </ThemeProvider>
        <ToastContainer pauseOnHover={false} theme="light" hideProgressBar />
      </QueryClientProvider>
    </div>
  )
}

export default App
