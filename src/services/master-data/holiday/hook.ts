import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Holiday } from "./types"
import {
  getHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from "./api"
import { toast } from "sonner"

// GET LIST
export const useHolidayList = () => {
  return useQuery<Holiday[]>({
    queryKey: ["holiday"],
    queryFn: getHolidays,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// CREATE
export const useCreateHoliday = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createHoliday,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["holiday"] })
      toast.success(data.message || "Holiday berhasil dibuat")
      onSuccess?.()
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// UPDATE
export const useUpdateHoliday = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateHoliday,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["holiday"] })
      toast.success(data.message || "Holiday berhasil diupdate")
      onSuccess?.()
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
    },
  })
}

// DELETE
export const useDeleteHoliday = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteHoliday,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["holiday"] })
      toast.success(data.message || "Holiday berhasil dihapus")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}