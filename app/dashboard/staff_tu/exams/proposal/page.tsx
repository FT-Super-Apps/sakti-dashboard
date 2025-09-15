import { ExamsDashboard } from "@/fitur/administrasi/staff-tata-usaha/exams-dashboard"

export default function ProposalExamsPage() {
  return (
    <div className="container mx-auto py-6">
      <ExamsDashboard initialFilter="proposal" />
    </div>
  )
}

