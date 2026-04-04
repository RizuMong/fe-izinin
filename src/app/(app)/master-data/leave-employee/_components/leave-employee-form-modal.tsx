"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil, Plus } from "lucide-react"

import {
  useCreateLeaveEmployee,
  useUpdateLeaveEmployee,
  useEmployeeList,
  useTimeOffList,
} from "@/services/master-data/leave-employee/hook"

import { useState, useEffect } from "react"

export function LeaveEmployeeFormModal({
  initialData,
}: {
  initialData?: {
    id: number
    employee_id: number
    timeoff_id: number
    period: string
    total_quota: number
    remaining_balance: number
    used_quota: number
  }
}) {
  const [employeeId, setEmployeeId] = useState<number | null>(null)
  const [timeoffId, setTimeoffId] = useState<number | null>(null)
  const [period, setPeriod] = useState("")
  const [totalQuota, setTotalQuota] = useState<number | null>(null)
  const [remainingBalance, setRemainingBalance] = useState<number | null>(null)
  const [usedQuota, setUsedQuota] = useState<number | null>(null)
  const [open, setOpen] = useState(false)

  const { mutate: create, isPending: loadingCreate } =
    useCreateLeaveEmployee()
  const { mutate: update, isPending: loadingUpdate } =
    useUpdateLeaveEmployee()

  // Fetch dropdown data
  const { data: employeeData } = useEmployeeList()
  const { data: timeoffData } = useTimeOffList()

  const isEdit = !!initialData

  useEffect(() => {
    if (initialData) {
      setEmployeeId(initialData.employee_id)
      setTimeoffId(initialData.timeoff_id)
      setPeriod(initialData.period)
      setTotalQuota(initialData.total_quota)
      setRemainingBalance(initialData.remaining_balance)
      setUsedQuota(initialData.used_quota)
    }
  }, [initialData])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset form when closing
      setEmployeeId(null)
      setTimeoffId(null)
      setPeriod("")
      setTotalQuota(null)
      setRemainingBalance(null)
      setUsedQuota(null)
    }
  }

  const handleSubmit = () => {
    if (
      employeeId === null ||
      timeoffId === null ||
      !period ||
      totalQuota === null ||
      remainingBalance === null ||
      usedQuota === null
    )
      return

    if (isEdit) {
      update(
        {
          id: initialData!.id,
          employee_id: employeeId,
          timeoff_id: timeoffId,
          period,
          total_quota: totalQuota,
          remaining_balance: remainingBalance,
          used_quota: usedQuota,
        },
        {
          onSuccess: () => {
            handleOpenChange(false)
          },
        }
      )
    } else {
      create(
        {
          employee_id: employeeId,
          timeoff_id: timeoffId,
          period,
          total_quota: totalQuota,
          remaining_balance: remainingBalance,
          used_quota: usedQuota,
        },
        {
          onSuccess: () => {
            handleOpenChange(false)
          },
        }
      )
    }
  }

  // Find employee name by ID
  const selectedEmployee = employeeData?.data?.find(
    (emp) => emp.id === employeeId
  )
  // Find timeoff name by ID
  const selectedTimeOff = timeoffData?.data?.find((t) => t.id === timeoffId)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="outline" size="sm">
            <Pencil />
          </Button>
        ) : (
          <Button>
            <Plus /> Tambah Leave Employee
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Leave Employee" : "Tambah Leave Employee"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Ubah data leave employee yang sudah ada"
              : "Tambahkan data leave employee baru"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Row 1: Employee & TimeOff */}
          <div className="grid grid-cols-2 gap-4">
            {/* Employee */}
            <div className="space-y-2">
              <Label htmlFor="employee">Employee *</Label>
              <Select
                value={employeeId ? employeeId.toString() : ""}
                onValueChange={(value) => setEmployeeId(parseInt(value))}
              >
                <SelectTrigger id="employee" disabled={loadingCreate || loadingUpdate}>
                  <SelectValue
                    placeholder={
                      selectedEmployee
                        ? selectedEmployee.full_name
                        : "Pilih employee"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {employeeData?.data?.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                      {emp.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* TimeOff Type */}
            <div className="space-y-2">
              <Label htmlFor="timeoff">Time Off Type *</Label>
              <Select
                value={timeoffId ? timeoffId.toString() : ""}
                onValueChange={(value) => setTimeoffId(parseInt(value))}
              >
                <SelectTrigger id="timeoff" disabled={loadingCreate || loadingUpdate}>
                  <SelectValue
                    placeholder={
                      selectedTimeOff
                        ? selectedTimeOff.name
                        : "Pilih time off"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {timeoffData?.data?.map((timeoff) => (
                    <SelectItem key={timeoff.id} value={timeoff.id.toString()}>
                      {timeoff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Period */}
          <div className="space-y-2">
            <Label htmlFor="period">Period *</Label>
            <Input
              id="period"
              type="date"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              disabled={loadingCreate || loadingUpdate}
            />
          </div>

          {/* Row 3: Total Quota & Remaining Balance */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalQuota">Total Quota *</Label>
              <Input
                id="totalQuota"
                type="number"
                value={totalQuota ?? ""}
                onChange={(e) =>
                  setTotalQuota(e.target.value ? parseInt(e.target.value) : null)
                }
                disabled={loadingCreate || loadingUpdate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remainingBalance">Remaining Balance *</Label>
              <Input
                id="remainingBalance"
                type="number"
                value={remainingBalance ?? ""}
                onChange={(e) =>
                  setRemainingBalance(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                disabled={loadingCreate || loadingUpdate}
              />
            </div>
          </div>

          {/* Row 4: Used Quota */}
          <div className="space-y-2">
            <Label htmlFor="usedQuota">Used Quota *</Label>
            <Input
              id="usedQuota"
              type="number"
              value={usedQuota ?? ""}
              onChange={(e) =>
                setUsedQuota(e.target.value ? parseInt(e.target.value) : null)
              }
              disabled={loadingCreate || loadingUpdate}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={loadingCreate || loadingUpdate}
          >
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              loadingCreate ||
              loadingUpdate ||
              employeeId === null ||
              timeoffId === null ||
              !period ||
              totalQuota === null ||
              remainingBalance === null ||
              usedQuota === null
            }
          >
            {loadingCreate || loadingUpdate
              ? "Loading..."
              : isEdit
                ? "Simpan Perubahan"
                : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
