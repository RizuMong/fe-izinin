"use client"

import { useState } from "react"
import { useAdjustmentList } from "@/services/master-data/adjustment"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Edit, Trash2 } from "lucide-react"
import { AdjustmentFormModal } from "./adjustment-form-modal"
import { AdjustmentDeleteDialog } from "./adjustment-delete-dialog"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate } from "@/lib/utils"
import type { Adjustment } from "@/services/master-data/adjustment"

export function AdjustmentTable() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, error, refetch } = useAdjustmentList({ page, limit })
  const [editingAdjustment, setEditingAdjustment] = useState<Adjustment | null>(
    null
  )
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const adjustments = data?.data ?? []
  const meta = data?.meta

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load adjustment data</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => refetch()}>Try Again</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="w-full min-w-0 p-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Employee</TableHead>
                  <TableHead>Timeoff</TableHead>
                  <TableHead>Total Quota</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Operation</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  {/* <TableHead>Action</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody> 
                {isLoading ? (
                  <TableSkeleton columns={7} />
                ) : adjustments.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={7} className="p-0">
                      <EmptyState title="No Adjustments Found" description="No quota adjustment data has been added yet." />
                    </TableCell>
                  </TableRow>
                ) : (
                  adjustments.map((adjustment) => (
                    <TableRow
                      key={adjustment.id}
                      className="hover:bg-muted/40 transition-colors"
                    >
                    <TableCell className="font-medium">
                      {adjustment.employee.full_name}
                    </TableCell>
                    <TableCell>{adjustment.time_off.name}</TableCell>
                    <TableCell>{adjustment.total_quota}</TableCell>
                    <TableCell>{adjustment.period}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          adjustment.operation === "PENAMBAHAN"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {adjustment.operation}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(adjustment.created_at)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(adjustment.updated_at)}
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </div>
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
