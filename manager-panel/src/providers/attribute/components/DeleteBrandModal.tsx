import { DeleteModal } from 'components/DeleteModal'
import { ModalPositionType } from 'store/modalDuck'

export const DeleteBrandModal = ({ onDelete, position }: DeleteBrandModalProps) => {
  return (
    <DeleteModal
      title="Excluir Marca"
      message="Ao excluir a Marca esta ação não será reversível."
      onDelete={onDelete}
      position={position}
    />
  )
}

export type DeleteBrandModalProps = {
  onDelete: () => void
  position?: ModalPositionType
}
