'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Package, DollarSign, Users, Home, LogOut, UserCog, Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { logout, user } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-premium">
      {/* Mobile Header */}
      <nav className="lg:hidden glass border-b border-slate-700/50 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-gray-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">لوحة الإدارة</span>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Header */}
      <nav className="hidden lg:flex glass border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/admin" className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center neon-glow-purple">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-white neon-text-purple">لوحة إدارة النظام</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <UserCog className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user?.name || 'المسؤول'}</p>
                  <p className="text-xs text-gray-500">مسؤول النظام</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-3 hover:bg-slate-700/50 rounded-xl transition-colors text-gray-400 hover:text-white"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 glass border-r border-slate-700/50 pt-20"
            >
              <nav className="p-4 space-y-2">
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
                >
                  <Home className="h-6 w-6" />
                  <span className="text-lg">الرئيسية</span>
                </Link>
                <Link
                  href="/admin/moderation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
                >
                  <Package className="h-6 w-6" />
                  <span className="text-lg">مراجعة المنتجات</span>
                </Link>
                <Link
                  href="/admin/financial"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
                >
                  <DollarSign className="h-6 w-6" />
                  <span className="text-lg">التقارير المالية</span>
                </Link>
                <Link
                  href="/admin/users"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
                >
                  <Users className="h-6 w-6" />
                  <span className="text-lg">إدارة المستخدمين</span>
                </Link>
                <Link
                  href="/admin/sub-accounts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
                >
                  <UserCog className="h-6 w-6" />
                  <span className="text-lg">الحسابات الفرعية</span>
                </Link>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? 320 : 80 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="hidden lg:block glass border-l border-slate-700/50 min-h-screen overflow-hidden"
        >
          <nav className="p-6 space-y-3">
            <Link
              href="/admin"
              className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
            >
              <Home className="h-7 w-7 flex-shrink-0" />
              <motion.span
                initial={false}
                animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                transition={{ duration: 0.2 }}
                className="text-lg whitespace-nowrap"
              >
                الرئيسية
              </motion.span>
            </Link>
            <Link
              href="/admin/moderation"
              className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
            >
              <Package className="h-7 w-7 flex-shrink-0" />
              <motion.span
                initial={false}
                animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                transition={{ duration: 0.2 }}
                className="text-lg whitespace-nowrap"
              >
                مراجعة المنتجات
              </motion.span>
            </Link>
            <Link
              href="/admin/financial"
              className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
            >
              <DollarSign className="h-7 w-7 flex-shrink-0" />
              <motion.span
                initial={false}
                animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                transition={{ duration: 0.2 }}
                className="text-lg whitespace-nowrap"
              >
                التقارير المالية
              </motion.span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
            >
              <Users className="h-7 w-7 flex-shrink-0" />
              <motion.span
                initial={false}
                animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                transition={{ duration: 0.2 }}
                className="text-lg whitespace-nowrap"
              >
                إدارة المستخدمين
              </motion.span>
            </Link>
            <Link
              href="/admin/sub-accounts"
              className="flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
            >
              <UserCog className="h-7 w-7 flex-shrink-0" />
              <motion.span
                initial={false}
                animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                transition={{ duration: 0.2 }}
                className="text-lg whitespace-nowrap"
              >
                الحسابات الفرعية
              </motion.span>
            </Link>
          </nav>
        </motion.aside>

        {/* Overlay for mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
            />
          )}
        </AnimatePresence>

        <main className="flex-1 p-4 lg:p-8 custom-scrollbar overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
