"use client"

import { useHolidayList } from "@/services/master-data/holiday/hook"
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
import { Badge } from "@/components/ui/badge"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"

import { HolidayFormModal } from "./holiday-form-modal"
import { HolidayDeleteDialog } from "./holiday-delete-dialog"

export function HolidayTable() {
    const { data, isLoading, error } = useHolidayList()

    if (error) return <div>Failed to load holiday list</div>

    return (
        <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
                <Table className="min-w-full">
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>National Holiday</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-25">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableSkeleton columns={4} />
                        ) : !data || data.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="p-0">
                                    <EmptyState title="No Holidays Found" description="No holiday data has been added yet." />
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.is_national_holiday ? "default" : "secondary"}>
                                            {item.is_national_holiday ? "Yes" : "No"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {item.is_national_holiday ? formatDate(item.date) : "--"}
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <HolidayFormModal initialData={item} />
                                        <HolidayDeleteDialog id={item.id} />
                                    </TableCell>
                                </TableRow>
                            )))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}