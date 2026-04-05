export type EmployeeId  = {
  id: number,
  full_name: string
}

export type IDName = {
  id: number,
  name: string
} 


export type Adjustment = {
  id: number
  employee_id: EmployeeId
  timeoff_id: IDName
  total_quota: number
  period: string
  operation: "PENAMBAHAN" | "PENGURANGAN"
  created_at: string
  updated_at: string
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type AdjustmentResponse = {
  data: Adjustment[]
  meta: PaginationMeta
  message: string
  error: boolean
}

export type AdjustmentPayload = {
  employee_id: number
  timeoff_id: number
  total_quota: number
  period: string
  operation: "PENAMBAHAN" | "PENGURANGAN"
}

export type CreateAdjustmentPayload = AdjustmentPayload

export type UpdateAdjustmentPayload = {
  id: number
} & AdjustmentPayload

export type DeleteAdjustmentPayload = {
  id: number
}
