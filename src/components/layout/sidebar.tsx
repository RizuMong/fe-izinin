"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { sidebarMenu } from "./sidebar.config"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">

      {/* LOGO */}
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-3">
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-md">
            I
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Izinin</span>
            <span className="text-xs text-muted-foreground">
              Manajemen Cuti
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* MENU */}
      <SidebarContent className="px-2">
        {sidebarMenu.map((section, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupLabel className="px-2 text-xs text-muted-foreground">
              {section.label}
            </SidebarGroupLabel>

            <SidebarMenu>
              {section.children.map((item, j) => {
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={j}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="truncate">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

    </Sidebar>
  )
}