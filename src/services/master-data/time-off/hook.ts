import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TimeOffResponse } from "./types"
import {
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
} from "./api"
import { toast } from "sonner"

// GET LIST
export const useTimeOffList = (params?: { page?: number; limit?: number }) => {
  return useQuery<TimeOffResponse>({
    queryKey: ["leave", params],
    queryFn: () => getLeaves(params),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// CREATE
export const useCreateTimeOff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createLeave,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave"] })
      toast.success(data.message || "Leave berhasil dibuat")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// UPDATE
export const useUpdateTimeOff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateLeave,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave"] })
      toast.success(data.message || "Leave berhasil diupdate")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// DELETE
export const useDeleteTimeOff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteLeave,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave"] })
      toast.success(data.message || "Leave berhasil dihapus")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}