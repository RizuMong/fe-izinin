import { client } from "@/services/auth/client"
import type {
  Holiday,
  HolidayResponse,
  CreateHolidayPayload,
  UpdateHolidayPayload,
  DeleteHolidayPayload,
} from "./types"

// GET LIST
export const getHolidays = async (params?: {
  page?: number
  limit?: number
}): Promise<HolidayResponse> => {
  const res = await client.get("/holiday", { params })

  return res.data
}

// CREATE
export const createHoliday = async (payload: CreateHolidayPayload) => {
  const res = await client.post("/holiday", payload)

  // handle error dari backend
  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data // { data, message, error }
}

// UPDATE
export const updateHoliday = async (payload: UpdateHolidayPayload) => {
  const res = await client.put(`/holiday/${payload.id}`, {
    name: payload.name,
    is_national_holiday: payload.is_national_holiday,
    date: payload.date,
  })

  // handle error dari backend
  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}

// DELETE
export const deleteHoliday = async (payload: DeleteHolidayPayload) => {
  const res = await client.delete(`/holiday/${payload.id}`)

  // handle error dari backend
  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}