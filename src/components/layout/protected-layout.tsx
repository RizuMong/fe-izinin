"use client"

import { useUserStore } from "@/store/user.store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUserStore()
  const router = useRouter()

  console.log("🧠 ProtectedLayout:", { user, isLoading })

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth/login")
    }
  }, [user, isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}