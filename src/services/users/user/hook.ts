import { useQuery } from "@tanstack/react-query"
import { User } from "./types"
import { getUserList } from "./api"

// GET LIST
export const useUserList = () => {
  return useQuery<User[]>({
    queryKey: ["user"],
    queryFn: getUserList,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
