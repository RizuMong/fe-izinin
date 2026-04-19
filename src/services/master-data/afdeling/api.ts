import { client } from "@/services/auth/client"
import type {
  Afdeling,
  AfdelingResponse,
  CreateAfdelingPayload,
  UpdateAfdelingPayload,
  DeleteAfdelingPayload,
} from "./types"

// GET LIST
export const getAfdelingList = async (params?: {
  page?: number
  limit?: number
}): Promise<AfdelingResponse> => {
  const res = await client.get("/afdeling", { params })

  return res.data
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

  // handle error dari backend
  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}

// DELETE
export const deleteAfdeling = async (payload: DeleteAfdelingPayload) => {
  const res = await client.delete(`/afdeling/${payload.id}`)

  // handle error dari backend
  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}