import { Route } from 'models/Route'

import attributeRoute from './attributeRoute'
import brandRoute from './brandRoute'
import dashboardRoute from './dashboardRoute'
import loginRoute from './loginRoute'

const routes: { [key: string]: Route } = {
  dashboard: dashboardRoute,
  brand: brandRoute,
  login: loginRoute,
  attribute: attributeRoute
}

export default routes
