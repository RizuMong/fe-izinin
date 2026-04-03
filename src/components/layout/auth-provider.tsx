"use client"

import { useEffect } from "react"
import { getCurrentUser } from "@/lib/auth"
import { useUserStore } from "@/store/user.store"

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const setUser = useUserStore((s) => s.setUser)
  const setLoading = useUserStore((s) => s.setLoading)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const user = await getCurrentUser()

        if (!mounted) return

        setUser(user)
      } catch {
        setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()

    return () => {
      mounted = false
    }
  }, [])

  return <>{children}</>
}