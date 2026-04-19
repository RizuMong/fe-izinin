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
  useCreateJobPosition,
  useUpdateJobPosition,
} from "@/services/master-data/job-position/hook"

import { useState, useEffect } from "react"

export function JobPositionFormModal({
  initialData,
}: {
  initialData?: { id: number; name: string }
}) {
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<{ name?: string }>({})

  const { mutate: create, isPending: loadingCreate } = useCreateJobPosition()
  const { mutate: update, isPending: loadingUpdate } = useUpdateJobPosition()

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
      newErrors.name = "Job position name is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    if (isEdit) {
      update(
        { id: initialData!.id, name },
        {
          onSuccess: () => {
            setOpen(false)
          },
        }
      )
    } else {
      create(
        { name },
        {
          onSuccess: () => {
            setOpen(false)
          },
        }
      )
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
          <Button variant="outline" size="sm" title="Edit Job Position">
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="w-4 h-4" /> Add Job Position
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Job Position" : "Add New Job Position"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Modify existing job position information" : "Add a new job position to the system"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Job Position Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter job position name"
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
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
