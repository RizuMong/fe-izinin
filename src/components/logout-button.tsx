"use client"

import { useRouter } from "next/navigation"
import { signOut } from "@/lib/auth"
import { useUserStore } from "@/store/user.store"

export const LogoutButton = () => {
  const router = useRouter()
  const setUser = useUserStore((s) => s.setUser)

  const handleLogout = async () => {
    try {
      await signOut()

      // clear state
      setUser(null)

      // redirect
      router.replace("/auth/login")
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
    >
      Logout
    </button>
  )
}