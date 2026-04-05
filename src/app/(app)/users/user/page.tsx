"use client"

import { UserTable } from "./_components/user-table"

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Master User</h1>
        <p className="text-sm text-muted-foreground">Kelola data User</p>
      </div>

      <UserTable />
    </div>
  )
}
