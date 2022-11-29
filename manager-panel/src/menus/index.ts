import routes from 'routes'
import attributeRoute from 'routes/attributeRoute'
import brandRoute from 'routes/brandRoute'

import { Menu } from '../models/Menu'

const menus: Menu[] = [
  {
    title: 'Dashboard',
    route: routes.dashboard.path
  },
  {
    title: 'Marcas',
    route: brandRoute.items.list.path
  },
  {
    title: 'Atributos',
    route: attributeRoute.items.list.path
  }
]

export default menus
