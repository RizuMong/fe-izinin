"use client"

import { LeaveEmployeeTable } from "./_components/leave-employee-table"
import { LeaveEmployeeFormModal } from "./_components/leave-employee-form-modal"

export default function Page() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Master Leave Employee</h1>
          <p className="text-sm text-muted-foreground">
            Kelola data leave employee
          </p>
        </div>

        {/* <LeaveEmployeeFormModal /> */}
      </div>

      {/* TABLE */}
      <LeaveEmployeeTable />
    </div>
  )
}
