"use client"

import { LeaveTable } from "./_components/leave-table"
import { LeaveFormModal } from "./_components/leave-form-modal"

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

        <LeaveFormModal />
      </div>

      {/* TABLE */}
      <LeaveTable />

    </div>
  )
}
