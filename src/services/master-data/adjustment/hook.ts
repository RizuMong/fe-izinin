import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Adjustment } from "./types"
import {
  getAdjustmentList,
  createAdjustment,
  updateAdjustment,
  deleteAdjustment,
} from "./api"
import { toast } from "sonner"

// GET LIST
export const useAdjustmentList = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["adjustment-time-off", params],
    queryFn: () => getAdjustmentList(params),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// CREATE
export const useCreateAdjustment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAdjustment,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["adjustment-time-off"] })
      toast.success(data.message || "Adjustment berhasil dibuat")
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

// UPDATE
export const useUpdateAdjustment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAdjustment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["adjustment-time-off"] })
      toast.success(data.message || "Adjustment berhasil diupdate")
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

// DELETE
export const useDeleteAdjustment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAdjustment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["adjustment-time-off"] })
      toast.success(data.message || "Adjustment berhasil dihapus")
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
