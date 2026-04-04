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

export type LeaveResponse = {
  data: Leave[]
  meta: PaginationMeta
  message: string
  error: boolean
}

export type CreateLeavePayload = {
  name: string
  timeoff_type: string
}

export type UpdateLeavePayload = {
  id: number
  name: string
  timeoff_type: string
}

export type DeleteLeavePayload = {
  id: number
}