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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Edit, Loader2 } from "lucide-react"
import {
  useCreateAdjustment,
  useUpdateAdjustment,
} from "@/services/adjustment-time-off"
import { useEmployeeList } from "@/services/users/employee"
import { useTimeOffList } from "@/services/master-data/timeoff"
import type {
  Adjustment,
  AdjustmentPayload,
} from "@/services/adjustment-time-off"

interface AdjustmentFormModalProps {
  initialData?: Adjustment
  onEdit?: () => void
}

export function AdjustmentFormModal({
  initialData,
  onEdit,
}: AdjustmentFormModalProps) {
  const isEditMode = !!initialData
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState<AdjustmentPayload>({
    employee_id: 0,
    timeoff_id: 0,
    total_quota: 0,
    period: "",
    operation: "PENAMBAHAN",
  })

  const createMutation = useCreateAdjustment()
  const updateMutation = useUpdateAdjustment()
  const { data: employeeData, isLoading: employeesLoading } = useEmployeeList()
  const { data: timeoffData, isLoading: timeoffsLoading } = useTimeOffList()

  // Load initialData on open
  useEffect(() => {
    if (open && initialData && isEditMode) {
      setFormData({
        employee_id: initialData.employee_id,
        timeoff_id: initialData.timeoff_id,
        total_quota: initialData.total_quota,
        period: initialData.period,
        operation: initialData.operation,
      })
    }
  }, [open, initialData, isEditMode])

  // Close dialog on success
  useEffect(() => {
    if (createMutation.isSuccess || updateMutation.isSuccess) {
      setOpen(false)
      setFormData({
        employee_id: 0,
        timeoff_id: 0,
        total_quota: 0,
        period: "",
        operation: "PENAMBAHAN",
      })
    }
  }, [createMutation.isSuccess, updateMutation.isSuccess])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditMode && initialData) {
      updateMutation.mutate({
        id: initialData.id,
        ...formData,
      })
    } else {
      createMutation.mutate(formData)
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Adjustment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Adjustment" : "Tambah Adjustment"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Ubah data adjustment"
              : "Tambahkan adjustment baru"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee */}
          <div className="space-y-2">
            <Label htmlFor="employee_id">Employee</Label>
            {employeesLoading ? (
              <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading employees...
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
                  <SelectValue placeholder="Pilih Employee" />
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

          {/* Time Off */}
          <div className="space-y-2">
            <Label htmlFor="timeoff_id">Time Off</Label>
            {timeoffsLoading ? (
              <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading time offs...
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
                  <SelectValue placeholder="Pilih Time Off" />
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

          {/* Total Quota */}
          <div className="space-y-2">
            <Label htmlFor="total_quota">Total Quota</Label>
            <Input
              id="total_quota"
              type="number"
              placeholder="Total Quota"
              className="w-full appearance-none"
              value={formData.total_quota ? formData.total_quota : ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  total_quota: parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>

          {/* Period */}
          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Select
              value={formData.period ? formData.period.slice(0, 4) : ""}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  period: `${value}-01-01`,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih tahun" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {Array.from({ length: 3 }, (_, idx) => {
                  const year = new Date().getFullYear() - idx
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Operation */}
          <div className="space-y-2">
            <Label htmlFor="operation">Operation</Label>
            <Select
              value={formData.operation}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  operation: value as "PENAMBAHAN" | "PENGURANGAN",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="PENAMBAHAN">Penambahan</SelectItem>
                <SelectItem value="PENGURANGAN">Pengurangan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Loading..." : isEditMode ? "Update" : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
