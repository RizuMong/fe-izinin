import { useQuery } from "@tanstack/react-query"
import { TimeOffResponse } from "./types"
import { getTimeOffList } from "./api"

// GET LIST
export const useTimeOffList = (params?: { page?: number; limit?: number }) => {
  return useQuery<TimeOffResponse>({
    queryKey: ["timeoff", params],
    queryFn: () => getTimeOffList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
