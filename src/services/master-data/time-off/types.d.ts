export type Leave = {
  id: number
  created_at: string
  updated_at: string
  name: string
  timeoff_type: string
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type TimeOffResponse = {
  data: Leave[]
  meta: PaginationMeta
  message: string
  error: boolean
}

export type CreateTimeOffPayload = {
  name: string
  timeoff_type: string
}

export type UpdateTimeOffPayload = {
  id: number
  name: string
  timeoff_type: string
}

export type DeleteTimeOffPayload = {
  id: number
}