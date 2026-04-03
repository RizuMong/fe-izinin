import { client } from "@/services/auth/client"
import type {
  Afdeling,
  CreateAfdelingPayload,
  UpdateAfdelingPayload,
  DeleteAfdelingPayload,
} from "./types"

// GET LIST
export const getAfdelingList = async (): Promise<Afdeling[]> => {
  const res = await client.get("/afdeling")

  return res.data.data
}

// CREATE
export const createAfdeling = async (payload: { name: string }) => {
  const res = await client.post("/afdeling", payload)

  // handle error dari backend
  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data // { data, message, error }
}

// UPDATE
export const updateAfdeling = async (payload: UpdateAfdelingPayload) => {
  const res = await client.put(`/afdeling/${payload.id}`, {
    name: payload.name,
  })
  return res.data
}

// DELETE
export const deleteAfdeling = async (payload: DeleteAfdelingPayload) => {
  const res = await client.delete(`/afdeling/${payload.id}`)
  return res.data
}