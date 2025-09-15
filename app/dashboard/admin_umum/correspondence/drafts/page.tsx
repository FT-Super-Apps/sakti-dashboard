import { Suspense } from "react"
import { CorrespondenceDraftsManagement } from "@/fitur/administrasi/admin-umum/correspondence-drafts-management"
import { CorrespondenceDraftsPageSkeleton } from "@/fitur/administrasi/admin-umum/correspondence-drafts-page-skeleton"

export default function CorrespondenceDraftsPage() {
  return (
    <Suspense fallback={<CorrespondenceDraftsPageSkeleton />}>
      <CorrespondenceDraftsManagement />
    </Suspense>
  )
}

