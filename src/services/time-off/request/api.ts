import { client } from "@/services/auth/client"
import type { CreateRequestTimeOffPayload, RequestTimeOff, ApproveRequestTimeOffPayload,FilterRequestTimeOffParams, PaginationMeta } from "./types"

// GET LIST (ONLY DRAFT)
export const getRequestTimeOffList = async (params?: {
  page?: number
  limit?: number
}): Promise<{ data: RequestTimeOff[]; meta: PaginationMeta }> => {
  const res = await client.get("/time-off-request", {
    params: {
      ...params,
      status: "DRAFT",
    },
  })

  return {
    data: res.data.data,
    meta: res.data.meta,
  }
}

// GET APPROVAL LIST (Filtered by SUBMITTED and APPROVED)
export const getApprovalRequestTimeOffList = async (params?: {
  page?: number
  limit?: number
}): Promise<{ data: RequestTimeOff[]; meta: PaginationMeta }> => {
  const res = await client.get("/time-off-request", {
    params: {
      ...params,
      status: "SUBMITTED", 
    },
  })

  return {
    data: res.data.data,
    meta: res.data.meta,
  }
}

// GET LIST WITH FILTER
export const getRequestTimeOffListWithFilter = async (
  params?: FilterRequestTimeOffParams
): Promise<{ data: RequestTimeOff[]; meta: PaginationMeta }> => {
  
  const queryParams: any = { ...params }

  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] === "" || queryParams[key] === undefined || queryParams[key] === null) {
      delete queryParams[key]
    }
  })
  
  if (params?.status && params.status.length > 0) {
    queryParams.status = params.status.join(",")
  } else {
    delete queryParams.status
  }

  const res = await client.get("/time-off-request", {
    params: queryParams,
  })

  return {
    data: res.data.data,
    meta: res.data.meta,
  }
}

// CREATE
export const createRequestTimeOff = async (payload: CreateRequestTimeOffPayload) => {
  const res = await client.post("/time-off-request", payload)

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

// SUBMIT
export const submitRequestTimeOff = async (id: number) => {
  const res = await client.put(`/time-off-request/submit/${id}`, {})

  // handle error dari backend sesuai existing pattern
  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}

// APPROVE
export const approveRequestTimeOff = async (id: number, payload: ApproveRequestTimeOffPayload) => {
  const res = await client.put(`/time-off-request/approve/${id}`, payload)

  // handle error dari backend sesuai existing pattern
  if (res.data?.error) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}

// REJECT 
export const rejectRequestTimeOff = async (id: number, payload: { comment: string }) => {
  const res = await client.put(`/time-off-request/reject/${id}`, payload)
  if (res.data?.error) {
    throw { response: { data: res.data } }
  }
  return res.data
}