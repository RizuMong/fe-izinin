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
    useCreateAfdeling,
    useUpdateAfdeling,
} from "@/services/master-data/afdeling/hook"

import { useState, useEffect } from "react"

export function AfdelingFormModal({
    initialData,
}: {
    initialData?: { id: number; name: string }
}) {
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)

    const { mutate: create, isPending: loadingCreate } = useCreateAfdeling()
    const { mutate: update, isPending: loadingUpdate } = useUpdateAfdeling()

    const isEdit = !!initialData

    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
        }
    }, [initialData])

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
                    <Button> <Plus /> Tambah Afdeling</Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Afdeling" : "Tambah Afdeling"}
                    </DialogTitle>
                </DialogHeader>

                <Input
                    placeholder="Nama afdeling"
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