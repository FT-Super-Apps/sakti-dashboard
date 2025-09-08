"use client"

import { Loader2 } from "lucide-react"

export default function SubRoleLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-sm text-muted-foreground">Mengubah sub-role...</div>
      </div>
    </div>
  )
}