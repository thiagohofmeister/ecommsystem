import { createRef } from 'react'

export const useTableRowLoader = () => {
  const loaderRef = createRef<HTMLDivElement>()

  return {
    loaderRef
  }
}
