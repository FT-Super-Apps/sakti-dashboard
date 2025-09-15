#!/bin/bash
# Script untuk memperbaiki import paths yang tersisa

echo "🔧 Memperbaiki import paths yang tersisa..."

# Update kepala-tata-usaha imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/kepala-tata-usaha/|@/fitur/administrasi/kepala-tata-usaha/|g'

# Update correspondence imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/correspondence/|@/fitur/korespondensi/|g'

# Update admin-umum imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/admin-umum/|@/fitur/administrasi/admin-umum/|g'

# Update staff_tu imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/staff_tu/|@/fitur/administrasi/staff-tata-usaha/|g'

# Update aik-komfren imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/aik-komfren/|@/fitur/aik-komfren/|g'

# Update internship imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/internship/|@/fitur/magang/|g'

# Update kkp imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/kkp/|@/fitur/kkp/|g'

# Update exam imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/exam/|@/fitur/ujian/|g'

echo "✅ Selesai memperbaiki remaining imports!"

# Check remaining
remaining=$(find app/ -name "*.tsx" -o -name "*.ts" | xargs grep -l "from \"@/components/" 2>/dev/null | wc -l)
echo "📄 Files yang masih perlu diperbaiki: $remaining"