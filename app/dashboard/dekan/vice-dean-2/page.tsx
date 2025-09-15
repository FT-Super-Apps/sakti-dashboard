import { ViceDean2Dashboard } from "@/fitur/dekan/vice-dean-2/dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Wakil Dekan 2",
  description: "Dashboard keuangan dan akademik fakultas",
}

export default function ViceDean2Page() {
  return <ViceDean2Dashboard />
}

