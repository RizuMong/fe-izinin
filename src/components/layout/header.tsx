"use client"

import { Bell, ChevronDown } from "lucide-react"
import { useUserStore } from "@/store/user.store"
import { useState } from "react"
import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"

export const Header = () => {
  const { user, setUser } = useUserStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setLoading(true)

      await signOut()

      // reset store
      setUser(null)

      // close dropdown
      setOpen(false)

      // redirect
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>

            {/* Name / Email */}
            <span className="text-sm">
              {user?.email || "Pengguna"}
            </span>

            <ChevronDown size={16} />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-50">

              {/* Divider */}
              <div className="border-t" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                disabled={loading}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 disabled:opacity-50"
              >
                {loading ? "Keluar..." : "Keluar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}