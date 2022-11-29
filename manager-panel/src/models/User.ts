export interface User {
  id: string
  name: string
  documentNumber: string
  email: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
}
