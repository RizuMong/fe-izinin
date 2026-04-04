import { client } from "@/services/auth/client"
import type {
  LeaveEmployee,
  LeaveEmployeeResponse,
  CreateLeaveEmployeePayload,
  UpdateLeaveEmployeePayload,
  DeleteLeaveEmployeePayload,
} from "./types"

// GET LIST
export const getLeaveEmployees = async (params?: {
  page?: number
  limit?: number
}): Promise<LeaveEmployeeResponse> => {
  const res = await client.get("/time-off/employee", { params })

  return res.data
}

// CREATE
export const createLeaveEmployee = async (
  payload: CreateLeaveEmployeePayload
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
export const updateLeaveEmployee = async (
  payload: UpdateLeaveEmployeePayload
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
export const deleteLeaveEmployee = async (
  payload: DeleteLeaveEmployeePayload
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
export const getEmployees = async () => {
  const res = await client.get("/employee")
  return res.data
}

// GET TIME-OFFS
export const getTimeOffs = async () => {
  const res = await client.get("/time-off")
  return res.data
}
