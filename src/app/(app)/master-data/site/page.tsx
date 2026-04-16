"use client"

import { SiteTable } from "./_components/site-table"
import { SiteFormModal } from "./_components/site-form-modal"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Master Site</h1>
          <p className="text-sm text-muted-foreground">Site Management</p>
        </div>

        <SiteFormModal />
      </div>

      <SiteTable />
    </div>
  )
}