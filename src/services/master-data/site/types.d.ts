export type Site = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type CreateSitePayload = {
  name: string
}

export type UpdateSitePayload = {
  id: number
  name: string
}

export type DeleteSitePayload = {
  id: number
}
