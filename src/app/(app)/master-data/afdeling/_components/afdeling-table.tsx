"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAfdelingList } from "@/services/master-data/afdeling/hook"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

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

import { AfdelingFormModal } from "./afdeling-form-modal"
import { AfdelingDeleteDialog } from "./afdeling-delete-dialog"

export function AfdelingTable() {
    const router = useRouter()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const fallbackRef = useRef<NodeJS.Timeout | null>(null)

    const { data, isLoading, error, refetch } = useAfdelingList()

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
                                    <EmptyState title="Tidak ada data afdeling" description="Belum ada data afdeling yang diAddkan." />
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
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
    )
}