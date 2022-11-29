import CircleSharpIcon from '@mui/icons-material/CircleSharp'

import { DefaultActionItem } from './DefaultActionItem'

export const Activate: React.FC<ActivateProps> = ({ label, onClick }) => (
  <DefaultActionItem
    onClick={onClick}
    label={label}
    icon={<CircleSharpIcon fontSize="inherit" />}
    iconColor="#0CAC6E"
  />
)

type ActivateProps = {
  label: string
  onClick: (() => void) | undefined
}
