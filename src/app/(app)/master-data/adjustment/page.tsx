"use client"

import { AdjustmentTable } from "./_components/adjustment-table"
import { AdjustmentFormModal } from "./_components/adjustment-form-modal"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Adjustment Time Off</h1>
          <p className="text-sm text-muted-foreground">
            Kelola Adjustment Time Off karyawan
          </p>
        </div>

        <AdjustmentFormModal />
      </div>

      <AdjustmentTable />
    </div>
  )
}
