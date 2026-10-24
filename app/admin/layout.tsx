import Link from 'next/link'
import { Shield, Package, DollarSign, Users, Home } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center space-x-2 space-x-reverse">
                <Shield className="h-8 w-8" />
                <span className="text-xl font-bold">لوحة إدارة النظام</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm">المسؤول</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>الرئيسية</span>
            </Link>
            <Link
              href="/admin/moderation"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <Package className="h-5 w-5" />
              <span>مراجعة المنتجات</span>
            </Link>
            <Link
              href="/admin/financial"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <DollarSign className="h-5 w-5" />
              <span>التقارير المالية</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>إدارة المستخدمين</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
