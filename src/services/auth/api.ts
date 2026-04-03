import { client } from "./client"
import { createClient } from "@/lib/supabase/client"

export type ApiResponse<T> = {
  data: T
  message?: string
}

export const getCurrentUser = async () => {
  const supabase = createClient()

  const { data } = await supabase.auth.getSession()

  return data.session?.user ?? null
}

// helper error handler
const handleError = (error: any): never => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Request failed"

  throw new Error(message)
}

// GET
export const apiGet = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  try {
    const res = await client.get<ApiResponse<T>>(url, { params })
    return res.data.data
  } catch (error) {
    return handleError(error)
  }
}

// POST
export const apiPost = async <T>(
  url: string,
  payload?: any
): Promise<T> => {
  try {
    const res = await client.post<ApiResponse<T>>(url, payload)
    return res.data.data
  } catch (error) {
    return handleError(error)
  }
}

// PUT
export const apiPut = async <T>(
  url: string,
  payload?: any
): Promise<T> => {
  try {
    const res = await client.put<ApiResponse<T>>(url, payload)
    return res.data.data
  } catch (error) {
    return handleError(error)
  }
}

// PATCH
export const apiPatch = async <T>(
  url: string,
  payload?: any
): Promise<T> => {
  try {
    const res = await client.patch<ApiResponse<T>>(url, payload)
    return res.data.data
  } catch (error) {
    return handleError(error)
  }
}

// DELETE
export const apiDelete = async <T>(url: string): Promise<T> => {
  try {
    const res = await client.delete<ApiResponse<T>>(url)
    return res.data.data
  } catch (error) {
    return handleError(error)
  }
}