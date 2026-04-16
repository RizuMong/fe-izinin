"use client"

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
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState<{ name?: string }>({})

    const { mutate: create, isPending: loadingCreate } = useCreateSite()
    const { mutate: update, isPending: loadingUpdate } = useUpdateSite()

    const isEdit = !!initialData
    const isLoading = loadingCreate || loadingUpdate

    useEffect(() => {
        if (open) {
            if (initialData) {
                setName(initialData.name)
            } else {
                setName("")
            }
            setErrors({})
        }
    }, [open, initialData])

    const validateForm = () => {
        const newErrors: { name?: string } = {}
        if (!name.trim()) {
            newErrors.name = "Name site harus diisi"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validateForm()) return

        if (isEdit) {
            update({ id: initialData!.id, name }, {
                onSuccess: () => {
                    setOpen(false)
                }
            })
        } else {
            create({ name }, {
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
                    <Button variant="outline" size="sm" title="Edit Site">
                        <Pencil className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="w-4 h-4" /> Add Site
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Site" : "Add Site Baru"}
                    </DialogTitle>                    <DialogDescription>
                        {isEdit ? "Ubah data site yang sudah ada" : "Addkan site baru ke dalam sistem"}
                    </DialogDescription>                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Name Site <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            placeholder="Masukkan Name site"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                if (errors.name) setErrors({})
                            }}
                            disabled={isLoading}
                            className={errors.name ? "border-red-500" : ""}
                        />
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
                        {isLoading ? "Menyimpan..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}