"use client"

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

import { TimeOffFormModal } from "./time-off-form-modal"
import { TimeOffDeleteDialog } from "./time-off-delete-dialog"

export function TimeOffTable() {
    const { data, isLoading, error } = useTimeOffList()

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
                                    <TimeOffFormModal initialData={item} />
                                    {/* <TimeOffDeleteDialog id={item.id} /> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}