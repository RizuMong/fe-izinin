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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Pencil, Plus, Search, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  useCreateTimeOffEmployee,
  useUpdateTimeOffEmployee,
  useEmployeeList,
  useTimeOffList,
} from "@/services/master-data/time-off-employee/hook"

import { useState, useEffect } from "react"

export function TimeOffEmployeeFormModal({
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
    useCreateTimeOffEmployee()
  const { mutate: update, isPending: loadingUpdate } =
    useUpdateTimeOffEmployee()

  // Fetch dropdown data
  const { data: employeeData } = useEmployeeList()
  const { data: timeoffData } = useTimeOffList()

  const [employeeSearch, setEmployeeSearch] = useState("")
  const [employeePopoverOpen, setEmployeePopoverOpen] = useState(false)

  const employees = employeeData?.data || []
  const filteredEmployees = employees.filter((emp: any) =>
    emp.full_name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    (emp.npk && emp.npk.toLowerCase().includes(employeeSearch.toLowerCase()))
  )

  const selectedEmployee = employees.find((emp: any) => emp.id === employeeId)

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


  // Find timeoff name by ID
  const selectedTimeOff = timeoffData?.data?.find(
    (t: { id: number; name: string }) => t.id === timeoffId
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="outline" size="sm">
            <Pencil />
          </Button>
        ) : (
          <Button>
            <Plus /> Add Leave Employee
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Leave Employee" : "Add Leave Employee"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modify existing employee leave entitlement"
              : "Register new employee leave entitlement"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Row 1: Employee & TimeOff */}
          <div className="grid grid-cols-2 gap-4">
            {/* Employee */}
            <div className="space-y-2">
              <Label htmlFor="employee">Employee *</Label>
              <Popover open={employeePopoverOpen} onOpenChange={setEmployeePopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between h-10 px-3 font-normal"
                    disabled={loadingCreate || loadingUpdate}
                  >
                    {selectedEmployee ? (
                      <span className="truncate">
                        {selectedEmployee.full_name} {selectedEmployee.npk ? `(NPK: ${selectedEmployee.npk})` : ""}
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
                      filteredEmployees.map((emp: any) => (
                        <div
                          key={emp.id}
                          className={cn(
                            "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors",
                            employeeId === emp.id && "bg-accent text-accent-foreground"
                          )}
                          onClick={() => {
                            setEmployeeId(emp.id)
                            setEmployeePopoverOpen(false)
                            setEmployeeSearch("")
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              employeeId === emp.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span>{emp.full_name}</span>
                            {emp.npk && <span className="text-xs text-muted-foreground">NPK: {emp.npk}</span>}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
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
                        : "Select time off"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {timeoffData?.data?.map((timeoff: { id: number; name: string }) => (
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
            Cancel
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
                ? "Save Changes"
                : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
