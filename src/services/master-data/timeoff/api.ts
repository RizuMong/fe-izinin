import { client } from "@/services/auth/client"
import type { TimeOffResponse } from "./types"

// GET LIST
export const getTimeOffList = async (params?: {
  page?: number
  limit?: number
}): Promise<TimeOffResponse> => {
  const res = await client.get("/time-off", { params })
  return res.data
}
