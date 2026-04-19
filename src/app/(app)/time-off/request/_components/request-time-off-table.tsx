import { useState } from "react"
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
import { Loader2, Send, XCircle } from "lucide-react"

// Hooks mapped to the strict @/ alias
import {
  useRequestTimeOffList,
  useSubmitRequestTimeOff,
  useCancelRequestTimeOff
} from "@/services/time-off/request/hook"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

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
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, isError } = useRequestTimeOffList({ page, limit })
  const submitMutation = useSubmitRequestTimeOff()
  const cancelMutation = useCancelRequestTimeOff()

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
        An error occurred while loading data.
      </div>
    )
  }

  const requests = data?.data || []
  const meta = data?.meta

  return (
    <div className="space-y-4">
      <div className="w-full min-w-0 rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Time Off Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Total Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-center w-30">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                  No time-off requests found.
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
                    {request.total_days}
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
                              <AlertDialogTitle>Submit Request Time Off?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to submit this time off request?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={submitMutation.isPending}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => submitMutation.mutate(request.id)}
                                disabled={submitMutation.isPending}
                              >
                                Submit
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : (request.status === "SUBMITTED" || request.status === "PENDING") ? (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={cancelMutation.isPending}
                            >
                              {cancelMutation.isPending && cancelMutation.variables === request.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <XCircle className="h-3 w-3 mr-2" />
                                  Cancel
                                </>
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Request Time Off?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel this time off request? This action cannot be undone and your quota will be restored.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={cancelMutation.isPending}>
                                No, Keep It
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => cancelMutation.mutate(request.id)}
                                disabled={cancelMutation.isPending}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Yes, Cancel
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
      
      {meta && (
        <DataTablePagination 
          meta={meta} 
          onPageChange={setPage} 
          onLimitChange={(l) => {
            setLimit(l)
            setPage(1)
          }} 
        />
      )}
    </div>
  )
}