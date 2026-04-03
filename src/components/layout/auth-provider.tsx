"use client"

import { useEffect } from "react"
import { getCurrentUser } from "@/lib/auth"
import { useUserStore } from "@/store/user.store"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useUserStore((s) => s.setUser)
  const setLoading = useUserStore((s) => s.setLoading)

  useEffect(() => {
    console.log("🔥 AuthProvider mounted")

    const init = async () => {
      console.log("🚀 init start")

      try {
        const user = await getCurrentUser()

        console.log("✅ user result:", user)

        if (user) {
          setUser({
            id: user.id,
            email: user.email!
          })
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error("❌ error:", err)
        setUser(null)
      }

      console.log("🟡 BEFORE setLoading(false)")
      setLoading(false)
      console.log("🟢 AFTER setLoading(false)")
    }

    init()
  }, [])

  return <>{children}</>
}