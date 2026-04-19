"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate } from "@/lib/utils"

interface HistoryTableProps {
  requests: any[]
  isLoading: boolean
  isFetching: boolean
}

const getStatusBadge = (status: string) => {
  const baseClass = "rounded-full px-3 py-1 text-xs font-medium border-0"
  switch (status) {
    case "APPROVED":
      return <Badge className={`${baseClass} bg-green-500 hover:bg-green-600 text-white`}>APPROVED</Badge>
    case "REJECTED":
      return <Badge variant="destructive" className={`${baseClass} bg-red-400 hover:bg-red-600 text-white`}>REJECTED</Badge>
    case "PENDING":
    case "SUBMITTED":
      return <Badge className={`${baseClass} bg-yellow-500 hover:bg-yellow-600 text-white`}>{status}</Badge>
    case "DRAFT":
      return <Badge className={`${baseClass} bg-gray-200 hover:bg-gray-300 text-gray-800`}>DRAFT</Badge>
    default:
      return <Badge className={`${baseClass} bg-gray-200 hover:bg-gray-300 text-gray-800`}>{status}</Badge>
  }
}

export function HistoryTable({ requests, isLoading, isFetching }: HistoryTableProps) {
  return (
    <div className="w-full min-w-0 rounded-xl border bg-white overflow-hidden shadow-sm relative">
      {/* Loading Overlay saat Fetching Ulang Filter */}
      {isFetching && !isLoading && (
        <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      )}

      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-semibold text-slate-700">Employee</TableHead>
            <TableHead className="font-semibold text-slate-700">Time Off Type</TableHead>
            <TableHead className="font-semibold text-slate-700">Start Date</TableHead>
            <TableHead className="font-semibold text-slate-700">End Date</TableHead>
            <TableHead className="font-semibold text-slate-700 text-center">Total Days</TableHead>
            <TableHead className="font-semibold text-slate-700 text-center">Reason</TableHead>
            <TableHead className="font-semibold text-slate-700 text-center">Status</TableHead>
            <TableHead className="font-semibold text-slate-700">Created At</TableHead>
            <TableHead className="font-semibold text-slate-700">Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton columns={9} />
          ) : requests.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={9} className="p-0">
                <EmptyState title="History Time Off is Empty" description="No results found matching your filters." />
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-900">{request.employee?.name || "-"}</TableCell>
                <TableCell className="text-slate-600">{request.time_off?.name || "-"}</TableCell>
                <TableCell className="text-slate-600">
                  {formatDate(request.start_date)}
                </TableCell>
                <TableCell className="text-slate-600">
                  {formatDate(request.end_date)}
                </TableCell>
                <TableCell className="text-center font-medium text-slate-700">{request.total_days || 0}</TableCell>
                <TableCell className="text-center font-medium text-slate-700">{request.reason || "-"}</TableCell>
                <TableCell className="text-center">{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-slate-600 truncate max-w-[120px]" title={formatDate(request.created_at)}>
                  {formatDate(request.created_at)}
                </TableCell>
                <TableCell className="text-slate-600 truncate max-w-[120px]" title={formatDate(request.updated_at)}>
                  {formatDate(request.updated_at)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
