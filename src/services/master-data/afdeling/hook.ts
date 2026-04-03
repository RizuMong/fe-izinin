import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Afdeling } from "./types"
import {
  getAfdelingList,
  createAfdeling,
  updateAfdeling,
  deleteAfdeling,
} from "./api"

// GET LIST
export const useAfdelingList = () => {
  return useQuery<Afdeling[]>({
    queryKey: ["afdeling"],
    queryFn: getAfdelingList,
  })
}

// CREATE
export const useCreateAfdeling = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAfdeling,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["afdeling"] })
    },
  })
}

// UPDATE
export const useUpdateAfdeling = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAfdeling,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["afdeling-list"] })
    },
  })
}

// DELETE
export const useDeleteAfdeling = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAfdeling,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["afdeling-list"] })
    },
  })
}