import { useState } from "react"
import { useAfdelingList } from "@/services/master-data/afdeling/hook"
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

import { AfdelingFormModal } from "./afdeling-form-modal"
import { AfdelingDeleteDialog } from "./afdeling-delete-dialog"

export function AfdelingTable() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const { data, isLoading, error, refetch } = useAfdelingList({ page, limit })

    const afdelings = data?.data || []
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
                            ) : afdelings.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={4} className="p-0">
                                        <EmptyState title="No Afdeling Data" description="No afdeling data has been added yet." />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                afdelings.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{formatDate(item.created_at)}</TableCell>
                                        <TableCell>{formatDate(item.updated_at)}</TableCell>

                                        <TableCell className="flex gap-2">
                                            <AfdelingFormModal initialData={item} />
                                            <AfdelingDeleteDialog id={item.id} />
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