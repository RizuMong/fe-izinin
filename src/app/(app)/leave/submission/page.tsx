import { LeaveTable } from "./_components/leave-table"
import { LeaveFilter } from "./_components/leave-filter"
import { LeaveForm } from "./_components/leave-form"

export default function SubmissionPage() {
  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pengajuan Cuti</h1>
        <LeaveForm />
      </div>

      {/* FILTER */}
      <LeaveFilter />

      {/* TABLE */}
      <LeaveTable />
    </div>
  )
}