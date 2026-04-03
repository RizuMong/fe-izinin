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
    <Sidebar
      collapsible="icon"
      className="
        border-r
        transition-all
      "
    >
      {/* HEADER */}
      <SidebarHeader>
        <div
          className="
            flex items-center gap-3 p-3
            group-data-[collapsible=icon]:justify-center
          "
        >
          {/* LOGO */}
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-md shrink-0">
            I
          </div>

          {/* TEXT */}
          <div
            className="
              flex flex-col leading-tight
              group-data-[collapsible=icon]:hidden
            "
          >
            <span className="text-sm font-semibold">Izinin</span>
            <span className="text-xs text-muted-foreground">
              Manajemen Cuti
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        {sidebarMenu.map((section, i) => (
          <SidebarGroup key={i} className="mt-2">

            {/* LABEL */}
            <SidebarGroupLabel
              className="
                px-3 text-xs text-muted-foreground
                group-data-[collapsible=icon]:hidden
              "
            >
              {section.label}
            </SidebarGroupLabel>

            {/* MENU */}
            <SidebarMenu>
              {section.children.map((item, j) => {
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={j}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                      className="
                        rounded-md transition-all
                        data-[active=true]:bg-secondary
                        data-[active=true]:text-primary
                        hover:bg-muted
                      "
                    >
                      <Link
                        href={item.href}
                        className="
                          flex items-center gap-3 px-2 py-2
                          group-data-[collapsible=icon]:justify-center
                        "
                      >
                        {/* ICON */}
                        <Icon className="w-5 h-5 shrink-0" />

                        {/* TEXT */}
                        <span
                          className="
                            truncate
                            group-data-[collapsible=icon]:hidden
                          "
                        >
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