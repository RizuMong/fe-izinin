import { useQuery } from "@tanstack/react-query"
import { User, UserResponse } from "./types"
import { getUserList } from "./api"

// GET LIST
export const useUserList = (params?: { page?: number; limit?: number }) => {
  return useQuery<UserResponse>({
    queryKey: ["user", params],
    queryFn: () => getUserList(params),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
