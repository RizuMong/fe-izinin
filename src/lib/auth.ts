import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export const getCurrentUser = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getSession()

  return data.session?.user ?? null
}

export const signOut = async () => {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

export const signOutAndRedirect = async () => {
  try {
    await signOut()
  } catch {
    // ignore errors in sign out path
  }

  if (typeof window !== "undefined") {
    window.location.replace("/auth/login")
  }
}
