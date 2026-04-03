import { client } from "@/services/auth/client"
import type {
  Site,
  CreateSitePayload,
  UpdateSitePayload,
  DeleteSitePayload,
} from "./types"

// GET LIST
export const getSiteList = async (): Promise<Site[]> => {
  const res = await client.get("/site")

  return res.data.data
}

// CREATE
export const createSite = async (payload: CreateSitePayload) => {
  const res = await client.post("/site", payload)

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
export const updateSite = async (payload: UpdateSitePayload) => {
  const res = await client.put(`/site/${payload.id}`, {
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
export const deleteSite = async (payload: DeleteSitePayload) => {
  const res = await client.delete(`/site/${payload.id}`)

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