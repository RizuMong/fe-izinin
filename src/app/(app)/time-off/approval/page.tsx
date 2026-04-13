"use client"

import { ApprovalTable } from "./_components/approval-table"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Approval Cuti</h1>
          <p className="text-sm text-muted-foreground">
            Daftar Request Time Off karyawan yang membutuhkan persetujuan
          </p>
        </div>
      </div>

      <ApprovalTable />
    </div>
  )
}