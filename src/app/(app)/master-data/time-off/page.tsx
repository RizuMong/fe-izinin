"use client"

import { TimeOffTable } from "./_components/time-off-table"
import { TimeOffFormModal } from "./_components/time-off-form-modal"

export default function Page() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Master Time Off
          </h1>
          <p className="text-sm text-muted-foreground">
            Time Off Management
          </p>
        </div>

        {/* <LeaveFormModal /> */}
      </div>

      {/* TABLE */}
      <TimeOffTable />

    </div>
  )
}
