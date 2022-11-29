import { useSelector as reduxUseSelector } from 'react-redux'
import { AppState } from 'store'

export const useSelector = <R>(key: keyof AppState) =>
  reduxUseSelector<AppState, R>(state => state[key] as unknown as R)
