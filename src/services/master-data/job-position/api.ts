import { client } from "@/services/auth/client"
import type {
  JobPosition,
  CreateJobPositionPayload,
  UpdateJobPositionPayload,
  DeleteJobPositionPayload,
} from "./types"

export const getJobPositionList = async (): Promise<JobPosition[]> => {
  const res = await client.get("/job-position")
  return res.data.data
}

export const createJobPosition = async (payload: CreateJobPositionPayload) => {
  const res = await client.post("/job-position", payload)

  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}

export const updateJobPosition = async (payload: UpdateJobPositionPayload) => {
  const res = await client.put(`/job-position/${payload.id}`, {
    name: payload.name,
  })

  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}

export const deleteJobPosition = async (payload: DeleteJobPositionPayload) => {
  const res = await client.delete(`/job-position/${payload.id}`)

  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}
