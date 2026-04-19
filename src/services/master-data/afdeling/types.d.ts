import { PaginationMeta } from "@/services/base-types"

export type Afdeling = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type AfdelingResponse = {
  data: Afdeling[]
  meta: PaginationMeta
  message: string
  error: boolean
}

export type CreateAfdelingPayload = {
  name: string
}

export type UpdateAfdelingPayload = {
  id: number
  name: string
}

export type DeleteAfdelingPayload = {
  id: number
}