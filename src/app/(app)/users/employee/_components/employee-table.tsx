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
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"

import { EmployeeFormModal } from "./employee-form-modal"
import { EmployeeDeleteDialog } from "./employee-delete-dialog"

export function EmployeeTable() {
    const { data, isLoading, error } = useEmployeeList()

    if (error) return <div>Gagal memuat daftar Employee</div>

    return (
        <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
                <Table className="min-w-full">
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Name Lengkap</TableHead>
                            <TableHead>NPK</TableHead>
                            <TableHead>Site</TableHead>
                            <TableHead>Afdeling</TableHead>
                            <TableHead>Posisi Pekerjaan</TableHead>
                            <TableHead>TMK</TableHead>
                            <TableHead className="w-25">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableSkeleton columns={7} />
                        ) : !data?.data || data.data.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={7} className="p-0">
                                    <EmptyState title="Tidak ada Employee" description="Data Employee belum diAddkan." />
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.data.map((item) => (
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
    )
}
