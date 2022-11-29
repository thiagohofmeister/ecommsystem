import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useLayoutState } from 'store/layoutDuck'

export const useSideMenu = () => {
  const { sideMenuOpen } = useLayoutState()
  const dispatch = useDispatch()

  const sideMenuRef = useRef<HTMLDivElement>(null)

  return {
    sideMenuOpen,
    sideMenuRef,
    dispatch
  }
}
