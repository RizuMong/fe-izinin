"use client"

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteAdjustment } from "@/services/master-data/adjustment"

interface AdjustmentDeleteDialogProps {
  id: number
  onOpenChange: (open: boolean) => void
}

export function AdjustmentDeleteDialog({
  id,
  onOpenChange,
}: AdjustmentDeleteDialogProps) {
  const deleteMutation = useDeleteAdjustment()

  const handleDelete = () => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Hapus Adjustment?</AlertDialogTitle>
        <AlertDialogDescription>
          Data yang dihapus tidak dapat dipulihkan. Pastikan Anda benar-benar
          ingin menghapus adjustment ini.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="flex justify-end gap-2">
        <AlertDialogCancel disabled={deleteMutation.isPending}>
          Batal
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="bg-red-600 hover:bg-red-700"
        >
          {deleteMutation.isPending ? "Deleting..." : "Hapus"}
        </AlertDialogAction>
      </div>
    </AlertDialogContent>
  )
}
