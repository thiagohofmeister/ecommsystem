import { withModal } from 'hocs/withModal/withModal'
import { Fragment, useCallback, useMemo } from 'react'

import Button from './Button'

export const DeleteModal = withModal<DeleteModalProps>(
  ({ Header, CloseButton, Body, Footer, close, ...props }) => {
    const onDelete = useCallback(() => {
      props.onDelete()
      close()
    }, [close, props])

    const messages = useMemo(() => {
      if (typeof props.message === 'string') return [props.message]
      return [...props.message]
    }, [props])

    return (
      <Fragment>
        <Header
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          fontWeight="bold"
          fontSize="30px">
          <span>{props.title}</span>
          <CloseButton />
        </Header>
        <Body>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </Body>
        <Footer>
          <Button onClick={close} label="Cancelar" />
          <Button
            onClick={onDelete}
            style={{ padding: '6px 20px', marginLeft: 10 }}
            label="Deletar"
          />
        </Footer>
      </Fragment>
    )
  }
)

type DeleteModalProps = {
  title: string
  message: string | string[]
  onDelete: () => void
}
