"use client"

import { useAfdelingList } from "@/services/master-data/afdeling/hook"
import { formatDate } from "@/lib/utils"
import { Pencil, Trash2 } from "lucide-react"

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"

import { AfdelingFormModal } from "./afdeling-form-modal"
import { AfdelingDeleteDialog } from "./afdeling-delete-dialog"

export function AfdelingTable() {
    const { data, isLoading } = useAfdelingList()

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead className="w-25">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{formatDate(item.created_at)}</TableCell>
                            <TableCell>{formatDate(item.updated_at)}</TableCell>

                            <TableCell className="flex gap-2">
                                <AfdelingFormModal initialData={item} />
                                <AfdelingDeleteDialog id={item.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}