import { useState } from "react"
import {
  useTimeOffEmployeeList,
} from "@/services/master-data/time-off-employee/hook"
import { formatYear } from "@/lib/utils"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

import { TimeOffEmployeeFormModal } from "./time-off-employee-form-modal"
import { TimeOffEmployeeDeleteDialog } from "./time-off-employee-delete-dialog"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

export function TimeOffEmployeeTable() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, error } = useTimeOffEmployeeList({ page, limit })

  if (error) return <div>Error loading leave employees</div>

  const timeOffEmployees = data?.data || []
  const meta = data?.meta

  return (
    <div className="space-y-4">
      <Card className="w-full min-w-0 p-0 overflow-hidden">
        <CardContent className="p-0">
          <Table className="min-w-full">
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Time Off Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Total Quota</TableHead>
                <TableHead>Remaining Balance</TableHead>
                <TableHead>Used Quota</TableHead>
                {/* <TableHead className="w-25">Action</TableHead> */}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableSkeleton columns={6} />
              ) : timeOffEmployees.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="p-0">
                    <EmptyState title="Tidak ada data cuti Employee" description="Belum ada Time Off Type Employee didata." />
                  </TableCell>
                </TableRow>
              ) : (
                timeOffEmployees.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                    <TableCell>{item.employee?.name ?? `ID: ${item.employee_id}`}</TableCell>
                    <TableCell>{item.time_off?.name ?? `ID: ${item.timeoff_id}`}</TableCell>
                    <TableCell>{formatYear(item.period)}</TableCell>
                    <TableCell>{item.total_quota}</TableCell>
                    <TableCell>{item.remaining_balance}</TableCell>
                    <TableCell>{item.used_quota}</TableCell>

                    {/* <TableCell className="flex gap-2">
                      <TimeOffEmployeeFormModal initialData={item} />
                      <TimeOffEmployeeDeleteDialog id={item.id} />
                    </TableCell> */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {meta && (
        <DataTablePagination 
          meta={meta} 
          onPageChange={setPage} 
          onLimitChange={(l) => {
            setLimit(l)
            setPage(1)
          }} 
        />
      )}
    </div>
  )
}