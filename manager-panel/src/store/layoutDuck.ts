import { useSelector } from 'hooks/useSelector'
import { Store } from 'models/Store'
import { User } from 'models/User'
import { Reducer } from 'react'
import { useDispatch } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'

const INITIAL_STATE: ILayoutState = {
  sideMenuOpen: true,
  loggedUser: null
}

export enum LayoutTypes {
  SET_SIDE_MENU_OPEN = '@layout/SET_SIDE_MENU_OPEN',
  SET_LOGGED_USER = '@layout/SET_LOGGED_USER'
}

export const setSideMenuOpen = (payload: boolean) => ({
  type: LayoutTypes.SET_SIDE_MENU_OPEN,
  payload
})

export const setLoggedUser = (payload: User) => ({
  type: LayoutTypes.SET_LOGGED_USER,
  payload
})

export const setCurrentStore = (payload: Store) => ({
  type: LayoutTypes.SET_LOGGED_USER,
  payload
})

const actions = {
  setSideMenuOpen,
  setLoggedUser
}

export const reducer: Reducer<ILayoutState, ILayoutAction> = (
  currentState = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case LayoutTypes.SET_SIDE_MENU_OPEN:
      return {
        ...currentState,
        sideMenuOpen: action.payload
      }

    case LayoutTypes.SET_LOGGED_USER:
      return {
        ...currentState,
        loggedUser: action.payload
      }

    default:
      return currentState
  }
}

export const useLayoutState = () => useSelector<ILayoutState>('layout')
export const useLayoutActions = () => {
  const layoutActions = bindActionCreators(actions, useDispatch<LayoutDispatch>())

  return {
    layoutActions
  }
}

interface ILayoutState {
  sideMenuOpen: boolean
  loggedUser: User | null
}

type ILayoutAction =
  | { type: LayoutTypes.SET_SIDE_MENU_OPEN; payload: boolean }
  | { type: LayoutTypes.SET_LOGGED_USER; payload: User | null }

type LayoutDispatch = Dispatch<Partial<ILayoutState> & Action<LayoutTypes>>
