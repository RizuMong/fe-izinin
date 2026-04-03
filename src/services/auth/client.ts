import axios from "axios"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/lib/auth"

export const client = axios.create({
  baseURL: "/api",
})

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.replace("/auth/login")
  }
}

const refreshSession = async () => {
  const supabase = createClient()
  const { data, error: refreshError } = await supabase.auth.refreshSession()

  if (refreshError) {
    throw refreshError
  }

  if (!data.session) {
    throw new Error("Session refresh failed")
  }

  return data.session.access_token
}

// inject access token ke setiap request
client.interceptors.request.use(async (config) => {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()

  const token = data.session?.access_token

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        const newToken = await refreshSession()

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }

        return client(originalRequest)
      } catch (_err) {
        await signOut().catch(() => undefined)
        redirectToLogin()
        return Promise.reject(new Error("Invalid or expired session, redirecting to login"))
      }
    }

    if (error?.response?.status === 401) {
      await signOut().catch(() => undefined)
      redirectToLogin()
    }

    return Promise.reject(error)
  }
)
