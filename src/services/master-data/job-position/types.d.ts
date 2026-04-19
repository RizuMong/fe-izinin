import { PaginationMeta } from "@/services/base-types"

export type JobPosition = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type JobPositionResponse = {
  data: JobPosition[]
  meta: PaginationMeta
  message: string
  error: boolean
}

export type CreateJobPositionPayload = {
  name: string
}

export type UpdateJobPositionPayload = {
  id: number
  name: string
}

export type DeleteJobPositionPayload = {
  id: number
}
