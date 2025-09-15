"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/utilitas/ui/table"
import { Button } from "@/utilitas/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { ExamSchedule } from "@/types/exam-schedule"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/utilitas/ui/alert-dialog"
import { useState } from "react"

interface ExamScheduleTableProps {
  schedules: ExamSchedule[]
  onEdit: (schedule: ExamSchedule) => void
  onDelete: (id: string) => void
}

export function ExamScheduleTable({ schedules, onEdit, onDelete }: ExamScheduleTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  const formatTimeRange = (start: string, end: string) => {
    return `${start} - ${end}`
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul Skripsi</TableHead>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Belum ada jadwal ujian.
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.courseName}</TableCell>
                  <TableCell>{schedule.studentName || "-"} {schedule.studentNIM ? `(${schedule.studentNIM})` : ""}</TableCell>
                  <TableCell>{format(new Date(schedule.date), "dd MMM yyyy")}</TableCell>
                  <TableCell>{formatTimeRange(schedule.startTime, schedule.endTime)}</TableCell>
                  <TableCell>
                    {schedule.classroom.name}, {schedule.classroom.building}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(schedule)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(schedule.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
            <AlertDialogDescription>
              Jadwal ujian ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

