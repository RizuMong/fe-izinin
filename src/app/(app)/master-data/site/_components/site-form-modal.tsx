"use client"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Plus } from "lucide-react"

import {
    useCreateSite,
    useUpdateSite,
} from "@/services/master-data/site/hook"

import { useState, useEffect } from "react"

export function SiteFormModal({
    initialData,
}: {
    initialData?: { id: number; name: string }
}) {
    const [name, setName] = useState(initialData?.name || "")
    const [open, setOpen] = useState(false)

    const { mutate: create, isPending: loadingCreate } = useCreateSite()
    const { mutate: update, isPending: loadingUpdate } = useUpdateSite()

    const isEdit = !!initialData

    useEffect(() => {
        if (open && initialData) {
            setName(initialData.name)
        } else if (open && !initialData) {
            setName("")
        }
    }, [open, initialData])

    const handleSubmit = () => {
        if (!name) return

        if (isEdit) {
            update({ id: initialData!.id, name }, {
                onSuccess: () => {
                    setOpen(false)
                    setName("")
                }
            })
        } else {
            create({ name }, {
                onSuccess: () => {
                    setOpen(false)
                    setName("")
                }
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEdit ? (
                    <Button variant="outline" size="sm">
                        <Pencil />
                    </Button>
                ) : (
                    <Button> <Plus /> Tambah Site</Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Site" : "Tambah Site"}
                    </DialogTitle>
                </DialogHeader>

                <Input
                    placeholder="Nama site"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={loadingCreate || loadingUpdate}
                    >
                        {(loadingCreate || loadingUpdate) ? "Loading..." : "Simpan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}