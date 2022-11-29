import { useState } from 'react'
import { useListState } from 'store/listDuck'

export const useListPaginator = () => {
  const listState = useListState()
  const [pageSize, setPageSize] = useState(listState.params.size || 15)

  return {
    pageSize,
    setPageSize
  }
}
