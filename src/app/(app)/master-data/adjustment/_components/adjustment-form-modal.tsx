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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Plus, Edit, Loader2, Search, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  useCreateAdjustment,
  useUpdateAdjustment,
} from "@/services/master-data/adjustment"
import { useEmployeeList } from "@/services/users/employee"
import { useTimeOffList } from "@/services/master-data/time-off/timeoff"
import type {
  Adjustment,
  AdjustmentPayload,
} from "@/services/master-data/adjustment"

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
  const { data: employeeData, isLoading: employeesLoading } = useEmployeeList({ limit: 1000 })
  const { data: timeoffData, isLoading: timeoffsLoading } = useTimeOffList({ limit: 1000 })

  const [employeeSearch, setEmployeeSearch] = useState("")
  const [employeePopoverOpen, setEmployeePopoverOpen] = useState(false)

  const employees = employeeData?.data || []
  const filteredEmployees = employees.filter((emp: any) =>
    emp.full_name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    emp.npk.toLowerCase().includes(employeeSearch.toLowerCase())
  )

  const selectedEmployee = employees.find((emp: any) => emp.id === formData.employee_id)

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
            Add Adjustment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Adjustment" : "Add Adjustment"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update adjustment details"
              : "Create a new quota adjustment"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee */}
          <div className="space-y-2">
            <Label htmlFor="employee_id">Employee</Label>
            {employeesLoading ? (
              <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading employee data...
              </div>
            ) : (
              <Popover open={employeePopoverOpen} onOpenChange={setEmployeePopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between h-10 px-3 font-normal"
                  >
                    {selectedEmployee ? (
                      <span className="truncate">
                        {selectedEmployee.full_name} (NPK: {selectedEmployee.npk})
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Select employee...</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                      className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Search employee..."
                      value={employeeSearch}
                      onChange={(e) => setEmployeeSearch(e.target.value)}
                    />
                  </div>
                  <div 
                    className="max-h-60 overflow-y-auto p-1"
                    onWheel={(e) => e.stopPropagation()}
                  >
                    {filteredEmployees.length === 0 ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        No employee found.
                      </div>
                    ) : (
                      filteredEmployees.map((employee: any) => (
                        <div
                          key={employee.id}
                          className={cn(
                            "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors",
                            formData.employee_id === employee.id && "bg-accent text-accent-foreground"
                          )}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              employee_id: employee.id,
                            })
                            setEmployeePopoverOpen(false)
                            setEmployeeSearch("")
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.employee_id === employee.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span>{employee.full_name}</span>
                            <span className="text-xs text-muted-foreground">NPK: {employee.npk}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Time Off */}
          <div className="space-y-2">
            <Label htmlFor="timeoff_id">Cuti</Label>
            {timeoffsLoading ? (
              <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading time-off data...
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
                  <SelectValue placeholder="Select Time Off" />
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
            <Label htmlFor="total_quota">Total Kuota</Label>
            <Input
              id="total_quota"
              type="number"
              placeholder="0"
              className="w-full appearance-none"
              value={formData.total_quota || ""}
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
            <Label htmlFor="period">Periode</Label>
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
                <SelectValue placeholder="Select year" />
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
            <Label htmlFor="operation">Operasi</Label>
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
                <SelectItem value="PENAMBAHAN">PENAMBAHAN</SelectItem>
                <SelectItem value="PENGURANGAN">PENGURANGAN</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Processing..." : isEditMode ? "Update" : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
