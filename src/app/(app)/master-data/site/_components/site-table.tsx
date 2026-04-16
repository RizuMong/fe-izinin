"use client"

import { useSiteList } from "@/services/master-data/site/hook"
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

import { SiteFormModal } from "./site-form-modal"
import { SiteDeleteDialog } from "./site-delete-dialog"

export function SiteTable() {
    const { data, isLoading, error, refetch } = useSiteList()

    if (error) {
        return (
            <Card className="p-6">
                <div className="text-center space-y-4">
                    <div className="text-red-500">
                        Terjadi kesalahan saat memuat data
                    </div>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        Coba lagi
                    </button>
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-0 overflow-hidden">
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
                        ) : !data || data.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="p-0">
                                    <EmptyState title="Tidak ada data site" description="Belum ada data site (lokasi) yang diAddkan." />
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{formatDate(item.created_at)}</TableCell>
                                    <TableCell>{formatDate(item.updated_at)}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <SiteFormModal initialData={item} />
                                        <SiteDeleteDialog id={item.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}