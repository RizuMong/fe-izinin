import { client } from "@/services/auth/client"
import type { User, UserResponse } from "./types"

// GET LIST
export const getUserList = async (params?: {
  page?: number
  limit?: number
}): Promise<UserResponse> => {
  const res = await client.get("/user", { params })

  return res.data
}
