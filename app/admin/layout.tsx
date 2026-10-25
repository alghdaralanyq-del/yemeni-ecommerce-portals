'use client'

import Link from 'next/link'
import { Shield, Package, DollarSign, Users, Home, LogOut, UserCog } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { logout, user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-premium">
      <nav className="glass border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center space-x-2 space-x-reverse">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center neon-glow-purple">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white neon-text-purple">لوحة إدارة النظام</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm text-gray-300">{user?.name || 'المسؤول'}</span>
              <button
                onClick={logout}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 glass border-l border-slate-700/50 min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>الرئيسية</span>
            </Link>
            <Link
              href="/admin/moderation"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <Package className="h-5 w-5" />
              <span>مراجعة المنتجات</span>
            </Link>
            <Link
              href="/admin/financial"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <DollarSign className="h-5 w-5" />
              <span>التقارير المالية</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>إدارة المستخدمين</span>
            </Link>
            <Link
              href="/admin/sub-accounts"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <UserCog className="h-5 w-5" />
              <span>الحسابات الفرعية</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8 custom-scrollbar overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
