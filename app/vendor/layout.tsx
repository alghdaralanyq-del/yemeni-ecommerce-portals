import Link from 'next/link'
import { Package, ShoppingCart, BarChart3, Home } from 'lucide-react'

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/vendor" className="flex items-center space-x-2 space-x-reverse">
                <Package className="h-8 w-8" />
                <span className="text-xl font-bold">لوحة تحكم المحلات</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm">متجر كنوز اليمن</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="/vendor"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>الرئيسية</span>
            </Link>
            <Link
              href="/vendor/products/new"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Package className="h-5 w-5" />
              <span>إضافة منتج</span>
            </Link>
            <Link
              href="/vendor/orders"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>الطلبات</span>
            </Link>
            <Link
              href="/vendor/analytics"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span>التحليلات المالية</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
