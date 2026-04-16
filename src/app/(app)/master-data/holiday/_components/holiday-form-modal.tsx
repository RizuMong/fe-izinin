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

import { useState, useEffect, useCallback } from "react"

const getDayName = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number)
    const d = new Date(year, month - 1, day)
    return d.toLocaleDateString('en-US', { weekday: 'long' })
}

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

    // Auto-derive name from selected date when not a national holiday
    const syncAutoName = useCallback((d: string, isNational: boolean) => {
        if (!isNational && d) {
            setName(getDayName(d))
        }
    }, [])

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
        // Name is auto-set for non-national holidays, only validate when editable
        if (isNationalHoliday && !name.trim()) {
            newErrors.name = "Holiday name is required"
        }
        if (!date) {
            newErrors.date = "Date is required"
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

            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Holiday" : "Add New Holiday"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="national" className="text-sm font-medium">
                            National Holiday
                        </Label>
                        <Select
                            value={isNationalHoliday ? "true" : "false"}
                            onValueChange={(value) => {
                                const isNational = value === "true"
                                setIsNationalHoliday(isNational)
                                // When toggling to non-national, auto-fill name from existing date
                                if (!isNational) {
                                    syncAutoName(date, false)
                                } else {
                                    // Clear auto-filled name so user can enter manually
                                    setName("")
                                }
                            }}
                            disabled={isLoading}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih opsi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No</SelectItem>
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
                                const newDate = e.target.value
                                setDate(newDate)
                                // Auto-set name whenever date changes for non-national holidays
                                syncAutoName(newDate, isNationalHoliday)
                                if (errors.date) setErrors({ ...errors, date: undefined })
                            }}
                            disabled={isLoading}
                            className={errors.date ? "border-red-500" : ""}
                        />
                        {errors.date && (
                            <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                        )}
                    </div>

                                        <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Holiday Name
                            {isNationalHoliday && <span className="text-red-500"> *</span>}
                        </Label>
                        <Input
                            id="name"
                            placeholder={isNationalHoliday ? "e.g. Eid al-Fitr" : "Auto-filled from date"}
                            value={name}
                            onChange={(e) => {
                                if (!isNationalHoliday) return
                                setName(e.target.value)
                                if (errors.name) setErrors({ ...errors, name: undefined })
                            }}
                            readOnly={!isNationalHoliday}
                            disabled={isLoading}
                            className={[
                                errors.name ? "border-red-500" : "",
                                !isNationalHoliday ? "bg-muted text-muted-foreground cursor-default" : "",
                            ].join(" ").trim()}
                        />
                        {!isNationalHoliday && (
                            <p className="text-xs text-muted-foreground">
                                Auto-filled based on the selected date.
                            </p>
                        )}
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
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
                        {isLoading ? "Saving..." : isEdit ? "Save Changes" : "Add Holiday"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}