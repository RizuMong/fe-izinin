"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useJobPositionList } from "@/services/master-data/job-position/hook"
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
import { Button } from "@/components/ui/button"

import { JobPositionFormModal } from "./job-position-form-modal"
import { JobPositionDeleteDialog } from "./job-position-delete-dialog"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"

export function JobPositionTable() {
    const router = useRouter()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const fallbackRef = useRef<NodeJS.Timeout | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const [elapsedTime, setElapsedTime] = useState<number>(0)

    const { data, isLoading, error, refetch } = useJobPositionList()

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-red-500 mb-4">
                    Terjadi kesalahan saat memuat data
                </div>
                <Button onClick={() => refetch()} variant="outline">
                    Coba lagi
                </Button>
            </div>
        )
    }

    return (
        <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
                <Table className="min-w-full">
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Nama</TableHead>
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
                                    <EmptyState title="Tidak ada data posisi" description="Belum ada data posisi pekerjaan yang ditambahkan." />
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
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
    )
}