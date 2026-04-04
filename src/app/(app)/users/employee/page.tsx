"use client"

import { EmployeeTable } from "./_components/employee-table"
import { EmployeeFormModal } from "./_components/employee-form-modal"

export default function Page() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Master Employee
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola data employee
          </p>
        </div>

        <EmployeeFormModal />
      </div>

      {/* TABLE */}
      <EmployeeTable />

    </div>
  )
}