import { useSelector } from 'hooks/useSelector'
import { Reducer } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

const INITIAL_STATE: IModalState = {
  active: false
}

export enum ModalTypes {
  SET_ACTIVE = '@modal/SET_ACTIVE',
  SET_MODAL = '@modal/SET_MODAL'
}

const open = (modal: IModal) => (dispatch: ModalDispatch) => {
  dispatch({
    type: ModalTypes.SET_MODAL,
    payload: modal
  })

  dispatch({
    type: ModalTypes.SET_ACTIVE,
    payload: true
  })
}

const close = () => (dispatch: ModalDispatch) => {
  dispatch({
    type: ModalTypes.SET_ACTIVE,
    payload: false
  })
}

export const reducer: Reducer<IModalState, IModalAction> = (
  currentState = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ModalTypes.SET_ACTIVE:
      return {
        ...currentState,
        active: action.payload
      }
    case ModalTypes.SET_MODAL:
      return {
        ...currentState,
        modal: action.payload
      }
    default:
      return currentState
  }
}

interface IModalState {
  active: boolean
  modal?: IModal
}

export interface IModal {
  modal: React.FC<any>
  props?: any
}

export type ModalPositionType = 'top' | 'center'

export type IModalAction =
  | {
      type: ModalTypes.SET_ACTIVE
      payload: boolean
    }
  | {
      type: ModalTypes.SET_MODAL
      payload: IModal
    }

type ModalDispatch = ThunkDispatch<IModalState, undefined, IModalAction>

const modalActions = {
  open,
  close
}

export const useModalState = () => useSelector<IModalState>('list')
export const useModalActions = () => ({
  modalActions,
  dispatch: useDispatch<ModalDispatch>()
})
