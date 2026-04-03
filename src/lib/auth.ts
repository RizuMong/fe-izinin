import { createClient } from "@/lib/supabase/client";

export const getCurrentUser = async () => {
  console.log("👉 getCurrentUser called")

  const supabase = createClient()

  const { data, error } = await supabase.auth.getSession()

  console.log("👉 session result:", data, error)

  return data.session?.user ?? null
}

export const signOut = async () => {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) throw error
}