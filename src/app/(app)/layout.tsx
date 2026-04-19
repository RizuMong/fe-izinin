"use client"

import { ReactNode } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Toaster } from "@/components/ui/sonner"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"

export default function AppLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  
  // Logic to generate breadcrumbs from pathname
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = segments.map((s) => s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))

  return (
    <ProtectedLayout>
      <SidebarProvider>
        <TooltipProvider>

          <div className="flex min-h-screen w-full font-sans antialiased text-slate-900">

            <AppSidebar />

            <SidebarInset className="flex flex-col w-full min-w-0 overflow-hidden bg-slate-50/30">

              <header className="flex items-center justify-between border-b border-slate-100 px-6 lg:px-8 h-16 bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-all">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  
                  {/* BREADCRUMBS - Premium touch */}
                  <nav className="hidden md:flex items-center gap-2 text-sm">
                    <span className="text-slate-400">/</span>
                    {breadcrumbs.map((crumb, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={i === breadcrumbs.length - 1 ? "font-semibold text-slate-800" : "text-slate-500"}>
                          {crumb}
                        </span>
                        {i < breadcrumbs.length - 1 && <span className="text-slate-300">/</span>}
                      </div>
                    ))}
                  </nav>
                </div>

                <Header />
              </header>

              <main className="flex-1 w-full bg-transparent overflow-y-auto overflow-x-hidden min-w-0">
                <div className="max-w-screen-2xl mx-auto w-full p-6 lg:p-10 space-y-6">
                  {children}
                </div>
                 <Toaster />
              </main>

            </SidebarInset>

          </div>

        </TooltipProvider>
      </SidebarProvider>
    </ProtectedLayout>
  )
}