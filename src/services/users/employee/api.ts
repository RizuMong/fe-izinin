import { client } from "@/services/auth/client"
import type {
  Employee,
  EmployeeResponse,
  CreateEmployeePayload,
  UpdateEmployeePayload,
  DeleteEmployeePayload,
} from "./types"

// GET LIST
export const getEmployees = async (params?: {
  page?: number
  limit?: number
}): Promise<EmployeeResponse> => {
  const res = await client.get("/employee", { params })

  return res.data
}

// CREATE
export const createEmployee = async (payload: CreateEmployeePayload) => {
  const res = await client.post("/employee", payload)

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
export const updateEmployee = async (payload: UpdateEmployeePayload) => {
  const res = await client.put(`/employee/${payload.id}`, {
    full_name: payload.full_name,
    npk: payload.npk,
    site_id: payload.site_id,
    afdeling_id: payload.afdeling_id,
    job_position_id: payload.job_position_id,
    tmk: payload.tmk,
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
export const deleteEmployee = async (payload: DeleteEmployeePayload) => {
  const res = await client.delete(`/employee/${payload.id}`)

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
