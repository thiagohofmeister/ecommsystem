import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { reducer as layout } from './layoutDuck'
import { reducer as list } from './listDuck'
import { reducer as modal } from './modalDuck'

const reducer = combineReducers({
  layout,
  list,
  modal
})

export type AppState = ReturnType<typeof reducer>

export type AppStateGetter = () => AppState

export default configureStore({
  reducer
})
