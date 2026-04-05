"use client"

import {
  useLeaveEmployeeList,
  useEmployeeList,
  useTimeOffList,
} from "@/services/master-data/leave-employee/hook"
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

import { LeaveEmployeeFormModal } from "./leave-employee-form-modal"
import { LeaveEmployeeDeleteDialog } from "./leave-employee-delete-dialog"

export function LeaveEmployeeTable() {
  const { data, isLoading, error } = useLeaveEmployeeList()
  const { data: employeeData } = useEmployeeList()
  const { data: timeoffData } = useTimeOffList()

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error loading leave employees</div>

  // Helper functions to get names
  const getEmployeeName = (id: number) => {
    return (
      employeeData?.data?.find((emp: { id: number; full_name: string }) => emp.id === id)
        ?.full_name || `ID: ${id}`
    )
  }

  const getTimeOffName = (id: number) => {
    return (
      timeoffData?.data?.find((t: { id: number; name: string }) => t.id === id)
        ?.name || `ID: ${id}`
    )
  }

  return (
    <Card className="p-0 overflow-hidden">
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
            {data?.data?.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                <TableCell>{getEmployeeName(item.employee_id)}</TableCell>
                <TableCell>{getTimeOffName(item.timeoff_id)}</TableCell>
                <TableCell>{formatYear(item.period)}</TableCell>
                <TableCell>{item.total_quota}</TableCell>
                <TableCell>{item.remaining_balance}</TableCell>
                <TableCell>{item.used_quota}</TableCell>

                {/* <TableCell className="flex gap-2">
                  <LeaveEmployeeFormModal initialData={item} />
                  <LeaveEmployeeDeleteDialog id={item.id} />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
