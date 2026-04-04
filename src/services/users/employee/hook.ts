import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EmployeeResponse } from "./types"
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api"
import { toast } from "sonner"

// GET LIST
export const useEmployeeList = (params?: { page?: number; limit?: number }) => {
  return useQuery<EmployeeResponse>({
    queryKey: ["employee", params],
    queryFn: () => getEmployees(params),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// CREATE
export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employee"] })
      toast.success(data.message || "Employee berhasil dibuat")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// UPDATE
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employee"] })
      toast.success(data.message || "Employee berhasil diupdate")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// DELETE
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employee"] })
      toast.success(data.message || "Employee berhasil dihapus")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}
