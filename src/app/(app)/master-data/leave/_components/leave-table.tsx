"use client"

import { useLeaveList } from "@/services/master-data/leave/hook"

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

import { LeaveFormModal } from "./leave-form-modal"
import { LeaveDeleteDialog } from "./leave-delete-dialog"

export function LeaveTable() {
    const { data, isLoading, error } = useLeaveList()

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error loading leaves</div>

    return (
        <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
                <Table className="min-w-full">
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="w-25">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.data?.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.timeoff_type}</TableCell>

                                <TableCell className="flex gap-2">
                                    <LeaveFormModal initialData={item} />
                                    <LeaveDeleteDialog id={item.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}