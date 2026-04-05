"use client"

import { TimeOffForm } from "./_components/request-form"
import { TimeOffTable } from "./_components/request-table"

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
        <TimeOffForm />
      </div>

      {/* FILTER */}

      {/* TABLE */}
      <TimeOffTable />

    </div>
  )
}