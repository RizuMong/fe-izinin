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
    useCreateEmployee,
    useUpdateEmployee,
} from "@/services/users/employee/hook"

import { useSiteList } from "@/services/master-data/site/hook"
import { useAfdelingList } from "@/services/master-data/afdeling/hook"
import { useJobPositionList } from "@/services/master-data/job-position/hook"

import { useState, useEffect } from "react"

export function EmployeeFormModal({
    initialData,
}: {
    initialData?: {
        id: number
        full_name: string
        npk: string
        site_id: number | null
        afdeling_id: number | null
        job_position_id: number | null
        tmk: string
    }
}) {
    const [fullName, setFullName] = useState("")
    const [npk, setNpk] = useState("")
    const [siteId, setSiteId] = useState<string>("")
    const [afdelingId, setAfdelingId] = useState<string>("")
    const [jobPositionId, setJobPositionId] = useState<string>("")
    const [tmk, setTmk] = useState("")
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState<{
        fullName?: string
        npk?: string
        siteId?: string
        afdelingId?: string
        jobPositionId?: string
        tmk?: string
    }>({}

)

    const { mutate: create, isPending: loadingCreate } = useCreateEmployee()
    const { mutate: update, isPending: loadingUpdate } = useUpdateEmployee()

    // Fetch dropdown options
    const { data: sites, isLoading: loadingSites } = useSiteList()
    const { data: afdelings, isLoading: loadingAfdelings } = useAfdelingList()
    const { data: positions, isLoading: loadingPositions } = useJobPositionList()

    const isEdit = !!initialData
    const isLoading = loadingCreate || loadingUpdate

    useEffect(() => {
        if (open) {
            if (initialData) {
                setFullName(initialData.full_name)
                setNpk(initialData.npk)
                setSiteId(initialData.site_id ? initialData.site_id.toString() : "")
                setAfdelingId(initialData.afdeling_id ? initialData.afdeling_id.toString() : "")
                setJobPositionId(initialData.job_position_id ? initialData.job_position_id.toString() : "")
                setTmk(initialData.tmk)
            } else {
                setFullName("")
                setNpk("")
                setSiteId("")
                setAfdelingId("")
                setJobPositionId("")
                setTmk("")
            }
            setErrors({})
        }
    }, [open, initialData])

    const validateForm = () => {
        const newErrors: typeof errors = {}
        if (!fullName.trim()) newErrors.fullName = "Nama lengkap harus diisi"
        if (!npk.trim()) newErrors.npk = "NPK harus diisi"
        if (!siteId) newErrors.siteId = "Site harus dipilih"
        if (!afdelingId) newErrors.afdelingId = "Afdeling harus dipilih"
        if (!jobPositionId) newErrors.jobPositionId = "Job Position harus dipilih"
        if (!tmk) newErrors.tmk = "TMK harus diisi"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validateForm()) return

        const payload = {
            full_name: fullName,
            npk,
            site_id: parseInt(siteId),
            afdeling_id: parseInt(afdelingId),
            job_position_id: parseInt(jobPositionId),
            tmk,
        }

        if (isEdit) {
            update({
                id: initialData!.id,
                ...payload
            }, {
                onSuccess: () => {
                    setOpen(false)
                }
            })
        } else {
            create(payload, {
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

    const clearFieldError = (field: keyof typeof errors) => {
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEdit ? (
                    <Button variant="outline" size="sm" title="Edit Employee">
                        <Pencil className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="w-4 h-4" /> Tambah Employee
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Employee" : "Tambah Employee Baru"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-sm font-medium">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="fullName"
                                placeholder="Masukkan nama lengkap"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value)
                                    clearFieldError("fullName")
                                }}
                                disabled={isLoading}
                                className={`w-full h-10 ${errors.fullName ? "border-red-500" : ""}`}
                            />
                            {errors.fullName && (
                                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        {/* NPK */}
                        <div className="space-y-2">
                            <Label htmlFor="npk" className="text-sm font-medium">
                                NPK <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="npk"
                                placeholder="Masukkan NPK\&quot;"
                                value={npk}
                                onChange={(e) => {
                                    setNpk(e.target.value)
                                    clearFieldError("npk")
                                }}
                                disabled={isLoading}
                                className={`w-full h-10 ${errors.npk ? "border-red-500" : ""}`}
                            />
                            {errors.npk && (
                                <p className="text-xs text-red-500 mt-1">{errors.npk}</p>
                            )}
                        </div>

                        {/* Site */}
                        <div className="space-y-2">
                            <Label htmlFor="site" className="text-sm font-medium">
                                Site <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={siteId}
                                onValueChange={(value) => {
                                    setSiteId(value)
                                    clearFieldError("siteId")
                                }}
                                disabled={loadingSites || isLoading}
                            >
                                <SelectTrigger className={`w-full h-10 ${errors.siteId ? "border-red-500" : ""}`}>
                                    <SelectValue placeholder="Pilih site" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sites?.map((site) => (
                                        <SelectItem key={site.id} value={site.id.toString()}>
                                            {site.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.siteId && (
                                <p className="text-xs text-red-500 mt-1">{errors.siteId}</p>
                            )}
                        </div>

                        {/* Afdeling */}
                        <div className="space-y-2">
                            <Label htmlFor="afdeling" className="text-sm font-medium">
                                Afdeling <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={afdelingId}
                                onValueChange={(value) => {
                                    setAfdelingId(value)
                                    clearFieldError("afdelingId")
                                }}
                                disabled={loadingAfdelings || isLoading}
                            >
                                <SelectTrigger className={`w-full h-10 ${errors.afdelingId ? "border-red-500" : ""}`}>
                                    <SelectValue placeholder="Pilih afdeling" />
                                </SelectTrigger>
                                <SelectContent>
                                    {afdelings?.map((afdeling) => (
                                        <SelectItem key={afdeling.id} value={afdeling.id.toString()}>
                                            {afdeling.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.afdelingId && (
                                <p className="text-xs text-red-500 mt-1">{errors.afdelingId}</p>
                            )}
                        </div>

                        {/* Job Position */}
                        <div className="space-y-2">
                            <Label htmlFor="position" className="text-sm font-medium">
                                Job Position <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={jobPositionId}
                                onValueChange={(value) => {
                                    setJobPositionId(value)
                                    clearFieldError("jobPositionId")
                                }}
                                disabled={loadingPositions || isLoading}
                            >
                                <SelectTrigger className={`w-full h-10 ${errors.jobPositionId ? "border-red-500" : ""}`}>
                                    <SelectValue placeholder="Pilih job position" />
                                </SelectTrigger>
                                <SelectContent>
                                    {positions?.map((position) => (
                                        <SelectItem key={position.id} value={position.id.toString()}>
                                            {position.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.jobPositionId && (
                                <p className="text-xs text-red-500 mt-1">{errors.jobPositionId}</p>
                            )}
                        </div>

                        {/* TMK */}
                        <div className="space-y-2">
                            <Label htmlFor="tmk" className="text-sm font-medium">
                                TMK (Tanggal) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="tmk"
                                type="date"
                                value={tmk}
                                onChange={(e) => {
                                    setTmk(e.target.value)
                                    clearFieldError("tmk")
                                }}
                                disabled={isLoading}
                                className={`w-full h-10 ${errors.tmk ? "border-red-500" : ""}`}
                            />
                            {errors.tmk && (
                                <p className="text-xs text-red-500 mt-1">{errors.tmk}</p>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="min-w-[100px]"
                    >
                        {isLoading ? "Menyimpan..." : "Simpan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
