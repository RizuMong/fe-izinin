"use client"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

export const LeaveTable = () => {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Jenis Cuti</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Keterangan</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>2026-04-03</TableCell>
            <TableCell>Cuti Tahunan</TableCell>
            <TableCell>
              <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                Pending
              </span>
            </TableCell>
            <TableCell>Liburan</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}