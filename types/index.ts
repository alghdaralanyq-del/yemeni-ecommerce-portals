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
