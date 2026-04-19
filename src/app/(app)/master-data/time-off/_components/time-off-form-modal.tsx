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
    useCreateTimeOff,
    useUpdateTimeOff,
} from "@/services/master-data/time-off/hook"

import { useState, useEffect } from "react"

const LEAVE_TYPES = [
    "CUTI TAHUNAN",
    "CUTI BESAR",
    // "CUTI SAKIT",
    // "CUTI MELAHIRKAN",
    // "CUTI DARURAT",
    // "CUTI MENIKAH",
]

export function TimeOffFormModal({
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
    const [errors, setErrors] = useState<{ name?: string; timeoffType?: string }>({})

    const { mutate: create, isPending: loadingCreate } = useCreateTimeOff()
    const { mutate: update, isPending: loadingUpdate } = useUpdateTimeOff()

    const isEdit = !!initialData
    const isLoading = loadingCreate || loadingUpdate

    useEffect(() => {
        if (open) {
            if (initialData) {
                setName(initialData.name)
                setTimeoffType(initialData.timeoff_type)
            } else {
                setName("")
                setTimeoffType("")
            }
            setErrors({})
        }
    }, [open, initialData])

    const validateForm = () => {
        const newErrors: { name?: string; timeoffType?: string } = {}
        if (!name.trim()) {
            newErrors.name = "Time-off type name is required"
        }
        if (!timeoffType) {
            newErrors.timeoffType = "Please select a time-off category"
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
                timeoff_type: timeoffType
            }, {
                onSuccess: () => {
                    setOpen(false)
                }
            })
        } else {
            create({
                name,
                timeoff_type: timeoffType
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
                    <Button variant="outline" size="sm" title="Edit Cuti">
                        <Pencil className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="w-4 h-4" /> Add Cuti
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Time-off Type" : "Add New Time-off Type"}
                    </DialogTitle>                    <DialogDescription>
                        {isEdit ? "Modify existing time-off information" : "Add a new time-off type to the system"}
                    </DialogDescription>                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Time-off Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            placeholder="Enter time-off name"
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
                        <Label htmlFor="type" className="text-sm font-medium">
                            Time Off Type <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={timeoffType}
                            onValueChange={(value) => {
                                setTimeoffType(value)
                                if (errors.timeoffType) setErrors({ ...errors, timeoffType: undefined })
                            }}
                            disabled={isLoading}
                        >
                            <SelectTrigger className={errors.timeoffType ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {LEAVE_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.timeoffType && (
                            <p className="text-xs text-red-500 mt-1">{errors.timeoffType}</p>
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
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}