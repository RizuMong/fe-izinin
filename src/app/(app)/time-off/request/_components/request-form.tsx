"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const TimeOffForm = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger asChild>
        <Button>Ajukan Cuti</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pengajuan Cuti</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Tanggal Mulai</Label>
            <Input type="date" />
          </div>

          <div>
            <Label>Tanggal Selesai</Label>
            <Input type="date" />
          </div>

          <div>
            <Label>Keterangan</Label>
            <Input />
          </div>

          <Button className="w-full">
            Submit
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  )
}