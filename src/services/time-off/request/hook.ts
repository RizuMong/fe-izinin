import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createRequestTimeOff, getRequestTimeOffList, submitRequestTimeOff } from "./api"
import { toast } from "sonner"

// GET LIST
export const useRequestTimeOffList = () => {
  return useQuery({
    queryKey: ["time-off-request"],
    queryFn: () => getRequestTimeOffList(),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// CREATE
export const useCreateRequestTimeOff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRequestTimeOff,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["time-off-request"] })
      toast.success(data.message || "Request time off berhasil dibuat")
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// SUBMIT
export const useSubmitRequestTimeOff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitRequestTimeOff,

    onSuccess: (data) => {
      // Invalidate to refresh the table automatically
      queryClient.invalidateQueries({ queryKey: ["time-off-request"] })
      toast.success(data.message || "Berhasil submit request time off")
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Terjadi kesalahan saat submit request"
      toast.error(message)
    },
  })
}