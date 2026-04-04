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
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Pencil, Plus } from "lucide-react"

import {
    useCreateLeave,
    useUpdateLeave,
} from "@/services/master-data/leave/hook"

import { useState, useEffect } from "react"

const LEAVE_TYPES = [
  "CUTI TAHUNAN",
  "CUTI SAKIT",
  "CUTI MELAHIRKAN",
  "CUTI DARURAT",
  "CUTI MENIKAH",
]

export function LeaveFormModal({
    initialData,
}: {
    initialData?: {
        id: number
        name: string
        timeoff_type: string
    }
}) {
    const [name, setName] = useState("")
    const [timeoffType, setTimeoffType] = useState("")
    const [open, setOpen] = useState(false)

    const { mutate: create, isPending: loadingCreate } = useCreateLeave()
    const { mutate: update, isPending: loadingUpdate } = useUpdateLeave()

    const isEdit = !!initialData

    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
            setTimeoffType(initialData.timeoff_type)
        }
    }, [initialData])

    const handleSubmit = () => {
        if (!name || !timeoffType) return

        if (isEdit) {
            update({
                id: initialData!.id,
                name,
                timeoff_type: timeoffType
            }, {
                onSuccess: () => {
                    setOpen(false)
                    setName("")
                    setTimeoffType("")
                }
            })
        } else {
            create({
                name,
                timeoff_type: timeoffType
            }, {
                onSuccess: () => {
                    setOpen(false)
                    setName("")
                    setTimeoffType("")
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
                    <Button> <Plus /> Tambah Cuti</Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Cuti" : "Tambah Cuti"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            placeholder="Nama cuti"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="type">Type</Label>
                        <Select
                            value={timeoffType}
                            onValueChange={setTimeoffType}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih type" />
                            </SelectTrigger>
                            <SelectContent>
                                {LEAVE_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

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