import { ExamsDashboard } from "@/fitur/administrasi/staff-tata-usaha/exams-dashboard"

export default function FinalExamsPage() {
  return (
    <div className="container py-6 mx-auto">
      <ExamsDashboard initialFilter="final" />
    </div>
  )
}

