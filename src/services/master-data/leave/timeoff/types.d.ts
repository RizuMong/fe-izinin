export type TimeOff = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type TimeOffResponse = {
  data: TimeOff[]
  meta: PaginationMeta
  message: string
  error: boolean
}
