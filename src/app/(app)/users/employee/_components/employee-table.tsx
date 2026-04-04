"use client"

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

import { EmployeeFormModal } from "./employee-form-modal"
import { EmployeeDeleteDialog } from "./employee-delete-dialog"

export function EmployeeTable() {
    const { data, isLoading, error } = useEmployeeList()

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error loading employees</div>

    return (
        <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
                <Table className="min-w-full">
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>NPK</TableHead>
                            <TableHead>Site ID</TableHead>
                            <TableHead>Afdeling ID</TableHead>
                            <TableHead>Job Position ID</TableHead>
                            <TableHead>TMK</TableHead>
                            <TableHead className="w-25">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.data?.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                                <TableCell>{item.full_name}</TableCell>
                                <TableCell>{item.npk}</TableCell>
                                <TableCell>{item.site_id}</TableCell>
                                <TableCell>{item.afdeling_id}</TableCell>
                                <TableCell>{item.job_position_id}</TableCell>
                                <TableCell>{formatDate(item.tmk)}</TableCell>

                                <TableCell className="flex gap-2">
                                    <EmployeeFormModal initialData={item} />
                                    <EmployeeDeleteDialog id={item.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
