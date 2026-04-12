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

export default function AppLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ProtectedLayout>
      <SidebarProvider>
        <TooltipProvider>

          <div className="flex min-h-screen w-full">

            <AppSidebar />

            <SidebarInset className="flex flex-col w-full">

              <header className="flex items-center justify-between border-b px-6 lg:px-8 h-16 bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-all">
                <div className="flex items-center gap-2">
                  <SidebarTrigger />
                  <span className="font-semibold text-lg ml-2 text-slate-800">Izinin</span>
                </div>

                <Header />
              </header>

              <main className="flex-1 w-full bg-background overflow-auto">
                <div className="max-w-screen-xl mx-auto w-full p-6 lg:p-8 space-y-6">
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