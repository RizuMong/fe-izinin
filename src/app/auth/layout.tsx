"use client"

import { useUserStore } from "@/store/user.store"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useUserStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const type = searchParams.get("type")
  const accessToken = searchParams.get("access_token")

  const isRecovery =
    type === "recovery" || !!accessToken

  const isResetPage = pathname.includes("reset-password")

  useEffect(() => {
    if (isLoading) return

    if (isResetPage && !isRecovery) {
      router.replace("/login")
      return
    }

    if (user && !isRecovery) {
      router.replace("/time-off/request")
    }
  }, [user, isLoading, isRecovery, isResetPage, router])

  return <>{children}</>
}