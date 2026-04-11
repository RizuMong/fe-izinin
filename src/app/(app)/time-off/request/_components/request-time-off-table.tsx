"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { useRequestTimeOffList } from "@/services/time-off/request/hook"

export function RequestTimeOffTable() {
  const { data, isLoading, isError } = useRequestTimeOffList()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 border rounded-md bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-48 border rounded-md bg-white text-destructive">
        Terjadi kesalahan saat memuat data.
      </div>
    )
  }

  const requests = data?.data || []

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Time Off Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                Tidak ada data pengajuan cuti.
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.employee?.name || "-"}
                </TableCell>
                <TableCell>{request.time_off?.name || "-"}</TableCell>
                <TableCell>
                  {new Date(request.start_date).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  {new Date(request.end_date).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell className="max-w-50 truncate" title={request.reason}>
                  {request.reason || "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}