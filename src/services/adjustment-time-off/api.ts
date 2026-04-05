import { client } from "@/services/auth/client"
import type {
  Adjustment,
  CreateAdjustmentPayload,
  UpdateAdjustmentPayload,
  DeleteAdjustmentPayload,
  PaginationMeta,
} from "./types"

// GET LIST
export const getAdjustmentList = async (params?: {
  page?: number
  limit?: number
}): Promise<{ data: Adjustment[]; meta: PaginationMeta }> => {
  const res = await client.get("/adjustment-time-off/employee", {
    params,
  })

  return {
    data: res.data.data,
    meta: res.data.meta,
  }
}

// CREATE
export const createAdjustment = async (payload: CreateAdjustmentPayload) => {
  const res = await client.post("/adjustment-time-off/employee", payload)

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
export const updateAdjustment = async (payload: UpdateAdjustmentPayload) => {
  const { id, ...data } = payload
  const res = await client.put(`/adjustment-time-off/employee/${id}`, data)

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
export const deleteAdjustment = async (payload: DeleteAdjustmentPayload) => {
  const res = await client.delete(
    `/adjustment-time-off/employee/${payload.id}`
  )

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
