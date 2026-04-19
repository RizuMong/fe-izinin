"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FilterX } from "lucide-react"
import type { FilterRequestTimeOffParams } from "@/services/time-off/request/types"

const STATUS_OPTIONS = ["DRAFT", "SUBMITTED", "PENDING", "APPROVED", "REJECTED", "CANCELLED"]

interface HistoryFiltersProps {
  filters: FilterRequestTimeOffParams
  setFilters: (filters: FilterRequestTimeOffParams) => void
  onReset: () => void
  employeeData: any
  isEmployeeLoading: boolean
  timeoffData: any
  isTimeoffLoading: boolean
}

export function HistoryFilters({
  filters,
  setFilters,
  onReset,
  employeeData,
  isEmployeeLoading,
  timeoffData,
  isTimeoffLoading,
}: HistoryFiltersProps) {
  const toggleStatusFilter = (status: string) => {
    const currentStatuses = filters.status || []
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status]
    setFilters({ ...filters, status: newStatuses })
  }

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Filter Data</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground h-8">
          <FilterX className="h-4 w-4 mr-2" />
          Reset Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Employee</Label>
          <Select
            value={filters.employee_id?.toString()}
            onValueChange={(val) => setFilters({ ...filters, employee_id: val === "ALL" ? "" : val })}
          >
            <SelectTrigger>
              <SelectValue placeholder={isEmployeeLoading ? "Loading..." : "All Employees"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Employees</SelectItem>
              {employeeData?.data?.map((emp: any) => (
                <SelectItem key={emp.id} value={emp.id.toString()}>
                  {emp.name || emp.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Time Off Type</Label>
          <Select
            value={filters.timeoff_id?.toString()}
            onValueChange={(val) => setFilters({ ...filters, timeoff_id: val === "ALL" ? "" : val })}
          >
            <SelectTrigger>
              <SelectValue placeholder={isTimeoffLoading ? "Loading..." : "All Time Off Type"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Time Off Type</SelectItem>
              {timeoffData?.data?.map((type: any) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Start Date</Label>
          <Input
            type="date"
            value={filters.start_date}
            onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">End Date</Label>
          <Input
            type="date"
            value={filters.end_date}
            onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100">
        <Label className="text-xs text-muted-foreground mb-2 block">Request Status</Label>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((status) => {
            const isSelected = filters.status?.includes(status)
            return (
              <Badge
                key={status}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all ${isSelected ? "bg-slate-800 hover:bg-slate-700 text-white" : "hover:bg-slate-100 text-slate-600"
                  }`}
                onClick={() => toggleStatusFilter(status)}
              >
                {status}
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}
