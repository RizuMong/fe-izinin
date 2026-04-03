"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Pengajuan Cuti
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola dan ajukan cuti Anda dengan mudah
          </p>
        </div>

        <Button className="bg-primary text-white shadow-sm">
          Ajukan Cuti
        </Button>
      </div>

      {/* FILTER */}
      <Card className="py-5 px-0">
        <CardContent className="flex flex-col md:flex-row gap-3">

          <Input
            placeholder="Cari pengajuan cuti..."
            className="md:w-75"
          />

          <Select>
            <SelectTrigger className="md:w-50">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

        </CardContent>
      </Card>

      {/* TABLE */}
      <Card className="p-0">
        <CardContent className="p-0">

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">Tanggal</th>
                  <th className="px-4 py-3 font-medium">Jenis Cuti</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Keterangan</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t hover:bg-muted/40 transition">
                  <td className="px-4 py-3">2026-04-03</td>
                  <td className="px-4 py-3">Cuti Tahunan</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-yellow-100 text-yellow-700">
                      Pending
                    </Badge>
                  </td>
                  <td className="px-4 py-3">Liburan</td>
                </tr>
              </tbody>

            </table>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}