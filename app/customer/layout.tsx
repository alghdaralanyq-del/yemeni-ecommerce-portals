import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                منصة التجارة اليمنية
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/customer/cart"
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <ShoppingCart className="w-6 h-6" />
              </Link>
              <Link
                href="/customer/profile"
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
