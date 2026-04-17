"use client"

import { ApprovalTable } from "./_components/approval-table"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Approval Time Off</h1>
          <p className="text-sm text-muted-foreground">
            Employee Time Off Requests Pending Approval
          </p>
        </div>
      </div>

      <ApprovalTable />
    </div>
  )
}