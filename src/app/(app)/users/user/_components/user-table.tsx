import { useState } from "react"
import { useUserList } from "@/services/users/user/hook"
import { formatDate } from "@/lib/utils"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

export function UserTable() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, error, refetch } = useUserList({ page, limit })

  if (error) {
    return (
      <Card className="p-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <p className="text-red-500 font-medium">Failed to load data</p>
            <Button onClick={() => refetch()} variant="outline">
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const users = data?.data || []
  const meta = data?.meta

  return (
    <div className="space-y-4">
      <Card className="w-full min-w-0 p-0 overflow-hidden">
        <CardContent className="p-0">
          <Table className="min-w-full">
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableSkeleton columns={4} />
              ) : users.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={4} className="p-0">
                    <EmptyState title="No account data" description="No accounts found." />
                  </TableCell>
                </TableRow>
              ) : (
                users.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${item.email_confirmed_at ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {item.email_confirmed_at ? 'Verified' : 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(item.created_at)}</TableCell>
                    <TableCell>{formatDate(item.updated_at)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
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
