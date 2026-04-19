import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Site, SiteResponse } from "./types"
import {
  getSiteList,
  createSite,
  updateSite,
  deleteSite,
} from "./api"
import { toast } from "sonner"

interface ApiError {
  response?: {
    data?: {
      message?: string
      error?: string
    }
  }
}

// GET LIST
export const useSiteList = (params?: { page?: number; limit?: number }) => {
  return useQuery<SiteResponse>({
    queryKey: ["site", params],
    queryFn: () => getSiteList(params),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// CREATE
export const useCreateSite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSite,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["site"] })
      toast.success(data.message || "Site berhasil dibuat")
    },

    onError: (error: ApiError) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// UPDATE
export const useUpdateSite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["site"] })
      toast.success(data.message || "Site berhasil diupdate")
    },

    onError: (error: ApiError) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}

// DELETE
export const useDeleteSite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["site"] })
      toast.success(data.message || "Site berhasil dihapus")
    },

    onError: (error: ApiError) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || "Terjadi kesalahan"
      toast.error(message)
    },
  })
}
