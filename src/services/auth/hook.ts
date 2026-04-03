import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/lib/auth"

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  })
}