import { ReactNode } from "react"

export type IDName = {
  [x: string]: ReactNode
  id: number
  name: string
}

export type ApprovalLog = {
  role: string
  email: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  comment: string | null
  approved_at: string | null
  employee_id: number
  approver_name: string
}

export type FilterRequestTimeOffParams = {
  page?: number
  limit?: number
  status?: string[]
  employee_id?: number | string
  timeoff_id?: number | string
  start_date?: string
  end_date?: string
}

export type RequestTimeOffStatus = "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "SUBMITTED"

export type RequestTimeOff = {
  id: number
  employee_id: number
  timeoff_id: number
  start_date: string
  end_date: string
  total_days: number
  reason: string
  status: RequestTimeOffStatus | string
  approval_logs: ApprovalLog[]
  employee: IDName
  time_off: IDName
  created_at: string
  updated_at: string
  created_by_email?: string
  updated_by_email?: string
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

export type ApproveRequestTimeOffPayload = {
  comment: string
}