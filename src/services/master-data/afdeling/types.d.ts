export type Afdeling = {
  id: number
  name: string
  created_at: string
  updated_at: string
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