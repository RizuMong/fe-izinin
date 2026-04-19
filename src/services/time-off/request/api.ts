import { client } from "@/services/auth/client"
import type { CreateRequestTimeOffPayload, RequestTimeOff, ApproveRequestTimeOffPayload,FilterRequestTimeOffParams, PaginationMeta } from "./types"

// GET LIST (DRAFT and SUBMITTED only)
export const getRequestTimeOffList = async (params?: {
  page?: number
  limit?: number
}): Promise<{ data: RequestTimeOff[]; meta: PaginationMeta }> => {
  const res = await client.get("/time-off-request/request", {
    params: {
      ...params,
      status: "DRAFT,SUBMITTED",
    },
  })

  return {
    data: res.data.data,
    meta: res.data.meta,
  }
}

// GET APPROVAL LIST (Using new dedicated approval endpoint)
export const getApprovalRequestTimeOffList = async (params?: {
  page?: number
  limit?: number
}): Promise<{ data: RequestTimeOff[]; meta: PaginationMeta }> => {
  const res = await client.get("/time-off-approval", {
    params,
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

  const res = await client.get("/time-off-request/history/all", {
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

// CANCEL
export const cancelRequestTimeOff = async (id: number) => {
  const res = await client.put(`/time-off-request/cancel/${id}`, {})

  if (res.data?.success === false) {
    throw {
      response: {
        data: res.data,
      },
    }
  }

  return res.data
}