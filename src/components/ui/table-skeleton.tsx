import { TableRow, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function TableSkeleton({
  columns,
  rows = 5,
}: {
  columns: number
  rows?: number
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="hover:bg-transparent">
          {Array.from({ length: columns }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full opacity-70" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
