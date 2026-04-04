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

import { HolidayFormModal } from "./holiday-form-modal"
import { HolidayDeleteDialog } from "./holiday-delete-dialog"

export function HolidayTable() {
    const { data, isLoading, error } = useHolidayList()

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error loading holidays</div>

    return (
        <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
                <Table className="min-w-full">
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>National Holiday</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-25">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Badge variant={item.is_national_holiday ? "default" : "secondary"}>
                                        {item.is_national_holiday ? "Yes" : "No"}
                                    </Badge>
                                </TableCell>
                                <TableCell>{formatDate(item.date)}</TableCell>

                                <TableCell className="flex gap-2">
                                    <HolidayFormModal initialData={item} />
                                    <HolidayDeleteDialog id={item.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}