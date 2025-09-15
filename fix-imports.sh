#!/bin/bash
# Script untuk memperbaiki import paths dari struktur lama ke baru

echo "🔧 Memperbaiki import paths untuk UI components..."

# Update UI imports dari @/components/ui ke @/utilitas/ui
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/ui/|@/utilitas/ui/|g'

echo "🔧 Memperbaiki import paths untuk layout components..."

# Update layout imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/layout/|@/tata-letak/layout/|g'
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/role/|@/tata-letak/role/|g'

echo "🔧 Memperbaiki import paths untuk common components..."

# Update common imports
find app/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/common|@/penyedia/common|g'

echo "✅ Selesai memperbaiki import paths!"
echo "📊 Checking remaining old paths..."

# Check remaining old paths
remaining=$(find app/ -name "*.tsx" -o -name "*.ts" | xargs grep -l "from \"@/components/" 2>/dev/null | wc -l)
echo "📄 Files yang masih perlu diperbaiki: $remaining"