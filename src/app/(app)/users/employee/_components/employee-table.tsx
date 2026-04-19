import { useState } from "react"
import { useEmployeeList } from "@/services/users/employee/hook"
import { formatDate } from "@/lib/utils"

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

import { EmployeeFormModal } from "./employee-form-modal"
import { EmployeeDeleteDialog } from "./employee-delete-dialog"

export function EmployeeTable() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const { data, isLoading, error } = useEmployeeList({ page, limit })

    if (error) return <div>Failed to load employee list</div>

    const employees = data?.data || []
    const meta = data?.meta

    return (
        <div className="space-y-4">
            <Card className="w-full min-w-0 p-0 overflow-hidden">
                <CardContent className="p-0">
                    <Table className="min-w-full">
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Full Name</TableHead>
                                <TableHead>NPK</TableHead>
                                <TableHead>Site</TableHead>
                                <TableHead>Afdeling</TableHead>
                                <TableHead>Job Position</TableHead>
                                <TableHead>TMK</TableHead>
                                <TableHead className="w-25">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading ? (
                                <TableSkeleton columns={7} />
                            ) : employees.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={7} className="p-0">
                                        <EmptyState title="No Employees Found" description="No employee data added yet." />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                employees.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                                        <TableCell>{item.full_name}</TableCell>
                                        <TableCell>{item.npk}</TableCell>
                                        <TableCell>{item.site.name}</TableCell>
                                        <TableCell>{item.afdeling.name}</TableCell>
                                        <TableCell>{item.job_position.name}</TableCell>
                                        <TableCell>{formatDate(item.tmk)}</TableCell>

                                        <TableCell className="flex gap-2">
                                            <EmployeeFormModal initialData={item} />
                                            <EmployeeDeleteDialog id={item.id} />
                                        </TableCell>
                                    </TableRow>
                                )))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {meta && (
                <DataTablePagination 
                    meta={meta} 
                    onPageChange={setPage} 
                    onLimitChange={(l) => {
                        setLimit(l)
                        setPage(1)
                    }} 
                />
            )}
        </div>
    )
}
