import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
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
    const [name, setName] = useState("")
    const [isNationalHoliday, setIsNationalHoliday] = useState(false)
    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState<{ name?: string; date?: string }>({})

    const { mutate: create, isPending: loadingCreate } = useCreateHoliday()
    const { mutate: update, isPending: loadingUpdate } = useUpdateHoliday()

    const isEdit = !!initialData
    const isLoading = loadingCreate || loadingUpdate

    useEffect(() => {
        if (open) {
            if (initialData) {
                setName(initialData.name)
                setIsNationalHoliday(initialData.is_national_holiday)
                setDate(initialData.date)
            } else {
                setName("")
                setIsNationalHoliday(false)
                setDate("")
            }
            setErrors({})
        }
    }, [open, initialData])

    const validateForm = () => {
        const newErrors: { name?: string; date?: string } = {}
        if (!name.trim()) {
            newErrors.name = "Name holiday harus diisi"
        }
        if (!date) {
            newErrors.date = "Date harus diisi"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validateForm()) return

        if (isEdit) {
            update({
                id: initialData!.id,
                name,
                is_national_holiday: isNationalHoliday,
                date
            }, {
                onSuccess: () => {
                    setOpen(false)
                }
            })
        } else {
            create({
                name,
                is_national_holiday: isNationalHoliday,
                date
            }, {
                onSuccess: () => {
                    setOpen(false)
                }
            })
        }
    }

    const handleClose = () => {
        setOpen(false)
        setErrors({})
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEdit ? (
                    <Button variant="outline" size="sm" title="Edit Holiday">
                        <Pencil className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="w-4 h-4" /> Add Holiday
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Holiday" : "Add Holiday Baru"}
                    </DialogTitle>                    <DialogDescription>
                        {isEdit ? "Ubah data holiday yang sudah ada" : "Addkan holiday baru ke dalam sistem"}
                    </DialogDescription>                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Name Holiday <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            placeholder="Masukkan Name holiday"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                if (errors.name) setErrors({ ...errors, name: undefined })
                            }}
                            disabled={isLoading}
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="national" className="text-sm font-medium">
                            National Holiday
                        </Label>
                        <Select
                            value={isNationalHoliday ? "true" : "false"}
                            onValueChange={(value) => setIsNationalHoliday(value === "true")}
                            disabled={isLoading}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih opsi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Ya</SelectItem>
                                <SelectItem value="false">Tidak</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-sm font-medium">
                            Date <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value)
                                if (errors.date) setErrors({ ...errors, date: undefined })
                            }}
                            disabled={isLoading}
                            className={errors.date ? "border-red-500" : ""}
                        />
                        {errors.date && (
                            <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                        )}
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Menyimpan..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}