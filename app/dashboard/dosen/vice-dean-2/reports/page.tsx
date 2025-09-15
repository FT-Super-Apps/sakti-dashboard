import { FinancialReporting } from "@/fitur/dekan/vice-dean-2/financial-reporting"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Laporan Keuangan",
  description: "Laporan keuangan fakultas",
}

export default function DosenFinancialReportingPage() {
  return <FinancialReporting />
}