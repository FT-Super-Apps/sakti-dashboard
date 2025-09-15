"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/utilitas/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/utilitas/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/utilitas/ui/table"
import { Button } from "@/utilitas/ui/button"
import { Input } from "@/utilitas/ui/input"
import { Badge } from "@/utilitas/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/utilitas/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/utilitas/ui/select"
import { Textarea } from "@/utilitas/ui/textarea"
import {
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  FileText,
  Building,
  Calendar,
  AlertCircle,
  MapPin,
  Briefcase,
} from "lucide-react"

// Application interface
interface Application {
  id: string
  companyName: string
  industry: string
  city: string
  submissionDate?: string
  status: "pending" | "approved" | "rejected" | "draft"
  rejectionReason?: string
  details: {
    address: string
    positions: string[]
    contactName: string
    contactPosition: string
    contactEmail: string
    contactPhone: string
    description: string
  }
}

export default function ApplicationPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "APP-2023-001",
      companyName: "PT Inovasi Teknologi",
      industry: "Information Technology",
      city: "Surabaya",
      submissionDate: "September 10, 2023",
      status: "pending",
      details: {
        address: "Jl. Teknologi No. 123, Surabaya",
        positions: ["Software Developer", "UI/UX Designer"],
        contactName: "Budi Santoso",
        contactPosition: "HR Manager",
        contactEmail: "budi@inovasitech.com",
        contactPhone: "081234567890",
        description:
          "PT Inovasi Teknologi adalah perusahaan teknologi yang berfokus pada pengembangan aplikasi mobile dan web.",
      },
    },
    {
      id: "APP-2023-002",
      companyName: "CV Desain Kreatif",
      industry: "Media & Communication",
      city: "Yogyakarta",
      submissionDate: "August 5, 2023",
      status: "approved",
      details: {
        address: "Jl. Malioboro No. 45, Yogyakarta",
        positions: ["Graphic Designer", "Content Creator"],
        contactName: "Siti Rahayu",
        contactPosition: "Creative Director",
        contactEmail: "siti@desainkreatif.com",
        contactPhone: "085678901234",
        description:
          "CV Desain Kreatif adalah studio desain yang mengerjakan proyek branding, desain grafis, dan konten digital.",
      },
    },
    {
      id: "APP-2023-003",
      companyName: "PT Logistik Cepat",
      industry: "Logistics & Transportation",
      city: "Jakarta",
      submissionDate: "July 20, 2023",
      status: "rejected",
      rejectionReason: "Posisi yang diajukan sudah terisi penuh.",
      details: {
        address: "Jl. Gatot Subroto No. 78, Jakarta Selatan",
        positions: ["Supply Chain Analyst", "Logistics Coordinator"],
        contactName: "Hendra Wijaya",
        contactPosition: "Operations Manager",
        contactEmail: "hendra@logistikcepat.com",
        contactPhone: "087890123456",
        description:
          "PT Logistik Cepat adalah perusahaan logistik yang menyediakan layanan pengiriman barang dan manajemen rantai pasok.",
      },
    },
    {
      id: "APP-2023-004",
      companyName: "Koperasi Sejahtera",
      industry: "Finance",
      city: "Bandung",
      status: "draft",
      details: {
        address: "Jl. Asia Afrika No. 56, Bandung",
        positions: ["Financial Analyst", "Accounting Assistant"],
        contactName: "Dewi Anggraini",
        contactPosition: "Finance Manager",
        contactEmail: "dewi@koperasisejahtera.com",
        contactPhone: "089012345678",
        description:
          "Koperasi Sejahtera adalah lembaga keuangan mikro yang menyediakan layanan simpan pinjam dan pendampingan usaha kecil.",
      },
    },
  ])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showNewApplicationDialog, setShowNewApplicationDialog] = useState(false)
  const [newApplication, setNewApplication] = useState<Partial<Application>>({
    companyName: "",
    industry: "",
    city: "",
    status: "draft",
    details: {
      address: "",
      positions: [],
      contactName: "",
      contactPosition: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
  })

  // Filter applications based on active tab
  const filteredApplications = applications.filter((app) => {
    if (activeTab === "all") return true
    return app.status === activeTab
  })

  // Handle creating a new application
  const handleCreateApplication = () => {
    const id = `APP-2023-${String(applications.length + 1).padStart(3, "0")}`
    const newApp: Application = {
      id,
      companyName: newApplication.companyName || "",
      industry: newApplication.industry || "",
      city: newApplication.city || "",
      status: "draft",
      details: {
        address: newApplication.details?.address || "",
        positions: newApplication.details?.positions || [],
        contactName: newApplication.details?.contactName || "",
        contactPosition: newApplication.details?.contactPosition || "",
        contactEmail: newApplication.details?.contactEmail || "",
        contactPhone: newApplication.details?.contactPhone || "",
        description: newApplication.details?.description || "",
      },
    }

    setApplications([...applications, newApp])
    setNewApplication({
      companyName: "",
      industry: "",
      city: "",
      status: "draft",
      details: {
        address: "",
        positions: [],
        contactName: "",
        contactPosition: "",
        contactEmail: "",
        contactPhone: "",
        description: "",
      },
    })
    setShowNewApplicationDialog(false)
  }

  // Handle submitting a draft application
  const handleSubmitApplication = (id: string) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "pending",
              submissionDate: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            }
          : app,
      ),
    )
  }

  // Handle deleting an application
  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id))
    if (selectedApplication?.id === id) {
      setSelectedApplication(null)
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu Peninjauan
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Draf
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Pengajuan Magang
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola pengajuan lokasi magang Anda</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            <TabsTrigger value="draft">Draf</TabsTrigger>
          </TabsList>
          <Dialog open={showNewApplicationDialog} onOpenChange={setShowNewApplicationDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Pengajuan Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajukan Pengajuan Lokasi Baru</DialogTitle>
              <DialogDescription>
                Isi formulir di bawah ini untuk mengajukan lokasi magang baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="company-name" className="text-sm font-medium">
                    Nama Perusahaan/Institusi
                  </label>
                  <Input
                    id="company-name"
                    value={newApplication.companyName}
                    onChange={(e) => setNewApplication({ ...newApplication, companyName: e.target.value })}
                    placeholder="PT Example Indonesia"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium">
                    Industri
                  </label>
                  <Select
                    value={newApplication.industry}
                    onValueChange={(value) => setNewApplication({ ...newApplication, industry: value })}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Pilih industri" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Banking & Finance">Banking & Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Media & Communication">Media & Communication</SelectItem>
                      <SelectItem value="Logistics & Transportation">Logistics & Transportation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Alamat Lengkap
                </label>
                <Input
                  id="address"
                  value={newApplication.details?.address}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      details: { ...newApplication.details, address: e.target.value },
                    })
                  }
                  placeholder="Jl. Example No. 123, Jakarta"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    Kota
                  </label>
                  <Input
                    id="city"
                    value={newApplication.city}
                    onChange={(e) => setNewApplication({ ...newApplication, city: e.target.value })}
                    placeholder="Jakarta"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="positions" className="text-sm font-medium">
                    Posisi Magang (dipisahkan koma)
                  </label>
                  <Input
                    id="positions"
                    value={newApplication.details?.positions?.join(", ")}
                    onChange={(e) =>
                      setNewApplication({
                        ...newApplication,
                        details: {
                          ...newApplication.details,
                          positions: e.target.value
                            .split(",")
                            .map((p) => p.trim())
                            .filter((p) => p),
                        },
                      })
                    }
                    placeholder="Software Developer, UI/UX Designer"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Deskripsi Perusahaan
                </label>
                <Textarea
                  id="description"
                  value={newApplication.details?.description}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      details: { ...newApplication.details, description: e.target.value },
                    })
                  }
                  placeholder="Brief description about the company/institution"
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Nama Narahubung
                  </label>
                  <Input
                    id="contact-name"
                    value={newApplication.details?.contactName}
                    onChange={(e) =>
                      setNewApplication({
                        ...newApplication,
                        details: { ...newApplication.details, contactName: e.target.value },
                      })
                    }
                    placeholder="Full name of contact person"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-position" className="text-sm font-medium">
                    Jabatan
                  </label>
                  <Input
                    id="contact-position"
                    value={newApplication.details?.contactPosition}
                    onChange={(e) =>
                      setNewApplication({
                        ...newApplication,
                        details: { ...newApplication.details, contactPosition: e.target.value },
                      })
                    }
                    placeholder="HR Manager"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={newApplication.details?.contactEmail}
                    onChange={(e) =>
                      setNewApplication({
                        ...newApplication,
                        details: { ...newApplication.details, contactEmail: e.target.value },
                      })
                    }
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-sm font-medium">
                    Nomor Telepon
                  </label>
                  <Input
                    id="contact-phone"
                    value={newApplication.details?.contactPhone}
                    onChange={(e) =>
                      setNewApplication({
                        ...newApplication,
                        details: { ...newApplication.details, contactPhone: e.target.value },
                      })
                    }
                    placeholder="021-1234567"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewApplicationDialog(false)}>
                Batal
              </Button>
              <Button variant="outline" onClick={handleCreateApplication}>
                Simpan sebagai Draf
              </Button>
              <Button type="submit" onClick={handleCreateApplication}>
                Kirim Pengajuan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>

      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Daftar Pengajuan</CardTitle>
          <CardDescription>Lacak status pengajuan lokasi magang Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <TabsContent value={activeTab} className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Nama Perusahaan</TableHead>
                    <TableHead>Industri</TableHead>
                    <TableHead>Kota</TableHead>
                    <TableHead>Tanggal Pengajuan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Tidak ada pengajuan ditemukan</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => setShowNewApplicationDialog(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Buat Pengajuan Baru
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.companyName}</TableCell>
                        <TableCell>{application.industry}</TableCell>
                        <TableCell>{application.city}</TableCell>
                        <TableCell>{application.submissionDate || "-"}</TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedApplication(application)}>
                              <Eye className="h-4 w-4 mr-1" />
                              {application.status === "draft" ? "Edit" : "Detail"}
                            </Button>
                            {application.status === "draft" && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleSubmitApplication(application.id)}
                              >
                                Kirim
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && setSelectedApplication(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                {selectedApplication.companyName}
              </DialogTitle>
              <DialogDescription>
                {selectedApplication.industry} • {selectedApplication.city}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">ID Pengajuan:</span>
                  <span className="text-sm">{selectedApplication.id}</span>
                </div>
                {getStatusBadge(selectedApplication.status)}
              </div>

              {selectedApplication.submissionDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Tanggal Pengajuan:</span>
                  <span className="text-sm">{selectedApplication.submissionDate}</span>
                </div>
              )}

              {selectedApplication.rejectionReason && (
                <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm">
                  <div className="font-medium mb-1">Alasan Penolakan:</div>
                  {selectedApplication.rejectionReason}
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Detail Perusahaan</h4>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{selectedApplication.details.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Posisi yang Tersedia:</div>
                      <ul className="list-disc list-inside">
                        {selectedApplication.details.positions.map((position, index) => (
                          <li key={index}>{position}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Deskripsi:</div>
                      <p>{selectedApplication.details.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Informasi Kontak</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm">
                    <div className="font-medium">Nama:</div>
                    <p>{selectedApplication.details.contactName}</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Jabatan:</div>
                    <p>{selectedApplication.details.contactPosition}</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Email:</div>
                    <p>{selectedApplication.details.contactEmail}</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Telepon:</div>
                    <p>{selectedApplication.details.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              {selectedApplication.status === "draft" ? (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDeleteApplication(selectedApplication.id)
                      setSelectedApplication(null)
                    }}
                  >
                    Hapus Draf
                  </Button>
                  <Button
                    onClick={() => {
                      handleSubmitApplication(selectedApplication.id)
                      setSelectedApplication(null)
                    }}
                  >
                    Kirim Pengajuan
                  </Button>
                </>
              ) : (
                <Button onClick={() => setSelectedApplication(null)}>Tutup</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      </Tabs>
    </div>
  )
}

