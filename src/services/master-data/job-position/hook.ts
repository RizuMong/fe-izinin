import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { JobPosition, JobPositionResponse } from "./types"
import {
  getJobPositionList,
  createJobPosition,
  updateJobPosition,
  deleteJobPosition,
} from "./api"
import { toast } from "sonner"

export const useJobPositionList = (params?: {
  page?: number
  limit?: number
}) => {
  return useQuery<JobPositionResponse>({
    queryKey: ["job-position", params],
    queryFn: () => getJobPositionList(params),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateJobPosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createJobPosition,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["job-position"] })
      toast.success(data?.message || "Job position berhasil dibuat")
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

export const useUpdateJobPosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateJobPosition,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["job-position"] })
      toast.success(data?.message || "Job position berhasil diupdate")
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

export const useDeleteJobPosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteJobPosition,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["job-position"] })
      toast.success(data?.message || "Job position berhasil dihapus")
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
