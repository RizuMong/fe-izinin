"use client"

import { useState } from "react"
import { useRequestTimeOffListWithFilter } from "@/services/time-off/request/hook"
import { useEmployeeList } from "@/services/users/employee"
import { useTimeOffList } from "@/services/master-data/time-off/timeoff"
import type { FilterRequestTimeOffParams } from "@/services/time-off/request/types"

import { HistoryHeader } from "./_components/history-header"
import { HistoryFilters } from "./_components/history-filters"
import { HistoryTable } from "./_components/history-table"

const INITIAL_FILTERS: FilterRequestTimeOffParams = {
  page: 1,
  limit: 100, // Load enough data for the report
  status: [],
  employee_id: "",
  timeoff_id: "",
  start_date: "",
  end_date: "",
}

export default function TimeOffHistoryPage() {
  const [filters, setFilters] = useState<FilterRequestTimeOffParams>(INITIAL_FILTERS)

  const { data: reportData, isLoading, isFetching } = useRequestTimeOffListWithFilter(filters)
  const { data: employeeData, isLoading: isEmployeeLoading } = useEmployeeList()
  const { data: timeoffData, isLoading: isTimeoffLoading } = useTimeOffList()

  const requests = reportData?.data || []

  const handleResetFilters = () => setFilters(INITIAL_FILTERS)

  return (
    <div className="space-y-6">
      <HistoryHeader 
        requests={requests} 
        isLoading={isLoading} 
      />

      <HistoryFilters
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
        employeeData={employeeData}
        isEmployeeLoading={isEmployeeLoading}
        timeoffData={timeoffData}
        isTimeoffLoading={isTimeoffLoading}
      />

      <HistoryTable 
        requests={requests} 
        isLoading={isLoading} 
        isFetching={isFetching} 
      />
    </div>
  )
}