import { client } from "@/services/auth/client"
import type {
  TimeOffEmployee,
  TimeOffEmployeeResponse,
  CreateTimeOffEmployeePayload,
  UpdateTimeOffEmployeePayload,
  DeleteTimeOffEmployeePayload,
} from "./types"

// GET LIST
export const getTimeOffEmployees = async (params?: {
  page?: number
  limit?: number
}): Promise<TimeOffEmployeeResponse> => {
  const res = await client.get("/time-off/employee", { params })

  return res.data
}

// CREATE
export const createTimeOffEmployee = async (
  payload: CreateTimeOffEmployeePayload
) => {
  const res = await client.post("/time-off/employee", payload)

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

// UPDATE
export const updateTimeOffEmployee = async (
  payload: UpdateTimeOffEmployeePayload
) => {
  const res = await client.put(`/time-off/employee/${payload.id}`, {
    employee_id: payload.employee_id,
    timeoff_id: payload.timeoff_id,
    period: payload.period,
    total_quota: payload.total_quota,
    remaining_balance: payload.remaining_balance,
    used_quota: payload.used_quota,
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
export const deleteTimeOffEmployee = async (
  payload: DeleteTimeOffEmployeePayload
) => {
  const res = await client.delete(`/time-off/employee/${payload.id}`)

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

// GET EMPLOYEES
export const getEmployees = async (params?: { page?: number; limit?: number }) => {
  const res = await client.get("/employee", { params })
  return res.data
}

// GET TIME-OFFS
export const getTimeOffs = async (params?: { page?: number; limit?: number }) => {
  const res = await client.get("/time-off", { params })
  return res.data
}
