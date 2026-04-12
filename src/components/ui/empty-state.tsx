import * as React from "react"
import { cn } from "@/lib/utils"
import { FileQuestion } from "lucide-react"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType
  title?: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  className,
  icon: Icon = FileQuestion,
  title = "Data tidak tersedia",
  description = "Tidak ada data yang dapat ditampilkan saat ini.",
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[250px] w-full flex-col items-center justify-center p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4 shadow-sm">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
