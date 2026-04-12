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

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Base soft gradient (lebih natural dari solid color) */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-100 via-blue-200 to-indigo-200" />

      {/* Main blue glow (lebih smooth & besar) */}
      <div className="absolute -top-40 -left-40 w-150 h-150 bg-blue-500/60 rounded-full blur-[160px]" />

      {/* Secondary blue (depth layer) */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-400/50 rounded-full blur-[140px]" />

      {/* Purple accent (lebih subtle & blend) */}
      <div className="absolute top-10 -right-40 w-[500px] h-[500px] bg-purple-400/40 rounded-full blur-[160px]" />

      {/* Bottom ambient light */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-300/40 rounded-full blur-[160px]" />

      {/* Center highlight (FOCUS AREA — ini penting banget) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent_70%)]" />

      {/* Top-left lighting (biar gak flat) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5),transparent_60%)]" />

      {/* Subtle vignette (depth) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {children}
      </div>
    </div>
  )
}