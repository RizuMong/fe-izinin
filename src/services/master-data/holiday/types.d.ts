export type Holiday = {
  id: number
  name: string
  is_national_holiday: boolean
  date: string
  created_at: string
  updated_at: string
}

export type CreateHolidayPayload = {
  name: string
  is_national_holiday: boolean
  date: string
}

export type UpdateHolidayPayload = {
  id: number
  name: string
  is_national_holiday: boolean
  date: string
}

export type DeleteHolidayPayload = {
  id: number
}