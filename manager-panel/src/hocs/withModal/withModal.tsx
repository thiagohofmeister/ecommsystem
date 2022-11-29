import { Box, BoxProps } from '@material-ui/core'
import { FC, useCallback } from 'react'
import { ModalPositionType } from 'store/modalDuck'

import { useWithModal } from './useWithModal'

export const withModal =
  <Props extends object>(WrappedComponent: FC<WithModalProps<Props>>) =>
  (props: Props & WithModalStyledProps) => {
    const { classes, closeModal } = useWithModal(props)

    const Container = useCallback<FC<BoxProps>>(
      ({ children }) => (
        <Box onClick={e => e.stopPropagation()} className={classes.container}>
          {children}
        </Box>
      ),
      [classes]
    )

    const Header = useCallback<FC<BoxProps>>(
      ({ children, ...props }) => (
        <Box className={classes.header} {...props}>
          {children}
        </Box>
      ),
      [classes]
    )

    const CloseButton = useCallback<FC>(() => {
      return <div onClick={closeModal} className={classes.closeButton}></div>
    }, [closeModal, classes.closeButton])

    const Body = useCallback<FC<BoxProps>>(
      ({ children, ...props }) => (
        <Box className={classes.body} {...props}>
          {children}
        </Box>
      ),
      [classes]
    )

    const Footer = useCallback<FC<BoxProps>>(
      ({ children, ...props }) => (
        <Box className={classes.footer} {...props}>
          {children}
        </Box>
      ),
      [classes]
    )

    return (
      <Container>
        <WrappedComponent
          {...props}
          Header={Header}
          CloseButton={CloseButton}
          Body={Body}
          Footer={Footer}
          close={closeModal}
        />
      </Container>
    )
  }

export type WithModalStyledProps = {
  position?: ModalPositionType
  className?: string
}

export type WithModalProps<Props> = Props & {
  Header: FC<BoxProps>
  CloseButton: FC
  Body: FC<BoxProps>
  Footer: FC<BoxProps>
  close: () => void
}
