"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/utilitas/ui/button"
import { Input } from "@/utilitas/ui/input"
import { Textarea } from "@/utilitas/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/utilitas/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/utilitas/ui/form"
import { Separator } from "@/utilitas/ui/separator"
import { Calendar } from "@/utilitas/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/utilitas/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/utilitas/ui/dialog"
import { CalendarIcon, FileText, Upload, AlertCircle, CheckCircle, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { LETTER_TYPES, submitLetterRequest } from "@/app/actions/correspondence-actions"
import { Alert, AlertDescription, AlertTitle } from "@/utilitas/ui/alert"

// Create a schema for the form
const formSchema = z.object({
  letterType: z.string().min(1, { message: "Pilih jenis surat" }),
  purpose: z.string().min(5, { message: "Tujuan harus diisi minimal 5 karakter" }),
  additionalInfo: z.record(z.any()),
})

interface NewCorrespondenceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewCorrespondenceDialog({ open, onOpenChange }: NewCorrespondenceDialogProps) {
  const [selectedLetterType, setSelectedLetterType] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letterType: "",
      purpose: "",
      additionalInfo: {},
    },
  })

  // Handle letter type change
  const handleLetterTypeChange = (value: string) => {
    setSelectedLetterType(value)
    form.setValue("letterType", value)
    form.setValue("additionalInfo", {})
  }

  // Get the selected letter type info
  const selectedTypeInfo = selectedLetterType ? LETTER_TYPES[selectedLetterType] : null

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      // In a real app, we would create a FormData object and append all the form data
      const formData = new FormData()
      formData.append("letterType", data.letterType)
      formData.append("purpose", data.purpose)

      // Add additional info fields
      if (data.additionalInfo) {
        Object.entries(data.additionalInfo).forEach(([key, value]) => {
          if (value instanceof Date) {
            formData.append(`additionalInfo[${key}]`, value.toISOString())
          } else {
            formData.append(`additionalInfo[${key}]`, value?.toString() || "")
          }
        })
      }

      // Submit the form
      const result = await submitLetterRequest(formData)

      setSubmitResult({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        // Reset the form on success
        setTimeout(() => {
          form.reset()
          setSelectedLetterType("")
          onOpenChange(false)
        }, 1500)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitResult({
        success: false,
        message: "Terjadi kesalahan saat mengirim permohonan. Silakan coba lagi.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDialogClose = (open: boolean) => {
    if (!open && !isSubmitting) {
      // Reset form when dialog is closed
      setTimeout(() => {
        form.reset()
        setSelectedLetterType("")
        setSubmitResult(null)
      }, 300)
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            Permohonan Surat Baru
          </DialogTitle>
          <DialogDescription>Isi formulir berikut untuk mengajukan permohonan surat</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {submitResult && (
              <Alert variant={submitResult.success ? "default" : "destructive"}>
                {submitResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{submitResult.success ? "Berhasil" : "Gagal"}</AlertTitle>
                <AlertDescription>{submitResult.message}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="letterType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Surat</FormLabel>
                  <Select onValueChange={(value) => handleLetterTypeChange(value)} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis surat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(LETTER_TYPES).map(([key, info]) => (
                        <SelectItem key={key} value={key}>
                          {info.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {selectedTypeInfo?.description || "Pilih jenis surat yang ingin diajukan"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedTypeInfo && (
              <>
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tujuan Permohonan</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Jelaskan tujuan permohonan surat ini" {...field} />
                      </FormControl>
                      <FormDescription>Jelaskan secara singkat tujuan permohonan surat ini</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedTypeInfo.additionalFields && selectedTypeInfo.additionalFields.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Informasi Tambahan</h3>

                      {selectedTypeInfo.additionalFields.map((field) => (
                        <FormField
                          key={field.name}
                          control={form.control}
                          name={`additionalInfo.${field.name}` as any}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel>{field.label}</FormLabel>
                              <FormControl>
                                {field.type === "text" && <Input placeholder={field.label} {...formField} />}
                                {field.type === "textarea" && <Textarea placeholder={field.label} {...formField} />}
                                {field.type === "select" && (
                                  <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder={`Pilih ${field.label}`} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {field.options?.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                                {field.type === "date" && (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !formField.value && "text-muted-foreground",
                                          )}
                                        >
                                          {formField.value ? (
                                            format(new Date(formField.value), "PPP", { locale: id })
                                          ) : (
                                            <span>Pilih tanggal</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={formField.value ? new Date(formField.value) : undefined}
                                        onSelect={formField.onChange}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}

                {selectedTypeInfo.requiredDocuments && selectedTypeInfo.requiredDocuments.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Dokumen yang Diperlukan</h3>
                      <div className="space-y-2">
                        {selectedTypeInfo.requiredDocuments.map((doc, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm">{doc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <FormLabel>Unggah Dokumen</FormLabel>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-primary/20 bg-primary/5 px-6 py-10 transition-colors hover:bg-primary/10">
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-primary/30" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                              >
                                <span>Unggah file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                              </label>
                              <p className="pl-1">atau drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="rounded-md bg-muted p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-foreground">Informasi Pemrosesan</h3>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>
                          Permohonan surat ini akan diproses oleh{" "}
                          {selectedTypeInfo.approvalRole === "prodi"
                            ? "Kepala Program Studi"
                            : selectedTypeInfo.approvalRole === "staff_tu"
                              ? "Staff Tata Usaha"
                              : selectedTypeInfo.approvalRole === "dekan"
                                ? "Dekan"
                                : "Admin"}
                          .
                        </p>
                        <p className="mt-1">Estimasi waktu pemrosesan: {selectedTypeInfo.estimatedDays} hari kerja.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting || !selectedLetterType}>
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajukan Permohonan
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

