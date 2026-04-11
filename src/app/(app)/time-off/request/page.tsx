"use client"

import { RequestTimeOffFormModal } from "./_components/request-time-off-form-modal"
import { RequestTimeOffTable } from "./_components/request-time-off-table"

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
        <RequestTimeOffFormModal />
      </div>

      {/* FILTER */}

      {/* TABLE */}
      <RequestTimeOffTable />

    </div>
  )
}