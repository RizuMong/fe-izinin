import { useState } from "react"
import { useJobPositionList } from "@/services/master-data/job-position/hook"
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
import { Button } from "@/components/ui/button"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

import { JobPositionFormModal } from "./job-position-form-modal"
import { JobPositionDeleteDialog } from "./job-position-delete-dialog"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"

export function JobPositionTable() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const { data, isLoading, error, refetch } = useJobPositionList({ page, limit })

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-red-500 mb-4">
                    An error occurred while loading data
                </div>
                <Button onClick={() => refetch()} variant="outline">
                    Try again
                </Button>
            </div>
        )
    }

    const jobPositions = data?.data || []
    const meta = data?.meta

    return (
        <div className="space-y-4">
            <Card className="w-full min-w-0 p-0 overflow-hidden">
                <CardContent className="p-0">
                    <Table className="min-w-full">
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                                <TableHead className="w-25">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading ? (
                                <TableSkeleton columns={4} />
                            ) : jobPositions.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={4} className="p-0">
                                        <EmptyState title="No Position Data" description="No job position data has been added yet." />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                jobPositions.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{formatDate(item.created_at)}</TableCell>
                                        <TableCell>{formatDate(item.updated_at)}</TableCell>

                                        <TableCell className="flex gap-2">
                                            <JobPositionFormModal initialData={item} />
                                            <JobPositionDeleteDialog id={item.id} />
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