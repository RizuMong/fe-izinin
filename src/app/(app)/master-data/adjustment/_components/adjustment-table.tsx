"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdjustmentList } from "@/services/adjustment-time-off"
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
import { formatDate } from "@/lib/utils"
import type { Adjustment } from "@/services/adjustment-time-off"

export function AdjustmentTable() {
  const router = useRouter()
  const { data, isLoading, error, refetch } = useAdjustmentList()
  const [editingAdjustment, setEditingAdjustment] = useState<Adjustment | null>(
    null
  )
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const adjustments = data?.data ?? []

  // Loading stuck fix - auto refetch after 7 seconds
  const [elapsedTime, setElapsedTime] = useState(0)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Adjustment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Gagal memuat data adjustment</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => refetch()}>Coba Lagi</Button>
        </CardContent>
      </Card>
    )
  }

  if (adjustments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Adjustment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Tidak ada data</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="p-0 overflow-hidden">
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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adjustments.map((adjustment) => (
                <TableRow
                  key={adjustment.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <TableCell className="font-medium">
                    {adjustment.employee_id}
                  </TableCell>
                  <TableCell>{adjustment.timeoff_id}</TableCell>
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AdjustmentFormModal
                        initialData={adjustment}
                        onEdit={() => setEditingAdjustment(adjustment)}
                      />
                      <AlertDialog
                        open={
                          isDeleteDialogOpen && deleteId === adjustment.id
                        }
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open)
                          if (!open) setDeleteId(null)
                        }}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteId(adjustment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AdjustmentDeleteDialog
                          id={adjustment.id}
                          onOpenChange={(open) => {
                            setIsDeleteDialogOpen(open)
                            if (!open) setDeleteId(null)
                          }}
                        />
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
