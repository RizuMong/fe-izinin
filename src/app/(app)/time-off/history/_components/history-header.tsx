"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface HistoryHeaderProps {
  requests: any[]
  isLoading: boolean
}

export function HistoryHeader({ requests, isLoading }: HistoryHeaderProps) {
  const handleExportCSV = () => {
    if (requests.length === 0) return

    const headers = [
      "Employee",
      "Time Off Type",
      "Start Date",
      "End Date",
      "Total Days",
      "Status",
      "Reason",
      "Created By",
      "Created At",
      "Updated By",
      "Updated At"
    ]

    const csvRows = [headers.join(",")]

    requests.forEach((req) => {
      const reasonSafe = (req.reason || "").replace(/"/g, '""').replace(/\n/g, " ")

      const row = [
        `"${req.employee?.name || "-"}"`,
        `"${req.time_off?.name || "-"}"`,
        `"${formatDate(req.start_date)}"`,
        `"${formatDate(req.end_date)}"`,
        req.total_days || 0,
        `"${req.status}"`,
        `"${reasonSafe}"`,
        `"${req.created_by_email || "-"}"`,
        `"${formatDate(req.created_at)}"`,
        `"${req.updated_by_email || "-"}"`,
        `"${formatDate(req.updated_at)}"`
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

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">History Time Off</h1>
        <p className="text-sm text-muted-foreground">
          Filter and download employee time-off requests
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
  )
}
