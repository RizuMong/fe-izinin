"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { RequestTimeOff } from "@/services/time-off/request/types"

interface ApprovalDetailModalProps {
  request: RequestTimeOff | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove?: (request: RequestTimeOff) => void
  onReject?: (request: RequestTimeOff) => void
}

// Helper untuk mengambil inisial nama (Misal: "Rizki Haddi" -> "RH")
const getInitials = (name: string) => {
  if (!name) return "UK"
  const words = name.split(" ")
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return words[0].slice(0, 2).toUpperCase()
}

// Styling Badge yang spesifik seperti di desain HTML
const getStatusBadge = (status: string) => {
  const baseClass = "text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap"
  
  switch (status) {
    case "APPROVED":
      return <span className={`${baseClass} bg-[#DCFCE7] text-[#15803D]`}>APPROVED</span>
    case "REJECTED":
      return <span className={`${baseClass} bg-red-100 text-red-700`}>REJECTED</span>
    case "PENDING":
    case "SUBMITTED":
      return <span className={`${baseClass} bg-[#FFF3CD] text-[#856404]`}>{status}</span>
    case "DRAFT":
      return <span className={`${baseClass} bg-slate-100 text-slate-700`}>DRAFT</span>
    default:
      return <span className={`${baseClass} bg-slate-100 text-slate-700`}>{status}</span>
  }
}

export function ApprovalDetailModal({ request, open, onOpenChange, onApprove, onReject }: ApprovalDetailModalProps) {
  if (!request) return null

  // Format tanggal sesuai desain (Contoh: "13 Apr 2026")
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Menggunakan p-0 agar kita bisa custom padding dalam sesuai HTML */}
      <DialogContent className="p-0 sm:max-w-145 rounded-[20px] overflow-hidden gap-0 border-slate-200 shadow-xl" aria-describedby={undefined}>
        <DialogTitle className="sr-only">Detail Pengajuan Cuti</DialogTitle>

        <div className="p-7 pb-0">
          
          {/* HEADER: Avatar, Nama, Tipe Cuti & Status */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center font-medium text-sm text-blue-600 shrink-0">
                {getInitials(request.employee?.name as string)}
              </div>
              <div>
                <p className="font-medium text-base text-slate-900 m-0 leading-snug">
                  {request.employee?.name || "-"}
                </p>
                <p className="text-[13px] text-slate-500 m-0">
                  {request.time_off?.name || "-"}
                </p>
              </div>
            </div>
            <div className="pt-1">
               {getStatusBadge(request.status)}
            </div>
          </div>

          {/* GRID INFO: Tanggal, Total Hari, Tipe Cuti */}
          <div className="border-t border-slate-200 pt-5 grid grid-cols-3 gap-2.5 mb-5">
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-[11px] text-slate-500 mb-1 uppercase tracking-[0.05em]">Tanggal</p>
              <p className="text-[13px] font-medium text-slate-900 leading-snug">
                {formatDate(request.start_date)} &mdash; {formatDate(request.end_date)}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-[11px] text-slate-500 mb-1 uppercase tracking-[0.05em]">Total hari</p>
              <p className="text-[13px] font-medium text-slate-900">{request.total_days || 0} hari</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-[11px] text-slate-500 mb-1 uppercase tracking-[0.05em]">Tipe cuti</p>
              <p className="text-[13px] font-medium text-slate-900 truncate" title={request.time_off?.name as string}>
                {request.time_off?.name || "-"}
              </p>
            </div>
          </div>

          {/* ALASAN BOX */}
          <div className="mb-6">
            <p className="text-[11px] text-slate-500 mb-1.5 uppercase tracking-[0.05em]">Alasan</p>
            <p className={`text-[13px] p-3 bg-slate-50 rounded-lg ${!request.reason ? 'italic text-slate-400' : 'text-slate-700'}`}>
              {request.reason || "Tidak ada alasan"}
            </p>
          </div>

          {/* APPROVAL LOGS TIMELINE */}
          <div>
            <p className="text-[11px] text-slate-500 mb-3 uppercase tracking-[0.05em]">Approval logs</p>

            <div className="flex flex-col">
              {!request.approval_logs || request.approval_logs.length === 0 ? (
                 <p className="text-[13px] text-slate-500 italic">Belum ada riwayat persetujuan.</p>
              ) : (
                request.approval_logs.map((log, idx) => {
                  const isLast = idx === request.approval_logs.length - 1;
                  const isApproved = log.status === "APPROVED";
                  const isPending = log.status === "PENDING";
                  
                  return (
                    <div key={idx} className="flex gap-3.5 relative">
                      
                      {/* Timeline Line & Dot */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`w-2 h-2 rounded-full mt-4 ${
                          isApproved ? 'bg-green-500' : 
                          log.status === 'REJECTED' ? 'bg-red-500' : 'bg-slate-300'
                        }`} />
                        {!isLast && <div className="w-px flex-1 bg-slate-200 min-h-6" />}
                      </div>

                      {/* Log Card */}
                      <div className="flex-1 mb-2.5">
                        <div className={`p-3 border border-slate-200 rounded-lg ${isPending ? 'bg-slate-50' : 'bg-white'}`}>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-[14px] text-slate-900 mb-0.5">{log.approver_name}</p>
                              <p className="text-[12px] text-slate-600 mb-0.5 uppercase tracking-wide">{log.role}</p>
                              <p className="text-[12px] text-slate-400">{log.email}</p>
                            </div>
                            <div className="shrink-0">
                              {getStatusBadge(log.status)}
                            </div>
                          </div>
                          
                          {/* Optional Comment Display if exist inside logs */}
                          {log.comment && (
                            <p className="text-[12px] text-slate-600 mt-2 bg-white/60 p-2 rounded border border-slate-100">
                              <span className="font-medium text-slate-500">Catatan: </span>
                              {log.comment}
                            </p>
                          )}
                        </div>
                        
                        {/* Tanggal Approve (Ditampilkan di bawah card sesuai desain) */}
                        {log.approved_at && (
                          <p className="text-[11px] text-slate-400 mt-2 ml-1">
                            {new Date(log.approved_at).toLocaleDateString("id-ID", {
                              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            }).replace(/\./g, ':')}
                          </p>
                        )}
                      </div>
                      
                    </div>
                  )
                })
              )}
            </div>
          </div>

        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-between p-4 px-7 mt-5 border-t border-slate-200 bg-white">
          <button 
            className="text-[13px] text-slate-500 hover:text-slate-800 transition-colors"
            onClick={() => onOpenChange(false)}
          >
            Tutup
          </button>
          
          {(request.status === "PENDING" || request.status === "SUBMITTED") && (
            <div className="flex items-center gap-2">
              <button 
                className="text-[13px] font-medium px-4.5 py-2 rounded-md border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                onClick={() => {
                  onOpenChange(false)
                  if (onReject) onReject(request)
                }}
              >
                Reject
              </button>
              <button 
                className="text-[13px] font-medium px-4.5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                onClick={() => {
                  onOpenChange(false)
                  if (onApprove) onApprove(request)
                }}
              >
                Approve
              </button>
            </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  )
}