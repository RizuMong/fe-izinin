import { client } from "@/services/auth/client"
import type { CreateRequestTimeOffPayload, RequestTimeOff, PaginationMeta } from "./types"

// GET LIST
export const getRequestTimeOffList = async (params?: {
  page?: number
  limit?: number
}): Promise<{ data: RequestTimeOff[]; meta: PaginationMeta }> => {
  const res = await client.get("/time-off-request", {
    params,
  })

  return {
    data: res.data.data,
    meta: res.data.meta,
  }
}

// CREATE
export const createRequestTimeOff = async (payload: CreateRequestTimeOffPayload) => {
  const res = await client.post("/time-off-request", payload)

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