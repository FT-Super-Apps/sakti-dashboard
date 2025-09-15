#!/bin/bash
# Script untuk memperbaiki import paths dari komponen yang dipindahkan ke fitur

echo "🔧 Memperbaiki import paths untuk feature-specific components..."

# Update lecturer imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/lecturer/|@/fitur/dosen/lecturer/|g'

# Update GKM imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/gkm/|@/fitur/gkm/|g'

# Update admin_keuangan imports (old name)
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/admin_keuangan/|@/fitur/keuangan/admin-keuangan/|g'

# Update certificate imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/certificates/|@/fitur/sertifikat/certificates/|g'

# Update laboratory imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/laboratory/|@/fitur/laboratorium/laboratory/|g'

# Update akademik imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/academic/|@/fitur/akademik/academic/|g'

# Update dekan imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/dekan/|@/fitur/dekan/|g'

echo "✅ Selesai memperbaiki feature imports!"

# Check remaining
remaining=$(find app/ -name "*.tsx" -o -name "*.ts" | xargs grep -l "from \"@/components/" 2>/dev/null | wc -l)
echo "📄 Files yang masih perlu diperbaiki: $remaining"