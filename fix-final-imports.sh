#!/bin/bash
# Final script untuk memperbaiki import paths yang tersisa

echo "🔧 Memperbaiki import paths final..."

# Update transactions-manager import
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/transactions-manager|@/fitur/keuangan/transactions-manager|g'

# Update shared imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/shared/|@/penyedia/shared/|g'

# Update dosen imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/dosen/|@/fitur/dosen/|g'

# Update student-payment-view import
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/student-payment-view|@/fitur/keuangan/student-payment-view|g'

echo "✅ Selesai memperbaiki final imports!"

# Final check
remaining=$(find app/ -name "*.tsx" -o -name "*.ts" | xargs grep -l "from \"@/components/" 2>/dev/null | wc -l)
echo "📄 Files yang masih perlu diperbaiki: $remaining"

if [ $remaining -gt 0 ]; then
    echo "🔍 Files yang masih memiliki old paths:"
    find app/ -name "*.tsx" -o -name "*.ts" | xargs grep -l "from \"@/components/" 2>/dev/null | head -5
fi