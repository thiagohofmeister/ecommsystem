export interface Route {
  label: string
  path: string
  withoutLayout?: boolean
  index?: boolean
  component?: React.ReactNode | null
  items?: { [key: string]: Route }
}
