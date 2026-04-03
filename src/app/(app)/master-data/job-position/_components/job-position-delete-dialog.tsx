"use client"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useDeleteJobPosition } from "@/services/master-data/job-position/hook"
import { useState } from "react"

export function JobPositionDeleteDialog({ id }: { id: number }) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useDeleteJobPosition()

  const handleDelete = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin ingin menghapus data ini?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
