"use client"

import { AfdelingTable } from "./_components/afdeling-table"
import { AfdelingFormModal } from "./_components/afdeling-form-modal"

export default function Page() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Master Afdeling
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola data afdeling
          </p>
        </div>

        <AfdelingFormModal />
      </div>

      {/* TABLE */}
      <AfdelingTable />

    </div>
  )
}