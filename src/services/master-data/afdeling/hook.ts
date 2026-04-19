import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Afdeling, AfdelingResponse } from "./types"
import {
  getAfdelingList,
  createAfdeling,
  updateAfdeling,
  deleteAfdeling,
} from "./api"
import { toast } from "sonner"

// GET LIST
export const useAfdelingList = (params?: { page?: number; limit?: number }) => {
  return useQuery<AfdelingResponse>({
    queryKey: ["afdeling", params],
    queryFn: () => getAfdelingList(params),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// CREATE
export const useCreateAfdeling = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAfdeling,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["afdeling"] })
      toast.success(data.message || "Afdeling berhasil dibuat")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// UPDATE
export const useUpdateAfdeling = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAfdeling,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["afdeling"] })
      toast.success(data.message || "Afdeling berhasil diupdate")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// DELETE
export const useDeleteAfdeling = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAfdeling,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["afdeling"] })
      toast.success(data.message || "Afdeling berhasil dihapus")
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}