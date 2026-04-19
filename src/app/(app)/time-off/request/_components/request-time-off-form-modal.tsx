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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Plus, Loader2, Search, Check, ChevronsUpDown } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

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

  // Close dialog and reset form on success
  useEffect(() => {
    if (createMutation.isSuccess) {
      setOpen(false)
      setFormData(INITIAL_STATE)
    }
  }, [createMutation.isSuccess])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.employee_id) return toast.error("Please select an employee.")
    if (!formData.timeoff_id) return toast.error("Please select a time-off type.")
    if (!formData.start_date) return toast.error("Start date is required.")
    if (!formData.end_date) return toast.error("End date is required.")

    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      return toast.error("Start date cannot be after end date.")
    }

    createMutation.mutate(formData)
  }

  const isLoading = createMutation.isPending

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Request Time Off
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Time Off</DialogTitle>
          <DialogDescription>
            Submit a New Time Off Request
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee Reference */}
          <div className="space-y-2">
            <Label htmlFor="employee_id">Employee</Label>
            {employeesLoading ? (
              <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading employees...
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

          {/* Time Off Reference */}
          <div className="space-y-2">
            <Label htmlFor="timeoff_id">Time Off Type</Label>
            {timeoffsLoading ? (
              <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading time-off types...
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
                  <SelectValue placeholder="Select Time Off Type" />
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
              <Label htmlFor="start_date">Start Date</Label>
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
              <Label htmlFor="end_date">End Date</Label>
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
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Submit a New Time Off Requestst Time Off"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}