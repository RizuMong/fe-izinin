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
    useCreateHoliday,
    useUpdateHoliday,
} from "@/services/master-data/holiday/hook"

import { useState, useEffect } from "react"

export function HolidayFormModal({
    initialData,
}: {
    initialData?: {
        id: number
        name: string
        is_national_holiday: boolean
        date: string
    }
}) {
    const [name, setName] = useState(initialData?.name || "")
    const [isNationalHoliday, setIsNationalHoliday] = useState(initialData?.is_national_holiday || false)
    const [date, setDate] = useState(initialData?.date || "")
    const [open, setOpen] = useState(false)

    const resetForm = () => {
        setName("")
        setIsNationalHoliday(false)
        setDate("")
    }

    const handleSuccess = () => {
        setOpen(false)
        resetForm()
    }

    const { mutate: create, isPending: loadingCreate } = useCreateHoliday(handleSuccess)
    const { mutate: update, isPending: loadingUpdate } = useUpdateHoliday(handleSuccess)

    const isEdit = !!initialData

    useEffect(() => {
        if (open) {
            if (initialData) {
                // Editing existing data
                setName(initialData.name)
                setIsNationalHoliday(initialData.is_national_holiday)
                setDate(initialData.date)
            } else {
                // Creating new data
                resetForm()
            }
        }
    }, [open, initialData])

    const handleSubmit = () => {
        if (!name || !date) return

        if (isEdit) {
            update({
                id: initialData!.id,
                name,
                is_national_holiday: isNationalHoliday,
                date
            })
        } else {
            create({
                name,
                is_national_holiday: isNationalHoliday,
                date
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
                    <Button> <Plus /> Tambah Holiday</Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Holiday" : "Tambah Holiday"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            placeholder="Nama holiday"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="national">National Holiday</Label>
                        <Select
                            value={isNationalHoliday ? "true" : "false"}
                            onValueChange={(value) => setIsNationalHoliday(value === "true")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
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