import { client } from "@/services/auth/client"
import type {
  Leave,
  TimeOffResponse,
  CreateTimeOffPayload,
  UpdateTimeOffPayload,
  DeleteTimeOffPayload,
} from "./types"

// GET LIST
export const getLeaves = async (params?: {
  page?: number
  limit?: number
}): Promise<TimeOffResponse> => {
  const res = await client.get("/time-off", { params })

  return res.data
}

// CREATE
export const createLeave = async (payload: CreateTimeOffPayload) => {
  const res = await client.post("/time-off", payload)

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
export const updateLeave = async (payload: UpdateTimeOffPayload) => {
  const res = await client.put(`/time-off/${payload.id}`, {
    name: payload.name,
    timeoff_type: payload.timeoff_type,
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
export const deleteLeave = async (payload: DeleteTimeOffPayload) => {
  const res = await client.delete(`/time-off/${payload.id}`)

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