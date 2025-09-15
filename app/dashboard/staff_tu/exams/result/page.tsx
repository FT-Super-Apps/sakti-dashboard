import { ExamsDashboard } from "@/fitur/administrasi/staff-tata-usaha/exams-dashboard"

export default function ResultExamsPage() {
  return (
    <div className="container mx-auto py-6">
      <ExamsDashboard initialFilter="result" />
    </div>
  )
}

