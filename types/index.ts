// Product Types
export type ProductStatus = 'pending' | 'approved' | 'rejected'
export type InventoryStatus = 'in-stock' | 'out-of-stock'

export interface Product {
  id: string
  vendorId: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  images: string[]
  basePrice: number
  category: string
  status: ProductStatus
  inventoryStatus: InventoryStatus
  rejectionReason?: string
  createdAt: Date
  updatedAt: Date
}

export interface NewProductFormData {
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  images: File[]
  basePrice: number
  category: string
}

// Order Types
export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  productName: string
  productNameAr: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  vendorId: string
  customerId: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  customerName: string
  customerPhone: string
  customerAddress: string
  createdAt: Date
  updatedAt: Date
}

// Vendor Types
export type VendorStatus = 'active' | 'inactive' | 'suspended'

export interface Vendor {
  id: string
  name: string
  nameAr: string
  email: string
  phone: string
  status: VendorStatus
  walletProvider?: 'alkuraimi' | 'jeeb' | 'jawali' | 'other'
  walletNumber?: string
  createdAt: Date
  updatedAt: Date
}

// User Types
export type UserRole = 'admin' | 'vendor' | 'customer'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

// Sub-Account & RBAC Types
export type AdminSubRole = 'super-admin' | 'product-reviewer' | 'support-ops-agent'
export type VendorSubRole = 'financial-accountant' | 'inventory-manager'

export interface Permission {
  id: string
  name: string
  nameAr: string
  category: 'products' | 'orders' | 'financials' | 'users' | 'reports' | 'settings'
  description: string
}

export interface SubAccount {
  id: string
  parentId: string
  name: string
  email: string
  phone: string
  role: AdminSubRole | VendorSubRole
  permissions: Permission[]
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

// Pre-defined Permission Sets
export const ADMIN_PERMISSIONS: Permission[] = [
  { id: 'p1', name: 'View Products', nameAr: 'عرض المنتجات', category: 'products', description: 'Can view all products' },
  { id: 'p2', name: 'Approve Products', nameAr: 'الموافقة على المنتجات', category: 'products', description: 'Can approve pending products' },
  { id: 'p3', name: 'Reject Products', nameAr: 'رفض المنتجات', category: 'products', description: 'Can reject products' },
  { id: 'p4', name: 'View Users', nameAr: 'عرض المستخدمين', category: 'users', description: 'Can view all users' },
  { id: 'p5', name: 'Manage User Status', nameAr: 'إدارة حالة المستخدم', category: 'users', description: 'Can activate/deactivate users' },
  { id: 'p6', name: 'View Vendors', nameAr: 'عرض البائعين', category: 'users', description: 'Can view all vendors' },
  { id: 'p7', name: 'Manage Vendor Status', nameAr: 'إدارة حالة البائع', category: 'users', description: 'Can activate/deactivate vendors' },
  { id: 'p8', name: 'View Financials', nameAr: 'عرض المالية', category: 'financials', description: 'Can view financial reports' },
  { id: 'p9', name: 'View Reports', nameAr: 'عرض التقارير', category: 'reports', description: 'Can view all reports' },
  { id: 'p10', name: 'Manage Settings', nameAr: 'إدارة الإعدادات', category: 'settings', description: 'Can manage system settings' },
]

export const VENDOR_PERMISSIONS: Permission[] = [
  { id: 'v1', name: 'View Products', nameAr: 'عرض المنتجات', category: 'products', description: 'Can view own products' },
  { id: 'v2', name: 'Add Products', nameAr: 'إضافة منتجات', category: 'products', description: 'Can add new products' },
  { id: 'v3', name: 'Edit Products', nameAr: 'تعديل المنتجات', category: 'products', description: 'Can edit own products' },
  { id: 'v4', name: 'Delete Products', nameAr: 'حذف المنتجات', category: 'products', description: 'Can delete own products' },
  { id: 'v5', name: 'View Orders', nameAr: 'عرض الطلبات', category: 'orders', description: 'Can view orders' },
  { id: 'v6', name: 'Update Order Status', nameAr: 'تحديث حالة الطلب', category: 'orders', description: 'Can update order status' },
  { id: 'v7', name: 'View Financials', nameAr: 'عرض المالية', category: 'financials', description: 'Can view financial reports' },
  { id: 'v8', name: 'View Reports', nameAr: 'عرض التقارير', category: 'reports', description: 'Can view sales reports' },
  { id: 'v9', name: 'Manage Inventory', nameAr: 'إدارة المخزون', category: 'products', description: 'Can manage inventory levels' },
]

// Role Permission Mappings
export const ADMIN_ROLE_PERMISSIONS: Record<AdminSubRole, string[]> = {
  'super-admin': ADMIN_PERMISSIONS.map(p => p.id),
  'product-reviewer': ['p1', 'p2', 'p3'],
  'support-ops-agent': ['p4', 'p5', 'p6', 'p7'],
}

export const VENDOR_ROLE_PERMISSIONS: Record<VendorSubRole, string[]> = {
  'financial-accountant': ['v7', 'v8'],
  'inventory-manager': ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v9'],
}

// Financial Types
export type WalletProvider = 'alkuraimi' | 'jeeb' | 'jawali' | 'other'

export interface FinancialTransaction {
  id: string
  vendorId: string
  orderId: string
  orderAmount: number
  platformFee: number // 3%
  netAmount: number
  walletProvider: WalletProvider
  walletNumber: string
  settlementStatus: 'pending' | 'settled'
  createdAt: Date
  settledAt?: Date
}

export interface FinancialSummary {
  totalSales: number
  totalOrders: number
  platformFees: number
  netEarnings: number
  breakdownByWallet: {
    provider: WalletProvider
    totalSales: number
    platformFees: number
    netEarnings: number
  }[]
}

export interface DailyReport {
  date: string
  totalSales: number
  totalOrders: number
  platformFees: number
  netEarnings: number
  breakdownByWallet: {
    provider: WalletProvider
    totalSales: number
    platformFees: number
  }[]
}

// Category Types
export interface Category {
  id: string
  name: string
  nameAr: string
}
