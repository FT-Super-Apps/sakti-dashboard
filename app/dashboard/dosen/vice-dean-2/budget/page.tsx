import { BudgetManagement } from "@/fitur/dekan/vice-dean-2/budget-management"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manajemen Anggaran",
  description: "Manajemen anggaran fakultas",
}

export default function DosenBudgetManagementPage() {
  return <BudgetManagement />
}