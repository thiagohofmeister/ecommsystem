import { withModal } from 'hocs/withModal/withModal'
import { Fragment, useCallback, useMemo } from 'react'

import Button from './Button'

export const ConfirmationModal = withModal<ConfirmationModalProps>(
  ({ Header, Body, Footer, close, ...props }) => {
    const onConfirm = useCallback(() => {
      props.onConfirm()
      close()
    }, [close, props])

    const messages = useMemo(() => {
      if (typeof props.message === 'string') return [props.message]
      return [...props.message]
    }, [props])

    return (
      <Fragment>
        <Header>
          <span>{props.title}</span>
        </Header>
        <Body>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </Body>
        <Footer>
          <Button color="primary" onClick={onConfirm} style={{ padding: '6px 34px' }} label="Ok" />
          <Button style={{ marginLeft: 10 }} onClick={close} label="Cancelar" />
        </Footer>
      </Fragment>
    )
  }
)

type ConfirmationModalProps = {
  title: string
  message: string | string[]
  onConfirm: () => void
}
