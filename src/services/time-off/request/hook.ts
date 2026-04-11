import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createRequestTimeOff, getRequestTimeOffList, getApprovalRequestTimeOffList, submitRequestTimeOff, approveRequestTimeOff, rejectRequestTimeOff, getRequestTimeOffListWithFilter } from "./api"
import { toast } from "sonner"
import { FilterRequestTimeOffParams } from "./types"

// GET LIST
export const useRequestTimeOffList = () => {
  return useQuery({
    queryKey: ["time-off-request"],
    queryFn: () => getRequestTimeOffList(),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// GET APPROVAL LIST
export const useApprovalRequestTimeOffList = () => {
  return useQuery({
    queryKey: ["time-off-request", "approval"], 
    queryFn: () => getApprovalRequestTimeOffList(),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
};

// GET LIST WITH FILTER
export const useRequestTimeOffListWithFilter = (params: FilterRequestTimeOffParams) => {
  return useQuery({
    queryKey: ["time-off-request", "filter", params],
    queryFn: () => getRequestTimeOffListWithFilter(params),
    refetchOnWindowFocus: false,
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

// APPROVE
export const useApproveRequestTimeOff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: string }) => 
      approveRequestTimeOff(id, { comment }),
    onSuccess: (data) => {
      // Invalidate query to refresh table and detail logs
      queryClient.invalidateQueries({ queryKey: ["time-off-request"] })
      toast.success(data.message || "Berhasil approve request")
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan saat approve request"
      toast.error(message)
    },
  })
}

export const useRejectRequestTimeOff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: string }) => 
      rejectRequestTimeOff(id, { comment }),
    onSuccess: (data) => {
      // Invalidate to refresh both list and detail view immediately
      queryClient.invalidateQueries({ queryKey: ["time-off-request"] })
      toast.success(data.message || "Berhasil reject request")
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan saat reject request"
      toast.error(message)
    },
  })
}