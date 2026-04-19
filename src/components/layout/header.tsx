"use client"

import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { LogOut, ChevronDown, User, Bell } from "lucide-react"
import { useUserStore } from "@/store/user.store"
import { useState } from "react"

export const Header = () => {
  const { user, setUser } = useUserStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setLoading(true)
      await signOut()
      setUser(null)
      setOpen(false)
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="h-16 border-b border-slate-100 bg-white/70 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-8">
      
      {/* LEFT - Contextual Title if needed, but keeping it empty for true minimalism as Sidebar handles branding */}
      <div className="flex-1" />

      {/* RIGHT - Contextual Actions */}
      <div className="flex items-center gap-6">

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 group"
          >
            {/* Minimalist Avatar */}
            <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-[13px] font-bold text-white shadow-sm ring-2 ring-white transition-all group-hover:ring-slate-100">
              {user?.email?.[0]?.toUpperCase() || <User size={16} />}
            </div>
            
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </button>

          {/* Premium Minimalist Dropdown */}
          {open && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              
              <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="px-4 py-3 mb-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Account</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">{user?.email}</p>
                </div>

                <div className="h-px bg-slate-50 mx-2 mb-1" />

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-red-600 hover:bg-red-50/50 transition-all disabled:opacity-50 text-sm font-medium group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                    <LogOut size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span>{loading ? "Logging out..." : "Logout"}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}