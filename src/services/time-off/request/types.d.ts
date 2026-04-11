export type IDName = {
  id: number
  name: string  
}

export type RequestTimeOff = {
  id: number
  employee_id: number
  timeoff_id: number
  employee: IDName
  time_off: IDName
  start_date: string
  end_date: string
  reason: string
  created_at: string
  updated_at: string
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type RequestTimeOffResponse = {
  data: RequestTimeOff[]
  meta: PaginationMeta
  message: string
  error: boolean
}

export type RequestTimeOffPayload = {
  employee_id: number
  timeoff_id: number
  start_date: string
  end_date: string
  reason: string
}

export type CreateRequestTimeOffPayload = RequestTimeOffPayload