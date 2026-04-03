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
import { useDeleteAfdeling } from "@/services/master-data/afdeling/hook"

export function AfdelingDeleteDialog({ id }: { id: number }) {
  const { mutate, isPending } = useDeleteAfdeling()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2/>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Yakin ingin menghapus data ini?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate({ id })}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}