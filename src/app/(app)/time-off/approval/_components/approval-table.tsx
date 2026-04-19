"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"

import {
  useApprovalRequestTimeOffList,
  useApproveRequestTimeOff,
  useRejectRequestTimeOff
} from "@/services/time-off/request/hook"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { ApprovalDetailModal } from "./approval-detail-modal"
import type { RequestTimeOff } from "@/services/time-off/request/types"

const getStatusBadge = (status: string) => {
  const baseClass = "rounded-full px-3 py-1 text-xs font-medium"
  switch (status) {
    case "APPROVED":
      return <Badge className={`${baseClass} bg-green-500 hover:bg-green-600 text-white`}>APPROVED</Badge>
    case "REJECTED":
      return <Badge variant="destructive" className={`${baseClass} bg-red-500 hover:bg-red-600`}>REJECTED</Badge>
    case "PENDING":
    case "SUBMITTED":
      return <Badge className={`${baseClass} bg-yellow-500 hover:bg-yellow-600 text-white`}>{status}</Badge>
    default:
      return <Badge className={`${baseClass} bg-gray-200 hover:bg-gray-300 text-gray-800`}>{status}</Badge>
  }
}

export function ApprovalTable() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, isError } = useApprovalRequestTimeOffList({ page, limit })
  const approveMutation = useApproveRequestTimeOff()
  const rejectMutation = useRejectRequestTimeOff()

  const [detailRequest, setDetailRequest] = useState<RequestTimeOff | null>(null)

  // Prompt Modal States
  const [approveRequest, setApproveRequest] = useState<RequestTimeOff | null>(null)
  const [rejectRequest, setRejectRequest] = useState<RequestTimeOff | null>(null)
  const [comment, setComment] = useState("")

  const handleApproveSubmit = () => {
    if (!approveRequest) return
    approveMutation.mutate(
      { id: approveRequest.id, comment },
      {
        onSuccess: () => {
          setApproveRequest(null)
          setComment("")
        },
      }
    )
  }

  const handleRejectSubmit = () => {
    if (!rejectRequest) return
    // Strict validation for reject
    if (!comment.trim()) {
      toast.error("Reason is required for rejection.")
      return
    }

    rejectMutation.mutate(
      { id: rejectRequest.id, comment },
      {
        onSuccess: () => {
          setRejectRequest(null)
          setComment("")
        },
      }
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-48 border rounded-md bg-white text-destructive">
        An error occurred while loading approval data.
      </div>
    )
  }

  const requests = data?.data || []
  const meta = data?.meta

  return (
    <div className="w-full min-w-0 rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Time Off Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Total Days</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center min-w-70">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton columns={7} />
          ) : requests.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={7} className="p-0">
                <EmptyState title="No Approvals Pending" description="There are no time-off requests waiting for your approval." />
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.employee?.name || "-"}</TableCell>
                <TableCell>{request.time_off?.name || "-"}</TableCell>
                <TableCell>{new Date(request.start_date).toLocaleDateString("id-ID")}</TableCell>
                <TableCell>{new Date(request.end_date).toLocaleDateString("id-ID")}</TableCell>
                <TableCell>{request.total_days || 0}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDetailRequest(request)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> Detail
                  </Button>

                  {/* Show Approve/Reject ONLY if status is PENDING / SUBMITTED */}
                  {(request.status === "PENDING" || request.status === "SUBMITTED") && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => setApproveRequest(request)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setRejectRequest(request)}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* DETAIL MODAL (Receives prop hooks to open prompt dialogs directly from detail view) */}
      <ApprovalDetailModal
        request={detailRequest}
        open={!!detailRequest}
        onOpenChange={(open) => !open && setDetailRequest(null)}
        onApprove={(req) => setApproveRequest(req)}
        onReject={(req) => setRejectRequest(req)}
      />

      {/* APPROVE MODAL */}
      <Dialog open={!!approveRequest} onOpenChange={(open) => {
        if (!open) { setApproveRequest(null); setComment(""); }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Request Time Off</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Enter approval notes..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={approveMutation.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveRequest(null)} disabled={approveMutation.isPending}>
              Cancel
            </Button>
            <Button onClick={handleApproveSubmit} disabled={approveMutation.isPending} className="bg-green-600 hover:bg-green-700 text-white">
              {approveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* REJECT MODAL */}
      <Dialog open={!!rejectRequest} onOpenChange={(open) => {
        if (!open) { setRejectRequest(null); setComment(""); }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Request Time Off</DialogTitle>
            <DialogDescription>
              Please provide a reason
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label>Please provide a reason <span className="text-red-500">*</span></Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={rejectMutation.isPending}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectRequest(null)} disabled={rejectMutation.isPending}>
              Cancel
            </Button>
            <Button onClick={handleRejectSubmit} disabled={rejectMutation.isPending} variant="destructive">
              {rejectMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {meta && (
        <div className="pt-4">
          <DataTablePagination 
            meta={meta} 
            onPageChange={setPage} 
            onLimitChange={(l) => {
              setLimit(l)
              setPage(1)
            }} 
          />
        </div>
      )}
    </div>
  )
}