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
  useRejectRequestTimeOff // <-- new hook
} from "@/services/time-off/request/hook"
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
  const { data, isLoading, isError } = useApprovalRequestTimeOffList()
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
      toast.error("Catatan wajib diisi untuk melakukan reject.")
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
        Terjadi kesalahan saat memuat data persetujuan.
      </div>
    )
  }

  const requests = data?.data || []

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Karyawan</TableHead>
            <TableHead>Tipe Cuti</TableHead>
            <TableHead>Tanggal Mulai</TableHead>
            <TableHead>Tanggal Selesai</TableHead>
            <TableHead>Total Hari</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center min-w-70">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton columns={7} />
          ) : requests.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={7} className="p-0">
                <EmptyState title="Tidak ada data persetujuan" description="Belum ada data pengajuan cuti untuk disetujui." />
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
            <DialogTitle>Approve Pengajuan Cuti</DialogTitle>
            <DialogDescription>
              Berikan catatan persetujuan untuk cuti {approveRequest?.employee?.name || "Karyawan"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Catatan (Opsional)</Label>
              <Textarea 
                placeholder="Masukkan catatan persetujuan..." 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={approveMutation.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveRequest(null)} disabled={approveMutation.isPending}>
              Batal
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
            <DialogTitle>Reject Pengajuan Cuti</DialogTitle>
            <DialogDescription>
              Mohon berikan alasan penolakan untuk cuti {rejectRequest?.employee?.name || "Karyawan"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label>Catatan Penolakan <span className="text-red-500">*</span></Label>
              <Textarea 
                placeholder="Masukkan alasan reject (Wajib)..." 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={rejectMutation.isPending}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectRequest(null)} disabled={rejectMutation.isPending}>
              Batal
            </Button>
            <Button onClick={handleRejectSubmit} disabled={rejectMutation.isPending} variant="destructive">
              {rejectMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}