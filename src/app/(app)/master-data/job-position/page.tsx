"use client"

import { JobPositionTable } from "./_components/job-position-table"
import { JobPositionFormModal } from "./_components/job-position-form-modal"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Master Job Position</h1>
          <p className="text-sm text-muted-foreground">Position Management</p>
        </div>

        <JobPositionFormModal />
      </div>

      <JobPositionTable />
    </div>
  )
}
