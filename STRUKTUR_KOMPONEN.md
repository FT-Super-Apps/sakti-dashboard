# 📁 Panduan Struktur Komponen SAKTI Dashboard

## 🎯 **Struktur Direktori Modern (Feature-Based)**

```
components/
├── fitur/                    # Feature-specific components (15 fitur)
│   ├── administrasi/         # Admin & staff components
│   │   ├── admin-umum/       # General administration
│   │   ├── kepala-tata-usaha/# Head of administration
│   │   └── staff-tata-usaha/ # Administrative staff
│   ├── akademik/             # Academic components
│   ├── aik-komfren/          # Islamic Studies Exam
│   ├── dashboard/            # Dashboard components
│   │   ├── role-specific/    # Role-based dashboards
│   │   └── umum/             # General dashboard components
│   ├── dekan/                # Dean-related components
│   ├── dosen/                # Lecturer components
│   │   └── lecturer/         # Lecturer-specific features
│   ├── gkm/                  # Quality Control Group
│   ├── halaman-utama/        # Landing page components
│   │   └── landing-page/     # Main page features
│   ├── keuangan/             # Finance components
│   │   ├── admin-keuangan/   # Finance administration
│   │   └── payment/          # Payment processing
│   ├── kkp/                  # Final Project components
│   ├── korespondensi/        # Correspondence components
│   ├── laboratorium/         # Laboratory management
│   ├── magang/               # Internship components
│   ├── mahasiswa/            # Student components
│   ├── perpustakaan/         # Library components
│   │   ├── library/          # Library management
│   │   └── reading-room/     # Reading room features
│   ├── sertifikat/           # Certificate components
│   └── ujian/                # Exam components
├── tata-letak/               # Layout & navigation
│   ├── layout/               # Page layouts & headers
│   ├── role/                 # Role-based navigation
│   ├── language-switcher.tsx # Language switching
│   └── notification-dropdown.tsx # Notifications
├── penyedia/                 # Providers & shared components
│   ├── common/               # Common shared components
│   ├── providers/            # React context providers
│   └── shared/               # Shared utilities
└── utilitas/                 # Utilities & UI library
    └── ui/                   # UI components
```

## 🔗 **Path Aliases**

```typescript
// tsconfig.json paths
{
  "@/fitur/*": ["./components/fitur/*"],
  "@/tata-letak/*": ["./components/tata-letak/*"],
  "@/penyedia/*": ["./components/penyedia/*"],
  "@/utilitas/*": ["./components/utilitas/*"],
  "@/types/*": ["./types/*"]
}
```

## 📦 **Import Examples**

```typescript
// UI Components
import { Button } from "@/utilitas/ui/button"
import { Card } from "@/utilitas/ui/card"

// Layout Components
import Header from "@/tata-letak/layout/header"
import RoleSidebar from "@/tata-letak/role/role-sidebar"

// Providers
import { SessionProvider } from "@/penyedia/common"

// Feature Components
import { FinanceAdminDashboard } from "@/fitur/keuangan/finance-admin-dashboard"
import { CertificateGenerator } from "@/fitur/sertifikat/certificate-generator"

// Types (Centralized)
import type { Role, User, Payment } from "@/types"
```

## 🏗️ **Konvensi Penamaan**

### Direktori
- **Bahasa Indonesia** dengan **hyphen-case**
- Contoh: `admin-keuangan`, `kepala-tata-usaha`, `staff-tata-usaha`

### Components
- **PascalCase** untuk nama komponen
- **camelCase** untuk props dan variabel
- Contoh: `FinanceAdminDashboard`, `CertificateGenerator`

### Types
- **PascalCase** untuk interface/type
- Centralized di `/types/` directory
- Contoh: `Role`, `User`, `PaymentData`

## 🎨 **Manfaat Struktur Baru**

### ✅ **Feature-Based Organization**
- Setiap fitur memiliki direktori terpisah
- Komponen terkait dikelompokkan bersama
- Mudah menemukan dan maintain kode

### ✅ **Path Aliases yang Jelas**
- Import yang lebih pendek dan readable
- Mudah refactor dan reorganize
- Konsisten di seluruh aplikasi

### ✅ **Separation of Concerns**
- **fitur/**: Business logic components
- **tata-letak/**: Layout & navigation
- **penyedia/**: Providers & shared utilities
- **utilitas/**: UI library & utilities

### ✅ **Type Safety**
- Centralized type definitions
- Easy to import and reuse
- Better IntelliSense support

### ✅ **Scalability**
- Easy to add new features
- Modular component structure
- Clear ownership of components

## 🚀 **Best Practices**

### 1. **Import Order**
```typescript
// 1. React imports
import React from 'react'
import { useState } from 'react'

// 2. Third-party libraries
import { NextPage } from 'next'

// 3. UI components
import { Button } from '@/utilitas/ui/button'

// 4. Layout components
import Header from '@/tata-letak/layout/header'

// 5. Feature components
import { FinanceAdmin } from '@/fitur/keuangan'

// 6. Types
import type { User } from '@/types'

// 7. Local imports
import './styles.css'
```

### 2. **Component Structure**
```typescript
// components/fitur/keuangan/finance-dashboard.tsx
export function FinanceDashboard() {
  // Component logic
}

// components/fitur/keuangan/index.ts
export { FinanceDashboard } from './finance-dashboard'
export { PaymentTable } from './payment-table'

// Usage
import { FinanceDashboard } from '@/fitur/keuangan'
```

### 3. **Naming Consistency**
- File names: `kebab-case.tsx`
- Component names: `PascalCase`
- Directory names: `kebab-case` (Indonesian)

## 📈 **Migration Status**

### ✅ **Completed**
- [x] Feature-based directory structure
- [x] Path aliases configuration
- [x] Centralized type definitions
- [x] Core import path updates
- [x] Indonesian naming convention

### 📋 **Next Steps**
- [ ] Complete all import path updates
- [ ] Add component documentation
- [ ] Implement proper i18n usage
- [ ] Add ESLint/Prettier rules
- [ ] Create component templates

---

*Struktur ini dibuat untuk meningkatkan maintainability, scalability, dan developer experience pada SAKTI Dashboard.*