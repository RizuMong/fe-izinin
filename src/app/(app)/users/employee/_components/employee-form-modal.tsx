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
    useCreateEmployee,
    useUpdateEmployee,
} from "@/services/users/employee/hook"
import type { Employee } from "@/services/users/employee"

import { useSiteList } from "@/services/master-data/site/hook"
import { useAfdelingList } from "@/services/master-data/afdeling/hook"
import { useJobPositionList } from "@/services/master-data/job-position/hook"

import { useState, useEffect } from "react"

export function EmployeeFormModal({
    initialData,
}: {
    initialData?: Employee
}) {
    const [fullName, setFullName] = useState("")
    const [npk, setNpk] = useState("")
    const [siteId, setSiteId] = useState<string>("")
    const [afdelingId, setAfdelingId] = useState<string>("")
    const [jobPositionId, setJobPositionId] = useState<string>("")
    const [tmk, setTmk] = useState("")
    const [open, setOpen] = useState(false)

    const { mutate: create, isPending: loadingCreate } = useCreateEmployee()
    const { mutate: update, isPending: loadingUpdate } = useUpdateEmployee()

    // Fetch dropdown options
    const { data: sites, isLoading: loadingSites } = useSiteList()
    const { data: afdelings, isLoading: loadingAfdelings } = useAfdelingList()
    const { data: positions, isLoading: loadingPositions } = useJobPositionList()

    const isEdit = !!initialData

    useEffect(() => {
        if (initialData) {
            setFullName(initialData.full_name)
            setNpk(initialData.npk)
            setSiteId(initialData.site_id ? initialData.site_id.toString() : "")
            setAfdelingId(initialData.afdeling_id ? initialData.afdeling_id.toString() : "")
            setJobPositionId(initialData.job_position_id ? initialData.job_position_id.toString() : "")
            setTmk(initialData.tmk)
        }
    }, [initialData])

    const handleSubmit = () => {
        if (!fullName || !npk || !siteId || !afdelingId || !jobPositionId || !tmk) return

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
                    setFullName("")
                    setNpk("")
                    setSiteId("")
                    setAfdelingId("")
                    setJobPositionId("")
                    setTmk("")
                }
            })
        } else {
            create(payload, {
                onSuccess: () => {
                    setOpen(false)
                    setFullName("")
                    setNpk("")
                    setSiteId("")
                    setAfdelingId("")
                    setJobPositionId("")
                    setTmk("")
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
                    <Button> <Plus /> Add Employee</Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader className="p-0">
                    <DialogTitle className="text-lg font-semibold">
                        {isEdit ? "Edit Employee" : "Add Employee"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                        <div className="space-y-2.5">
                            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                                Full Name
                            </Label>
                            <Input
                                id="fullName"
                                placeholder="Enter full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full h-10"
                            />
                        </div>

                        <div className="space-y-2.5">
                            <Label htmlFor="npk" className="text-sm font-medium text-gray-700">
                                NPK
                            </Label>
                            <Input
                                id="npk"
                                placeholder="Enter NPK"
                                value={npk}
                                onChange={(e) => setNpk(e.target.value)}
                                className="w-full h-10"
                            />
                        </div>

                        <div className="space-y-2.5">
                            <Label htmlFor="site" className="text-sm font-medium text-gray-700">
                                Site
                            </Label>
                            <Select
                                value={siteId}
                                onValueChange={setSiteId}
                                disabled={loadingSites}
                            >
                                <SelectTrigger className="w-full h-10">
                                    <SelectValue placeholder="Select site" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sites?.data?.map((site) => (
                                        <SelectItem key={site.id} value={site.id.toString()}>
                                            {site.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2.5">
                            <Label htmlFor="afdeling" className="text-sm font-medium text-gray-700">
                                Afdeling
                            </Label>
                            <Select
                                value={afdelingId}
                                onValueChange={setAfdelingId}
                                disabled={loadingAfdelings}
                            >
                                <SelectTrigger className="w-full h-10">
                                    <SelectValue placeholder="Select afdeling" />
                                </SelectTrigger>
                                <SelectContent>
                                    {afdelings?.data?.map((afdeling) => (
                                        <SelectItem key={afdeling.id} value={afdeling.id.toString()}>
                                            {afdeling.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2.5">
                            <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                                Job Position
                            </Label>
                            <Select
                                value={jobPositionId}
                                onValueChange={setJobPositionId}
                                disabled={loadingPositions}
                            >
                                <SelectTrigger className="w-full h-10">
                                    <SelectValue placeholder="Select job position" />
                                </SelectTrigger>
                                <SelectContent>
                                    {positions?.data?.map((position) => (
                                        <SelectItem key={position.id} value={position.id.toString()}>
                                            {position.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2.5">
                            <Label htmlFor="tmk" className="text-sm font-medium text-gray-700">
                                TMK (Date)
                            </Label>
                            <Input
                                id="tmk"
                                type="date"
                                value={tmk}
                                onChange={(e) => setTmk(e.target.value)}
                                className="w-full h-10"
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="pt-6 border-t">
                    <Button
                        onClick={handleSubmit}
                        disabled={loadingCreate || loadingUpdate}
                        className="w-full h-10 font-medium"
                    >
                        {(loadingCreate || loadingUpdate) ? "Loading..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
