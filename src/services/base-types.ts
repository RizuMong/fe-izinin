export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type BaseResponse<T> = {
  data: T
  meta: PaginationMeta
  message?: string
  error?: boolean
}
