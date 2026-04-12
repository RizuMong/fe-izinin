"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { useCreateRequestTimeOff } from "@/services/time-off/request/hook"
import { useEmployeeList } from "@/services/users/employee"
import { useTimeOffList } from "@/services/master-data/time-off/timeoff"
import type { RequestTimeOffPayload } from "@/services/time-off/request/types"

const INITIAL_STATE: RequestTimeOffPayload = {
  employee_id: 0,
  timeoff_id: 0,
  start_date: "",
  end_date: "",
  reason: "",
}

export function RequestTimeOffFormModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<RequestTimeOffPayload>(INITIAL_STATE)

  const createMutation = useCreateRequestTimeOff()
  const { data: employeeData, isLoading: employeesLoading } = useEmployeeList()
  const { data: timeoffData, isLoading: timeoffsLoading } = useTimeOffList()

  // Close dialog and reset form on success
  useEffect(() => {
    if (createMutation.isSuccess) {
      setOpen(false)
      setFormData(INITIAL_STATE)
    }
  }, [createMutation.isSuccess])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.employee_id) return toast.error("Employee wajib dipilih")
    if (!formData.timeoff_id) return toast.error("Time Off wajib dipilih")
    if (!formData.start_date) return toast.error("Start date wajib diisi")
    if (!formData.end_date) return toast.error("End date wajib diisi")

    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      return toast.error("Start date tidak boleh lebih dari end date")
    }

    createMutation.mutate(formData)
  }

  const isLoading = createMutation.isPending

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Pengajuan Cuti
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pengajuan Cuti</DialogTitle>
          <DialogDescription>
            Ajukan pengajuan cuti baru untuk karyawan
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee Reference */}
          <div className="space-y-2">
            <Label htmlFor="employee_id">Karyawan</Label>
            {employeesLoading ? (
              <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Memuat karyawan...
              </div>
            ) : (
              <Select
                value={formData.employee_id ? formData.employee_id.toString() : ""}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    employee_id: parseInt(value) || 0,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Karyawan" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {employeeData?.data?.map((employee: any) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.full_name} (NPK: {employee.npk})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Time Off Reference */}
          <div className="space-y-2">
            <Label htmlFor="timeoff_id">Tipe Cuti</Label>
            {timeoffsLoading ? (
              <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Memuat tipe cuti...
              </div>
            ) : (
              <Select
                value={formData.timeoff_id ? formData.timeoff_id.toString() : ""}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    timeoff_id: parseInt(value) || 0,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Tipe Cuti" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {timeoffData?.data?.map((timeoff: any) => (
                    <SelectItem key={timeoff.id} value={timeoff.id.toString()}>
                      {timeoff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Tanggal Mulai</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">Tanggal Selesai</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Alasan</Label>
            <Textarea
              id="reason"
              placeholder="Berikan alasan pengajuan cuti"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Memuat..." : "Submit Pengajuan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}