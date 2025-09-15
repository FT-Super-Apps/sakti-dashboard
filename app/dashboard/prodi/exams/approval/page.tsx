import type { Metadata } from "next"
import { ProdiExamApprovalDashboard } from "@/fitur/ujian/prodi/prodi-exam-approval-dashboard"

export const metadata: Metadata = {
  title: "Persetujuan Ujian",
  description: "Halaman persetujuan ujian untuk manajemen akademik",
}

export default function ProdiExamApprovalPage() {
  return <ProdiExamApprovalDashboard />
}

