import axios from "axios"
import { createClient } from "@/lib/supabase/client"

export const client = axios.create({
  baseURL: "/api",
})

// inject access token ke setiap request
client.interceptors.request.use(async (config) => {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()

  const token = data.session?.access_token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
