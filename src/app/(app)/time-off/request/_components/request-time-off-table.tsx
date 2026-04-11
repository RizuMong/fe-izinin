"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Send } from "lucide-react"

// Hooks mapped to the strict @/ alias
import { 
  useRequestTimeOffList, 
  useSubmitRequestTimeOff 
} from "@/services/time-off/request/hook"

const getStatusBadge = (status: string) => {
  switch (status) {
    case "APPROVED":
      return <Badge className="bg-green-500 hover:bg-green-600 text-white">APPROVED</Badge>
    case "REJECTED":
      return <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">REJECTED</Badge>
    case "PENDING":
    case "SUBMITTED":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">{status}</Badge>
    case "DRAFT":
      return <Badge variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-800">DRAFT</Badge>
    default:
      return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">{status}</Badge>
  }
}

export function RequestTimeOffTable() {
  const { data, isLoading, isError } = useRequestTimeOffList()
  const submitMutation = useSubmitRequestTimeOff()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 border rounded-md bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-48 border rounded-md bg-white text-destructive">
        Terjadi kesalahan saat memuat data.
      </div>
    )
  }

  const requests = data?.data || []

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Time Off Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-center w-30">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              {/* colSpan updated to 7 to span across all headers including Action */}
              <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                Tidak ada data pengajuan cuti.
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request: any) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.employee?.name || "-"}
                </TableCell>
                <TableCell>{request.time_off?.name || "-"}</TableCell>
                <TableCell>
                  {new Date(request.start_date).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  {new Date(request.end_date).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  {getStatusBadge(request.status)}
                </TableCell>
                <TableCell className="max-w-50 truncate" title={request.reason}>
                  {request.reason || "-"}
                </TableCell>
                
                {/* ACTION COLUMN */}
                <TableCell className="text-center">
                  {request.status === "DRAFT" ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="default" 
                          size="sm" 
                          disabled={submitMutation.isPending}
                        >
                          {submitMutation.isPending && submitMutation.variables === request.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Send className="h-3 w-3 mr-2" />
                              Submit
                            </>
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Submit Pengajuan Cuti?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin melakukan submit pengajuan cuti ini? Status akan berubah menjadi PENDING dan akan diteruskan ke approver terkait.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel disabled={submitMutation.isPending}>
                            Batal
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => submitMutation.mutate(request.id)}
                            disabled={submitMutation.isPending}
                          >
                            Ya, Submit
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}