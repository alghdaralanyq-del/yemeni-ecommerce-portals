import { Product, Order, Vendor, FinancialTransaction, FinancialSummary, DailyReport } from '@/types'

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    vendorId: 'v1',
    name: 'Traditional Yemeni Coffee',
    nameAr: 'القهوة اليمنية التقليدية',
    description: 'Premium Yemeni coffee beans from Haraz region',
    descriptionAr: 'حبوب القهوة اليمنية الفاخرة من منطقة حرض',
    images: ['/coffee1.jpg'],
    basePrice: 25000,
    category: 'food',
    status: 'approved',
    inventoryStatus: 'in-stock',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    vendorId: 'v1',
    name: 'Honey from Hadhramaut',
    nameAr: 'عسل حضرموت',
    description: 'Pure Sidr honey from Hadhramaut mountains',
    descriptionAr: 'عسل سدر صافي من جبال حضرموت',
    images: ['/honey1.jpg'],
    basePrice: 45000,
    category: 'food',
    status: 'pending',
    inventoryStatus: 'in-stock',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
]

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'o1',
    vendorId: 'v1',
    customerId: 'c1',
    items: [
      {
        productId: '1',
        productName: 'Traditional Yemeni Coffee',
        productNameAr: 'القهوة اليمنية التقليدية',
        quantity: 2,
        price: 25000,
      },
    ],
    totalAmount: 50000,
    status: 'pending',
    customerName: 'أحمد محمد',
    customerPhone: '+967 777 123 456',
    customerAddress: 'صنعاء، شارع الزبيري',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: 'o2',
    vendorId: 'v1',
    customerId: 'c2',
    items: [
      {
        productId: '1',
        productName: 'Traditional Yemeni Coffee',
        productNameAr: 'القهوة اليمنية التقليدية',
        quantity: 1,
        price: 25000,
      },
    ],
    totalAmount: 25000,
    status: 'accepted',
    customerName: 'فاطمة علي',
    customerPhone: '+967 771 987 654',
    customerAddress: 'عدن، المنصورة',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
  },
]

// Mock Vendors
export const mockVendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Yemen Treasures Store',
    nameAr: 'متجر كنوز اليمن',
    email: 'vendor1@example.com',
    phone: '+967 777 111 222',
    status: 'active',
    walletProvider: 'alkuraimi',
    walletNumber: '+967 777 111 222',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'v2',
    name: 'Sana\'a Crafts',
    nameAr: 'حرف صنعاء',
    email: 'vendor2@example.com',
    phone: '+967 771 333 444',
    status: 'active',
    walletProvider: 'jeeb',
    walletNumber: '+967 771 333 444',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
]

// Mock Financial Transactions
export const mockFinancialTransactions: FinancialTransaction[] = [
  {
    id: 'ft1',
    vendorId: 'v1',
    orderId: 'o2',
    orderAmount: 25000,
    platformFee: 750, // 3%
    netAmount: 24250,
    walletProvider: 'alkuraimi',
    walletNumber: '+967 777 111 222',
    settlementStatus: 'pending',
    createdAt: new Date('2024-01-21'),
  },
]

// Mock Financial Summary
export const mockFinancialSummary: FinancialSummary = {
  totalSales: 75000,
  totalOrders: 2,
  platformFees: 2250,
  netEarnings: 72750,
  breakdownByWallet: [
    {
      provider: 'alkuraimi',
      totalSales: 75000,
      platformFees: 2250,
      netEarnings: 72750,
    },
  ],
}

// Mock Daily Reports
export const mockDailyReports: DailyReport[] = [
  {
    date: '2024-01-22',
    totalSales: 50000,
    totalOrders: 1,
    platformFees: 1500,
    netEarnings: 48500,
    breakdownByWallet: [
      {
        provider: 'alkuraimi',
        totalSales: 50000,
        platformFees: 1500,
      },
    ],
  },
  {
    date: '2024-01-21',
    totalSales: 25000,
    totalOrders: 1,
    platformFees: 750,
    netEarnings: 24250,
    breakdownByWallet: [
      {
        provider: 'alkuraimi',
        totalSales: 25000,
        platformFees: 750,
      },
    ],
  },
]

export const categories = [
  { id: '1', name: 'Food & Beverages', nameAr: 'الأغذية والمشروبات' },
  { id: '2', name: 'Clothing', nameAr: 'الملابس' },
  { id: '3', name: 'Electronics', nameAr: 'الإلكترونيات' },
  { id: '4', name: 'Home & Garden', nameAr: 'المنزل والحديقة' },
  { id: '5', name: 'Crafts & Art', nameAr: 'الحرف والفنون' },
]
