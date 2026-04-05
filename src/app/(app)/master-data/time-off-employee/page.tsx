"use client"

import { TimeOffEmployeeTable } from "./_components/time-off-employee-table"
import { TimeOffEmployeeFormModal } from "./_components/time-off-employee-form-modal"

export default function Page() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Master Cuti Employee</h1>
          <p className="text-sm text-muted-foreground">
            Kelola data cuti employee
          </p>
        </div>

        {/* <TimeOffEmployeeFormModal /> */}
      </div>

      {/* TABLE */}
      <TimeOffEmployeeTable />
    </div>
  )
}
