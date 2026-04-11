"use client"

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

export function TimeOffEmployeeTable() {
  const { data, isLoading, error } = useTimeOffEmployeeList()

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error loading leave employees</div>

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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}