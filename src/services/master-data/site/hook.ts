import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Site } from "./types"
import { getSiteList, createSite, updateSite, deleteSite } from "./api"
import { toast } from "sonner"

export const useSiteList = () => {
  return useQuery<Site[]>({
    queryKey: ["site"],
    queryFn: getSiteList,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateSite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["site"] })
      toast.success(data?.message || "Site berhasil dibuat")
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

export const useUpdateSite = () => {export const useUpdateSite = () => {export const  useMutation({
    mutationFn: updateSite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["site"] })
      toast.success(data?.message || "Site berhasil diupdate")
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

export const useDeleteSite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["site"] })
      toast.success(data?.message || "Site berhasil dihapus")
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
