import {
  FileText,
  CheckSquare,
  History,
  Database,
  Users,
  MapPin,
  Briefcase,
  Building,
  Settings,
  User,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"

export type SidebarItem = {
  label: string
  href: string
  icon: LucideIcon
}

export type SidebarSection = {
  label: string
  children: SidebarItem[]
}

export const sidebarMenu: SidebarSection[] = [
  {
    label: "Pengajuan Cuti",
    children: [
      {
        label: "Pengajuan Cuti",
        href: "/time-off/request",
        icon: FileText,
      },
      {
        label: "Persetujuan Cuti",
        href: "/time-off/approval",
        icon: CheckSquare,
      },
      {
        label: "History Cuti",
        href: "/time-off/history",
        icon: History,
      },
    ],
  },
  {
    label: "Master Data",
    children: [
      {
        label: "Master Cuti",
        href: "/master-data/time-off",
        icon: Database,
      },
      {
        label: "Master Cuti Employee",
        href: "/master-data/time-off-employee",
        icon: Users,
      },
      {
        label: "Master Posisi",
        href: "/master-data/job-position",
        icon: Briefcase,
      },
      {
        label: "Master Site",
        href: "/master-data/site",
        icon: MapPin,
      },
      {
        label: "Master Holiday",
        href: "/master-data/holiday",
        icon: User,
      },
      {
        label: "Master Afdeling",
        href: "/master-data/afdeling",
        icon: Building,
      },
      {
        label: "Adjustment Cuti",
        href: "/master-data/adjustment",
        icon: Settings,
      },
    ],
  },
  {
    label: "Users",
    children: [
      {
        label: "Data Employee",
        href: "/users/employee",
        icon: Users,
      },
      {
        label: "Data User",
        href: "/users/user",
        icon: User,
      }
    ],
  },
]