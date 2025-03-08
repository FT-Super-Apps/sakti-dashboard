import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Users,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  Mail,
  GraduationCapIcon,
  Calendar,
  BookOpen,
  ArrowRight,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function StaffTuDashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Staff TU Dashboard
          </span>
        </h2>
        <p className="text-muted-foreground">
          Selamat datang di dashboard Staff TU. Kelola tugas akademik dan administratif.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
        {/* KKP Applications - Large Card */}
        <Card className="md:col-span-2 lg:col-span-2 overflow-hidden hover:shadow-md transition-all duration-200 border-primary/10 hover:border-primary/30">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">KKP Applications</CardTitle>
              <Link href="/dashboard/staff_tu/kkp">
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  <span>Lihat Semua</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Kelola aplikasi KKP mahasiswa</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Pending</p>
                    <p className="text-sm text-muted-foreground">3 applications</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Approved</p>
                    <p className="text-sm text-muted-foreground">8 applications</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">In Review</p>
                    <p className="text-sm text-muted-foreground">2 applications</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Rejected</p>
                    <p className="text-sm text-muted-foreground">1 application</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Correspondence - Medium Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-primary/10 hover:border-primary/30">
          <CardHeader className="bg-gradient-to-r from-secondary/5 to-accent/5 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Layanan Surat</CardTitle>
              <Link href="/dashboard/staff_tu/correspondence">
                <Button variant="ghost" size="icon" className="text-secondary">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Permintaan baru</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted p-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-medium">Perlu ditinjau hari ini</span>
              </div>
              <span className="text-xs font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">3</span>
            </div>
          </CardContent>
        </Card>

        {/* Exam Management - Medium Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-primary/10 hover:border-primary/30">
          <CardHeader className="bg-gradient-to-r from-accent/5 to-mint/5 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Ujian</CardTitle>
              <Link href="/dashboard/staff_tu/exams">
                <Button variant="ghost" size="icon" className="text-accent">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <GraduationCapIcon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">10</p>
                <p className="text-sm text-muted-foreground">Ujian mendatang</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted p-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium">Jadwal minggu ini</span>
              </div>
              <span className="text-xs font-bold bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">4</span>
            </div>
          </CardContent>
        </Card>

        {/* Student Records - Medium Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-primary/10 hover:border-primary/30">
          <CardHeader className="bg-gradient-to-r from-mint/5 to-primary/5 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Data Mahasiswa</CardTitle>
              <Link href="/dashboard/staff_tu/student-records">
                <Button variant="ghost" size="icon" className="text-mint">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-mint/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-mint" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,245</p>
                <p className="text-sm text-muted-foreground">Total mahasiswa</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted p-2">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium">Pendaftaran baru</span>
              </div>
              <span className="text-xs font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">28</span>
            </div>
          </CardContent>
        </Card>

        {/* Academic Schedule - Large Card */}
        <Card className="md:col-span-2 overflow-hidden hover:shadow-md transition-all duration-200 border-primary/10 hover:border-primary/30">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Jadwal Akademik</CardTitle>
              <Link href="/dashboard/staff_tu/schedule-management">
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  <span>Kelola</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Jadwal dan acara akademik mendatang</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Ujian Tengah Semester</p>
                  <p className="text-sm text-muted-foreground">10 - 15 Oktober 2023</p>
                  <div className="mt-1">
                    <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">Segera</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Pendaftaran KKP</p>
                  <p className="text-sm text-muted-foreground">1 - 30 November 2023</p>
                  <div className="mt-1">
                    <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Mendatang</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Directory - Medium Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-primary/10 hover:border-primary/30">
          <CardHeader className="bg-gradient-to-r from-secondary/5 to-accent/5 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Direktori Perusahaan</CardTitle>
              <Button variant="ghost" size="icon" className="text-secondary">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Building className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Mitra KKP aktif</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted p-2">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium">Mitra baru bulan ini</span>
              </div>
              <span className="text-xs font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">3</span>
            </div>
          </CardContent>
        </Card>

        {/* Document Management - Medium Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-primary/10 hover:border-primary/30">
          <CardHeader className="bg-gradient-to-r from-accent/5 to-mint/5 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Manajemen Dokumen</CardTitle>
              <Button variant="ghost" size="icon" className="text-accent">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">87</p>
                <p className="text-sm text-muted-foreground">Dokumen diproses</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted p-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium">Selesai minggu ini</span>
              </div>
              <span className="text-xs font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">32</span>
            </div>
          </CardContent>
        </Card>

        {/* Analytics - Large Card */}
        <Card className="md:col-span-3 lg:col-span-4 overflow-hidden hover:shadow-md transition-all duration-200 border-primary/10 hover:border-primary/30">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
              <Tabs defaultValue="recent" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recent">Aktivitas Terbaru</TabsTrigger>
                  <TabsTrigger value="tasks">Tugas Mendesak</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <Tabs defaultValue="recent" className="w-full">
              <TabsContent value="recent" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">KKP Application Approved</p>
                      <p className="text-xs text-muted-foreground">
                        You approved Andi Wijaya's KKP application for Tokopedia
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New KKP Application</p>
                      <p className="text-xs text-muted-foreground">
                        Dian Sastro submitted a new KKP application for Perpustakaan Nasional
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Application Set to Review</p>
                      <p className="text-xs text-muted-foreground">
                        You set Rini Susanti's KKP application to review status
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tasks" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="grid gap-1 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Review KKP Applications</p>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Review
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">3 applications pending review</p>
                      <div className="mt-1">
                        <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Urgent</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="grid gap-1 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Verify Documents</p>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Verify
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">5 documents need verification</p>
                      <div className="mt-1">
                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                          High Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="grid gap-1 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Schedule Exams</p>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Schedule
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Finalize exam schedule for next month</p>
                      <div className="mt-1">
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">This Week</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

