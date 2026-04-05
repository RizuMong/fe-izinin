"use client"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const TimeOffTable = () => {
  return (
    <Card className="p-0 overflow-hidden">
      <CardContent className="p-0">

        <Table>

          {/* HEADER */}
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Jenis Cuti</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Keterangan</TableHead>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody>
            <TableRow className="hover:bg-muted/40 transition">
              <TableCell>2026-04-03</TableCell>
              <TableCell>Cuti Tahunan</TableCell>

              <TableCell>
                <Badge className="bg-yellow-100 text-yellow-700">
                  Pending
                </Badge>
              </TableCell>

              <TableCell>Liburan</TableCell>
            </TableRow>
          </TableBody>

        </Table>

      </CardContent>
    </Card>
  )
}