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
            Request Time Off
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and request leave effortlessly
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