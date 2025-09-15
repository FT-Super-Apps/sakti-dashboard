"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/utilitas/ui/card"
import { Button } from "@/utilitas/ui/button"
import { Input } from "@/utilitas/ui/input"
import { Label } from "@/utilitas/ui/label"
import { Textarea } from "@/utilitas/ui/textarea"
import { DatePicker } from "@/utilitas/ui/date-picker"
import { useToast } from "@/utilitas/ui/use-toast"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/utilitas/ui/tabs"
import { Separator } from "@/utilitas/ui/separator"
import { AlertCircle, Building, FileText, Upload, User, Users } from "lucide-react"
import { submitKkpApplication } from "@/app/actions/kkp-management"
import type { KkpDocumentType } from "@/types/kkp"

export default function KkpApplicationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)), // Default to 3 months from now

    // Student information (in a real app, this would be pre-filled from the user's profile)
    studentName: "Ahmad Fauzi",
    studentNim: "1234567890",
    studentMajor: "Informatika",
    studentSemester: 5,
    studentEmail: "ahmad.fauzi@example.com",
    studentPhone: "081234567890",

    // Group members
    groupMembers: [{ name: "", nim: "", major: "", semester: "", email: "", phone: "" }],

    // Company information
    companyName: "",
    companyAddress: "",
    companyCity: "",
    companyContactPerson: "",
    companyContactPhone: "",
    companyWebsite: "",
    companyIndustry: "",

    // Documents
    documents: [] as { name: string; type: KkpDocumentType; url: string }[],
  })

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle date change
  const handleDateChange = (date: Date | undefined, field: "startDate" | "endDate") => {
    if (date) {
      setFormData((prev) => ({ ...prev, [field]: date }))
    }
  }

  // Handle group member change
  const handleGroupMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.groupMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setFormData((prev) => ({ ...prev, groupMembers: updatedMembers }))
  }

  // Add group member
  const addGroupMember = () => {
    setFormData((prev) => ({
      ...prev,
      groupMembers: [...prev.groupMembers, { name: "", nim: "", major: "", semester: "", email: "", phone: "" }],
    }))
  }

  // Remove group member
  const removeGroupMember = (index: number) => {
    const updatedMembers = [...formData.groupMembers]
    updatedMembers.splice(index, 1)
    setFormData((prev) => ({ ...prev, groupMembers: updatedMembers }))
  }

  // Handle document upload
  const handleDocumentUpload = async (type: KkpDocumentType, file: File) => {
    setIsUploading(true)

    try {
      // In a real app, this would upload the file to a storage service
      // For this demo, we'll just simulate the upload
      const documentUrl = `/documents/${file.name}`

      // Add the document to the form data
      const newDocument = {
        name: file.name,
        type,
        url: documentUrl,
      }

      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, newDocument],
      }))

      toast({
        title: "Document uploaded",
        description: `${file.name} has been uploaded successfully.`,
      })
    } catch (error) {
      console.error("Error uploading document:", error)
      toast({
        title: "Upload failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: KkpDocumentType) => {
    const file = e.target.files?.[0]
    if (file) {
      handleDocumentUpload(type, file)
    }
  }

  // Remove document
  const removeDocument = (index: number) => {
    const updatedDocuments = [...formData.documents]
    updatedDocuments.splice(index, 1)
    setFormData((prev) => ({ ...prev, documents: updatedDocuments }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data
      if (!formData.title || !formData.description || !formData.companyName) {
        toast({
          title: "Validation error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Filter out empty group members
      const validGroupMembers = formData.groupMembers.filter((member) => member.name && member.nim)

      // Prepare application data
      const applicationData = {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        student: {
          id: "std-001", // In a real app, this would be the actual student ID
          name: formData.studentName,
          nim: formData.studentNim,
          major: formData.studentMajor,
          semester: Number.parseInt(formData.studentSemester.toString()),
          email: formData.studentEmail,
          phone: formData.studentPhone,
        },
        groupMembers: validGroupMembers.map((member, index) => ({
          id: `std-${index + 100}`, // In a real app, this would be the actual student ID
          name: member.name,
          nim: member.nim,
          major: member.major,
          semester: Number.parseInt(member.semester.toString()),
          email: member.email,
          phone: member.phone,
        })),
        company: {
          id: "comp-100", // In a real app, this would be the actual company ID
          name: formData.companyName,
          address: formData.companyAddress,
          city: formData.companyCity,
          contactPerson: formData.companyContactPerson,
          contactPhone: formData.companyContactPhone,
          website: formData.companyWebsite,
          industry: formData.companyIndustry,
        },
        documents: formData.documents.map((doc, index) => ({
          id: `doc-${index + 100}`, // In a real app, this would be the actual document ID
          name: doc.name,
          type: doc.type,
          url: doc.url,
          uploadDate: new Date(),
          status: "pending",
        })),
      }

      // Submit application
      const result = await submitKkpApplication(applicationData)

      if (result.success) {
        toast({
          title: "Application submitted",
          description: "Your KKP application has been submitted successfully.",
        })

        // Redirect to the KKP dashboard
        router.push("/dashboard/mahasiswa/kkp")
      } else {
        toast({
          title: "Submission failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast({
        title: "Submission failed",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Navigate to next tab
  const goToNextTab = () => {
    if (activeTab === "personal") {
      setActiveTab("company")
    } else if (activeTab === "company") {
      setActiveTab("documents")
    }
  }

  // Navigate to previous tab
  const goToPreviousTab = () => {
    if (activeTab === "company") {
      setActiveTab("personal")
    } else if (activeTab === "documents") {
      setActiveTab("company")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            KKP Application
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Ajukan aplikasi KKP (Kuliah Kerja Profesi) Anda</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="overflow-hidden gradient-border">
          <CardHeader>
            <CardTitle>Form Pengajuan KKP</CardTitle>
            <CardDescription>Isi detail untuk mengajukan penempatan KKP Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="personal">
                  <User className="h-4 w-4 mr-2" />
                  Informasi Pribadi
                </TabsTrigger>
                <TabsTrigger value="company">
                  <Building className="h-4 w-4 mr-2" />
                  Informasi Perusahaan
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="h-4 w-4 mr-2" />
                  Dokumen
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-6 pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Judul KKP</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Masukkan judul proyek KKP Anda"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Deskripsikan proyek dan tujuan KKP Anda"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Tanggal Mulai</Label>
                      <DatePicker
                        id="startDate"
                        date={formData.startDate}
                        onSelect={(date) => handleDateChange(date, "startDate")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Tanggal Selesai</Label>
                      <DatePicker
                        id="endDate"
                        date={formData.endDate}
                        onSelect={(date) => handleDateChange(date, "endDate")}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Informasi Mahasiswa</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="studentName">Nama Lengkap</Label>
                        <Input
                          id="studentName"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentNim">NIM</Label>
                        <Input
                          id="studentNim"
                          name="studentNim"
                          value={formData.studentNim}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentMajor">Jurusan</Label>
                        <Input
                          id="studentMajor"
                          name="studentMajor"
                          value={formData.studentMajor}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentSemester">Semester</Label>
                        <Input
                          id="studentSemester"
                          name="studentSemester"
                          type="number"
                          value={formData.studentSemester}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentEmail">Email</Label>
                        <Input
                          id="studentEmail"
                          name="studentEmail"
                          type="email"
                          value={formData.studentEmail}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentPhone">Telepon</Label>
                        <Input
                          id="studentPhone"
                          name="studentPhone"
                          value={formData.studentPhone}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Anggota Kelompok (Opsional)</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addGroupMember}>
                        <Users className="h-4 w-4 mr-2" />
                        Tambah Anggota
                      </Button>
                    </div>

                    {formData.groupMembers.map((member, index) => (
                      <div key={index} className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Anggota {index + 1}</h4>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeGroupMember(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            >
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`member-${index}-name`}>Full Name</Label>
                            <Input
                              id={`member-${index}-name`}
                              value={member.name}
                              onChange={(e) => handleGroupMemberChange(index, "name", e.target.value)}
                              placeholder="Full Name"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`member-${index}-nim`}>NIM</Label>
                            <Input
                              id={`member-${index}-nim`}
                              value={member.nim}
                              onChange={(e) => handleGroupMemberChange(index, "nim", e.target.value)}
                              placeholder="NIM"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`member-${index}-major`}>Major</Label>
                            <Input
                              id={`member-${index}-major`}
                              value={member.major}
                              onChange={(e) => handleGroupMemberChange(index, "major", e.target.value)}
                              placeholder="Major"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`member-${index}-semester`}>Semester</Label>
                            <Input
                              id={`member-${index}-semester`}
                              type="number"
                              value={member.semester}
                              onChange={(e) => handleGroupMemberChange(index, "semester", e.target.value)}
                              placeholder="Semester"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`member-${index}-email`}>Email</Label>
                            <Input
                              id={`member-${index}-email`}
                              type="email"
                              value={member.email}
                              onChange={(e) => handleGroupMemberChange(index, "email", e.target.value)}
                              placeholder="Email"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`member-${index}-phone`}>Phone</Label>
                            <Input
                              id={`member-${index}-phone`}
                              value={member.phone}
                              onChange={(e) => handleGroupMemberChange(index, "phone", e.target.value)}
                              placeholder="Phone"
                            />
                          </div>
                        </div>

                        {index < formData.groupMembers.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={goToNextTab}>
                    Selanjutnya: Informasi Perusahaan
                  </Button>
                </div>
              </TabsContent>

              {/* Company Information Tab */}
              <TabsContent value="company" className="space-y-6 pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Nama Perusahaan</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Masukkan nama perusahaan"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyAddress">Alamat</Label>
                    <Textarea
                      id="companyAddress"
                      name="companyAddress"
                      placeholder="Masukkan alamat perusahaan"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyCity">Kota</Label>
                      <Input
                        id="companyCity"
                        name="companyCity"
                        placeholder="Masukkan kota"
                        value={formData.companyCity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyIndustry">Industri</Label>
                      <Input
                        id="companyIndustry"
                        name="companyIndustry"
                        placeholder="Masukkan industri"
                        value={formData.companyIndustry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyContactPerson">Narahubung</Label>
                      <Input
                        id="companyContactPerson"
                        name="companyContactPerson"
                        placeholder="Masukkan nama narahubung"
                        value={formData.companyContactPerson}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyContactPhone">Telepon Narahubung</Label>
                      <Input
                        id="companyContactPhone"
                        name="companyContactPhone"
                        placeholder="Masukkan nomor telepon narahubung"
                        value={formData.companyContactPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="companyWebsite">Website (Opsional)</Label>
                    <Input
                      id="companyWebsite"
                      name="companyWebsite"
                      placeholder="Masukkan website perusahaan"
                      value={formData.companyWebsite}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPreviousTab}>
                    Sebelumnya: Informasi Pribadi
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Selanjutnya: Dokumen
                  </Button>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6 pt-4">
                <div className="space-y-4">
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Persyaratan Dokumen</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>Harap unggah dokumen wajib berikut:</p>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>Surat Lamaran (PDF)</li>
                            <li>Proposal KKP (PDF)</li>
                            <li>Transkrip Akademik (PDF)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="applicationLetter">Surat Lamaran</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="applicationLetter"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "application-letter")}
                          disabled={isUploading || formData.documents.some((doc) => doc.type === "application-letter")}
                        />
                        <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                          <Upload className="h-4 w-4 mr-2" />
                          Unggah
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="proposal">Proposal KKP</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="proposal"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "proposal")}
                          disabled={isUploading || formData.documents.some((doc) => doc.type === "proposal")}
                        />
                        <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                          <Upload className="h-4 w-4 mr-2" />
                          Unggah
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="transcript">Transkrip Akademik</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="transcript"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "transcript")}
                          disabled={isUploading || formData.documents.some((doc) => doc.type === "transcript")}
                        />
                        <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                          <Upload className="h-4 w-4 mr-2" />
                          Unggah
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Dokumen yang Diunggah</h3>
                    {formData.documents.length > 0 ? (
                      <div className="space-y-2">
                        {formData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {doc.type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4 border rounded-md">
                        <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No documents uploaded yet</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPreviousTab}>
                    Sebelumnya: Informasi Perusahaan
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Kirim Pengajuan"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="bg-muted/50 flex flex-col items-start">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Note:</p>
              <p>
                Your application will be reviewed by the Study Program Head. You will be notified once a decision has
                been made.
              </p>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

