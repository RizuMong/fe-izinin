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
            Master Cuti
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola data cuti
          </p>
        </div>

        {/* <LeaveFormModal /> */}
      </div>

      {/* TABLE */}
      <TimeOffTable />

    </div>
  )
}
