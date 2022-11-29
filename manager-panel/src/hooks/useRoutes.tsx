import Layout from 'components/Layout'
import { Route } from 'models/Route'
import { lazy, Suspense, useCallback, useMemo } from 'react'
import { RouteObject, useRoutes as useRoutesRouterDom } from 'react-router-dom'
import routes from 'routes'

export const useRoutes = () => {
  const formatRoutes = useCallback(
    (withoutLayout: boolean = false) => {
      return Object.keys(routes)
        .map(routeKey => formatRoute(routes![routeKey], withoutLayout))
        .filter(route => !!route) as RouteObject[]
    },
    [routes]
  )

  const formatRoute = useCallback(
    (route: Route, withoutLayout: boolean): RouteObject | undefined => {
      if (!route.withoutLayout) {
        route.withoutLayout = false
      }

      if (route.withoutLayout !== withoutLayout) {
        return
      }

      return {
        index: route.index,
        path: route.path,
        element: route.component,
        children:
          route.items &&
          (Object.keys(route.items)
            .map(routeKey => formatRoute(route.items![routeKey], withoutLayout))
            .filter(route => !!route) as RouteObject[])
      }
    },
    [routes]
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
    [routes]
  )

  const router = useRoutesRouterDom(routesToRouterDom)

  return {
    router
  }
}
