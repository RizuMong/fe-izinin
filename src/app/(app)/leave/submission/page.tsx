"use client"

import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { LeaveForm } from "./_components/leave-form"
import { LeaveFilter } from "./_components/leave-filter"
import { LeaveTable } from "./_components/leave-table"

export default function Page() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Pengajuan Cuti
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola dan ajukan cuti Anda dengan mudah
          </p>
        </div>
        <LeaveForm />
      </div>

      {/* FILTER */}
      <LeaveFilter/>

      {/* TABLE */}
      <LeaveTable />

    </div>
  )
}