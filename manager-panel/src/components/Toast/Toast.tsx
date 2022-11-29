import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { toast } from 'react-toastify'

export function toastSuccess(message: string) {
  return toast.success(message, {
    icon: () => <CheckCircleIcon />
  })
}

export function toastError(message: string) {
  return toast.error(message)
}

export function toastWarn(message: string) {
  return toast.warn(message)
}

export function toastInfo(message: string) {
  return toast.info(message)
}
