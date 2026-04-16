"use client"

import { HolidayTable } from "./_components/holiday-table"
import { HolidayFormModal } from "./_components/holiday-form-modal"

export default function Page() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Master Holiday
          </h1>
          <p className="text-sm text-muted-foreground">
            Holiday Management
          </p>
        </div>

        <HolidayFormModal />
      </div>

      {/* TABLE */}
      <HolidayTable />

    </div>
  )
}
