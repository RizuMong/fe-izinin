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

  const { mutate: create, isPending: loadingCreate } = useCreateJobPosition()
  const { mutate: update, isPending: loadingUpdate } = useUpdateJobPosition()

  const isEdit = !!initialData

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
    } else {
      setName("")
    }
  }, [initialData])

  const handleSubmit = () => {
    if (!name) return

    if (isEdit) {
      update(
        { id: initialData!.id, name },
        {
          onSuccess: () => {
            setOpen(false)
            setName("")
          },
        }
      )
    } else {
      create(
        { name },
        {
          onSuccess: () => {
            setOpen(false)
            setName("")
          },
        }
      )
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
          <Button>
            <Plus /> Tambah Job Position
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Job Position" : "Tambah Job Position"}</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Nama job position"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loadingCreate || loadingUpdate}>
            {loadingCreate || loadingUpdate ? "Loading..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
