import { QueryParamsFilter } from './QueryParamsFilter'

export interface QueryParams<Params = DefaultQueryParams> {
  filters?: QueryParamsFilter
  params?: Params
}

export interface DefaultQueryParams {
  page: number
  size: number
  search?: string
}
