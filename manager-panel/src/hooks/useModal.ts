import { FC, useCallback } from 'react'
import { useModalActions } from 'store/modalDuck'

export const useModal = () => {
  const { dispatch, modalActions } = useModalActions()

  const open = useCallback(
    <Props>(modal: FC<Props>, props: Props) => {
      dispatch(modalActions.open({ modal, props }))
    },
    [dispatch, modalActions]
  )

  return { open }
}
