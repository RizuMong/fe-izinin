"use client"

import { useUserStore } from "@/store/user.store"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

const RECOVERY_PATHS = ["/auth/update-password"]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useUserStore()
  const router = useRouter()
  const pathname = usePathname()

  const isRecoveryPage = RECOVERY_PATHS.includes(pathname)

  useEffect(() => {
    if (isRecoveryPage) return

    if (!isLoading && user) {
      router.replace("/time-off/request")
    }
  }, [user, isLoading, router, isRecoveryPage])

  if (isLoading) return null
  
  if (!isRecoveryPage && user) return null

  return <>{children}</>
}