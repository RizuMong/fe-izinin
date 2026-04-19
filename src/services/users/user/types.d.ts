export type User = {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmation_sent_at: string
  confirmed_at: string
  last_sign_in_at?: string
  app_metadata: {
    provider: string
    providers: string[]
  }
  user_metadata: {
    email: string
    email_verified: boolean
    phone_verified: boolean
    sub: string
  }
  identities: null | any[]
  created_at: string
  updated_at: string
  is_anonymous: boolean
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type UserResponse = {
  data: User[]
  meta: PaginationMeta
}
