import type { NonRegularStudent } from "./non-regular-student"

export type PaymentMethod = "bank_transfer" | "credit_card" | "debit_card" | "cash" | "e_wallet" | "scholarship"

export type PaymentCategory = "tuition" | "registration" | "exam" | "laboratory" | "graduation" | "other"

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded" | "partial"

export interface NonRegularPayment {
  id: string
  student_id: string
  student?: NonRegularStudent
  invoiceNumber: string
  amount: number
  category: PaymentCategory
  description: string
  dueDate: string
  paymentDate?: string
  paymentMethod?: PaymentMethod
  status: PaymentStatus
  semester: number
  academic_year: string
  transactionId?: string
  receiptUrl?: string
  notes?: string
  created_at: string
  updated_at: string
  createdBy: string
}

export interface PaymentSummary {
  totalDue: number
  totalPaid: number
  totalOverdue: number
  totalPending: number
  paymentRate: number
}

