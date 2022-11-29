export interface Token {
  store: {
    id: string
  }
  user: {
    id: string
    name: string
    email: string
    roleType: string
  }
}
