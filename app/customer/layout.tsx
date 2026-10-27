import Link from 'next/link'
import { ShoppingCart, User, ShoppingBag } from 'lucide-react'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#090A0F]">
      <nav className="backdrop-blur-xl bg-white/[0.03] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <span className="text-white font-bold text-lg">ت</span>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">تيقن</span>
                  <p className="text-xs text-gray-500">تسوق</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/customer"
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
              </Link>
              <Link
                href="/customer/cart"
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
              </Link>
              <Link
                href="/customer/profile"
                className="p-2 text-gray-400 hover:text-white transition-colors"
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
