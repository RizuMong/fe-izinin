"use client"

import { useState } from "react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2, Download, FilterX } from "lucide-react"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"

import { useRequestTimeOffListWithFilter } from "@/services/time-off/request/hook"
import { useEmployeeList } from "@/services/users/employee"
import { useTimeOffList } from "@/services/master-data/time-off/timeoff"
import type { FilterRequestTimeOffParams } from "@/services/time-off/request/types"

const STATUS_OPTIONS = ["DRAFT", "SUBMITTED", "PENDING", "APPROVED", "REJECTED"]

const INITIAL_FILTERS: FilterRequestTimeOffParams = {
  page: 1,
  limit: 100, // Load cukup banyak data untuk report
  status: [],
  employee_id: "",
  timeoff_id: "",
  start_date: "",
  end_date: "",
}

const getStatusBadge = (status: string) => {
  const baseClass = "rounded-full px-3 py-1 text-xs font-medium"
  switch (status) {
    case "APPROVED":
      return <Badge className={`${baseClass} bg-green-500 hover:bg-green-600 text-white`}>APPROVED</Badge>
    case "REJECTED":
      return <Badge variant="destructive" className={`${baseClass} bg-red-400 hover:bg-red-600 text-white`}>REJECTED</Badge>
    case "PENDING":
    case "SUBMITTED":
      return <Badge className={`${baseClass} bg-yellow-500 hover:bg-yellow-600 text-white`}>{status}</Badge>
    case "DRAFT":
      return <Badge className={`${baseClass} bg-gray-200 hover:bg-gray-300 text-gray-800`}>DRAFT</Badge>
    default:
      return <Badge className={`${baseClass} bg-gray-200 hover:bg-gray-300 text-gray-800`}>{status}</Badge>
  }
}

export default function TimeOffReportPage() {
  const [filters, setFilters] = useState<FilterRequestTimeOffParams>(INITIAL_FILTERS)

  const { data: reportData, isLoading, isFetching } = useRequestTimeOffListWithFilter(filters)
  const { data: employeeData, isLoading: isEmployeeLoading } = useEmployeeList()
  const { data: timeoffData, isLoading: isTimeoffLoading } = useTimeOffList()

  const requests = reportData?.data || []

  // -- EXPORT TO CSV --
  const handleExportCSV = () => {
    if (requests.length === 0) return

    const headers = [
      "Employee",
      "Time Off Type",
      "Start Date",
      "End Date",
      "Total Days",
      "Status",
      "Reason"
    ]

    const csvRows = [headers.join(",")]

    requests.forEach((req) => {
      // Memastikan format CSV tidak pecah jika ada tanda koma (,) atau newline pada Reason
      const reasonSafe = (req.reason || "").replace(/"/g, '""').replace(/\n/g, " ")

      const row = [
        `"${req.employee?.name || "-"}"`,
        `"${req.time_off?.name || "-"}"`,
        `"${new Date(req.start_date).toLocaleDateString("id-ID")}"`,
        `"${new Date(req.end_date).toLocaleDateString("id-ID")}"`,
        req.total_days || 0,
        `"${req.status}"`,
        `"${reasonSafe}"`
      ]
      csvRows.push(row.join(","))
    })

    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `time-off-report-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // -- FILTER HANDLERS --
  const handleResetFilters = () => setFilters(INITIAL_FILTERS)

  const toggleStatusFilter = (status: string) => {
    setFilters((prev) => {
      const currentStatuses = prev.status || []
      const newStatuses = currentStatuses.includes(status)
        ? currentStatuses.filter((s) => s !== status)
        : [...currentStatuses, status]
      return { ...prev, status: newStatuses }
    })
  }

  return (
    <div className="space-y-6">

      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Laporan Cuti</h1>
          <p className="text-sm text-muted-foreground">
            Filter and download employee time off request reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportCSV}
            disabled={isLoading || requests.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Filter Data</h3>
          <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-muted-foreground h-8">
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
                <SelectValue placeholder={isEmployeeLoading ? "Memuat..." : "Semua Employee"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Employee</SelectItem>
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
                <SelectValue placeholder={isTimeoffLoading ? "Memuat..." : "Semua Time Off Type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Time Off Type</SelectItem>
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

        {/* STATUS MULTI-SELECT (Interactive Badges) */}
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

      {/* DATA TABLE */}
      <div className="rounded-xl border bg-white overflow-hidden shadow-sm relative">
        {/* Loading Overlay saat Fetching Ulang Filter */}
        {isFetching && !isLoading && (
          <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        )}

        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">Employee</TableHead>
              <TableHead className="font-semibold text-slate-700">Time Off Type</TableHead>
              <TableHead className="font-semibold text-slate-700">Start Date</TableHead>
              <TableHead className="font-semibold text-slate-700">End Date</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Total Days</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton columns={6} />
            ) : requests.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="p-0">
                  <EmptyState title="Laporan Cuti Kosong" description="Tidak ada data laporan cuti yang sesuai dengan filter." />
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{request.employee?.name || "-"}</TableCell>
                  <TableCell className="text-slate-600">{request.time_off?.name || "-"}</TableCell>
                  <TableCell className="text-slate-600">
                    {new Date(request.start_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {new Date(request.end_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="text-center font-medium text-slate-700">{request.total_days || 0}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(request.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}