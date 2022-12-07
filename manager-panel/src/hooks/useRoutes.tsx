import Layout from 'components/Layout'
import { Route } from 'models/Route'
import { useCallback, useMemo } from 'react'
import { RouteObject, useRoutes as useRoutesRouterDom } from 'react-router-dom'
import routes from 'routes'

export const useRoutes = () => {
  const formatRoute = useCallback(
    (route: Route, withoutLayout: boolean): RouteObject | undefined => {
      if (!route.withoutLayout) {
        route.withoutLayout = false
      }

      if (route.withoutLayout !== withoutLayout) {
        return
      }

      const routeObj: RouteObject = {
        index: route.index,
        path: route.path,
        element: route.component
      }

      if (!!route.items) {
        routeObj.index = false
        routeObj.children = Object.keys(route.items)
          .map(routeKey => formatRoute(route.items![routeKey], withoutLayout))
          .filter(route => !!route) as RouteObject[]
      }

      return routeObj
    },
    []
  )

  const formatRoutes = useCallback(
    (withoutLayout: boolean = false) => {
      return Object.keys(routes)
        .map(routeKey => formatRoute(routes![routeKey], withoutLayout))
        .filter(route => !!route) as RouteObject[]
    },
    [formatRoute]
  )

  const routesToRouterDom = useMemo<RouteObject[]>(
    () => [
      {
        label: 'Layout',
        path: '/',
        element: <Layout />,
        children: formatRoutes()
      },
      ...formatRoutes(true)
    ],
    [formatRoutes]
  )

  const router = useRoutesRouterDom(routesToRouterDom)

  return {
    router
  }
}
