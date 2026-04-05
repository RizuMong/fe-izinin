"use client"

import { useUserStore } from "@/store/user.store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/time-off/request")
    }
  }, [user, isLoading, router])

  if (isLoading) return null

  return <>{children}</>
}