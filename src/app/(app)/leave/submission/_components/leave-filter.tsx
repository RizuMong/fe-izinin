"use client"

import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export const LeaveFilter = () => {
  return (
    <div className="flex gap-4">
      
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

    </div>
  )
}