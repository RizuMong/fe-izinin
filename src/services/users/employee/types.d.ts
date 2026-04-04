export type Employee = {
  id: number
  full_name: string
  npk: string
  site_id: number
  afdeling_id: number
  job_position_id: number
  tmk: string
  created_at: string
  updated_at: string
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type EmployeeResponse = {
  data: Employee[]
  meta: PaginationMeta
  message: string
  error: boolean
}

export type CreateEmployeePayload = {
  full_name: string
  npk: string
  site_id: number
  afdeling_id: number
  job_position_id: number
  tmk: string
}

export type UpdateEmployeePayload = {
  id: number
  full_name: string
  npk: string
  site_id: number
  afdeling_id: number
  job_position_id: number
  tmk: string
}

export type DeleteEmployeePayload = {
  id: number
}
