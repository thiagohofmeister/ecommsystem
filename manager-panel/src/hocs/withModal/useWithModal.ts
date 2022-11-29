import { makeStyles, Theme } from '@material-ui/core'
import { useCallback } from 'react'
import { useModalActions } from 'store/modalDuck'

import { WithModalStyledProps } from './withModal'

const useStyles = makeStyles<
  Theme,
  WithModalStyledProps,
  'container' | 'header' | 'closeButton' | 'body' | 'footer'
>(
  theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: 25,
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0px 3px 21px #00000029',
      borderRadius: 3,
      alignSelf: ({ position }) => (position === 'center' ? 'center' : 'flex-start'),
      marginTop: ({ position }) => (position === 'center' ? 'unset' : 100)
    },
    header: {
      marginBottom: 20
    },
    closeButton: {
      cursor: 'pointer'
    },
    body: {
      marginBottom: 20,
      fontSize: 14,
      lineHeight: '26px'
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 20
    }
  }),
  { name: 'withModal' }
)

export const useWithModal = (props?: WithModalStyledProps) => {
  const classes = useStyles({ position: props?.position || 'center' })
  const { dispatch, modalActions } = useModalActions()

  const closeModal = useCallback(() => {
    dispatch(modalActions.close())
  }, [dispatch, modalActions])

  return {
    classes,
    closeModal
  }
}
