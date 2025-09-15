import { ExamsDashboard } from "@/fitur/administrasi/staff-tata-usaha/exams-dashboard"

export default function ClosedExamsPage() {
  return (
    <div className="container mx-auto py-6">
      <ExamsDashboard initialTab="completed" />
    </div>
  )
}

