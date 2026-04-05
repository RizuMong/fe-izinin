import { client } from "@/services/auth/client"
import type { User } from "./types"

// GET LIST
export const getUserList = async (): Promise<User[]> => {
  const res = await client.get("/user")

  return res.data.data
}
