export type LeaveEmployee = {
  id: number
  employee_id: number
  timeoff_id: number
  period: string
  total_quota: number
  remaining_balance: number
  used_quota: number
  created_at: string
  updated_at: string
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type LeaveEmployeeResponse = {
  data: LeaveEmployee[]
  meta: PaginationMeta
  message: string
  error: boolean
}

export type CreateLeaveEmployeePayload = {
  employee_id: number
  timeoff_id: number
  period: string
  total_quota: number
  remaining_balance: number
  used_quota: number
}

export type UpdateLeaveEmployeePayload = {
  id: number
  employee_id: number
  timeoff_id: number
  period: string
  total_quota: number
  remaining_balance: number
  used_quota: number
}

export type DeleteLeaveEmployeePayload = {
  id: number
}
