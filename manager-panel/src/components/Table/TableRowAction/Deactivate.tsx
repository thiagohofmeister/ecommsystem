import CircleSharpIcon from '@mui/icons-material/CircleSharp'

import { DefaultActionItem } from './DefaultActionItem'

export const Deactivate: React.FC<DeactivateProps> = ({ label, onClick }) => (
  <DefaultActionItem
    onClick={onClick}
    label={label}
    icon={<CircleSharpIcon fontSize="inherit" />}
    iconColor="#ff496a"
  />
)

type DeactivateProps = {
  label: string
  onClick: (() => void) | undefined
}
