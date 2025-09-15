#!/bin/bash
# Script untuk memperbaiki import paths di dalam komponen yang sudah dipindahkan

echo "🔧 Memperbaiki internal import paths di dalam components yang dipindahkan..."

# Update UI imports di dalam components/
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/ui/|@/utilitas/ui/|g'

# Update layout imports di dalam components/
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/layout/|@/tata-letak/layout/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/role/|@/tata-letak/role/|g'

# Update common imports di dalam components/
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/common|@/penyedia/common|g'

# Update feature-specific imports di dalam components/
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/lecturer/|@/fitur/dosen/lecturer/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/gkm/|@/fitur/gkm/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/admin_keuangan/|@/fitur/keuangan/admin-keuangan/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/kepala-tata-usaha/|@/fitur/administrasi/kepala-tata-usaha/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/correspondence/|@/fitur/korespondensi/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/admin-umum/|@/fitur/administrasi/admin-umum/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/staff_tu/|@/fitur/administrasi/staff-tata-usaha/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/certificates/|@/fitur/sertifikat/certificates/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/laboratory/|@/fitur/laboratorium/laboratory/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/academic/|@/fitur/akademik/academic/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/dekan/|@/fitur/dekan/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/aik-komfren/|@/fitur/aik-komfren/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/internship/|@/fitur/magang/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/kkp/|@/fitur/kkp/|g'
find components/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/exam/|@/fitur/ujian/|g'

echo "✅ Selesai memperbaiki internal imports!"

# Check remaining in components/
remaining_components=$(find components/ -name "*.tsx" -o -name "*.ts" | xargs grep -l "from \"@/components/" 2>/dev/null | wc -l)
echo "📄 Components files yang masih perlu diperbaiki: $remaining_components"