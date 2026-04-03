import { create } from "zustand"
import type { User } from "@supabase/supabase-js"

type UserStore = {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (val: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (val) => set({ isLoading: val }),
}))