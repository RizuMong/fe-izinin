import { ReactNode } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ProtectedLayout } from "@/components/layout/protected-layout"
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

              <header className="flex items-center justify-between border-b px-4 h-14 bg-white">
                <div className="flex items-center gap-2">
                  <SidebarTrigger />
                  <span className="font-semibold">Izinin</span>
                </div>

                <Header />
              </header>

              <main className="flex-1 w-full p-6 bg-gray-50 overflow-auto">
                {children}
              </main>

            </SidebarInset>

          </div>

        </TooltipProvider>
      </SidebarProvider>
    </ProtectedLayout>
  )
}