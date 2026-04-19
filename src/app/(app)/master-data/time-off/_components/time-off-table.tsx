import { useState } from "react"
import { useTimeOffList } from "@/services/master-data/time-off/hook"

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

import { TimeOffFormModal } from "./time-off-form-modal"
import { TimeOffDeleteDialog } from "./time-off-delete-dialog"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"

export function TimeOffTable() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const { data, isLoading, error } = useTimeOffList({ page, limit })

    if (error) return <div>Error loading leaves</div>

    const leaves = data?.data || []
    const meta = data?.meta

    return (
        <div className="space-y-4">
            <Card className="w-full min-w-0 p-0 overflow-hidden">
                <CardContent className="p-0">
                    <Table className="min-w-full">
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="w-25">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading ? (
                                <TableSkeleton columns={3} />
                            ) : leaves.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={3} className="p-0">
                                        <EmptyState title="Tidak ada Time Off Type" description="Belum ada Time Off Type yang diAddkan." />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                leaves.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.timeoff_type}</TableCell>

                                        <TableCell className="flex gap-2">
                                            <TimeOffFormModal initialData={item} />
                                            {/* <TimeOffDeleteDialog id={item.id} /> */}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
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