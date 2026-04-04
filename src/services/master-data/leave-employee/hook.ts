import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LeaveEmployeeResponse } from "./types"
import {
  getLeaveEmployees,
  createLeaveEmployee,
  updateLeaveEmployee,
  deleteLeaveEmployee,
  getEmployees,
  getTimeOffs,
} from "./api"
import { toast } from "sonner"

// GET LIST
export const useLeaveEmployeeList = (params?: {
  page?: number
  limit?: number
}) => {
  return useQuery<LeaveEmployeeResponse>({
    queryKey: ["leave-employee", params],
    queryFn: () => getLeaveEmployees(params),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// CREATE
export const useCreateLeaveEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createLeaveEmployee,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave-employee"] })
      toast.success(data.message || "Leave Employee berhasil dibuat")
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
export const useUpdateLeaveEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateLeaveEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave-employee"] })
      toast.success(data.message || "Leave Employee berhasil diupdate")
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
export const useDeleteLeaveEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteLeaveEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave-employee"] })
      toast.success(data.message || "Leave Employee berhasil dihapus")
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

// GET EMPLOYEES (for dropdown)
export const useEmployeeList = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// GET TIME-OFFS (for dropdown)
export const useTimeOffList = () => {
  return useQuery({
    queryKey: ["time-offs"],
    queryFn: getTimeOffs,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
