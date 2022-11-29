const getRouteWithParams = (route: string, params: { [key: string]: string }) => {
  let finalRoute = route

  Object.keys(params).forEach(paramKey => {
    finalRoute = finalRoute.replace(`:${paramKey}`, params[paramKey])
  })

  return finalRoute
}

export default getRouteWithParams
