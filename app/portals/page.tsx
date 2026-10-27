'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Shield, Store, Users, Zap, ArrowRight } from 'lucide-react'

const portals = [
  {
    id: 'admin',
    title: 'بوابة الإدارة',
    titleEn: 'Admin Portal',
    icon: Shield,
    description: 'إدارة النظام والمراجعة والتقارير',
    descriptionEn: 'System management, moderation & reports',
    color: 'from-purple-600 to-pink-600',
    route: '/admin/login',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 'vendor',
    title: 'بوابة المتاجر',
    titleEn: 'Vendor Portal',
    icon: Store,
    description: 'إدارة المنتجات والطلبات والمبيعات',
    descriptionEn: 'Product, order & sales management',
    color: 'from-blue-600 to-cyan-600',
    route: '/vendor/login',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'subaccount',
    title: 'بوابة الحسابات الفرعية',
    titleEn: 'Sub-Accounts',
    icon: Users,
    description: 'دخول الموظفين والمحاسبين',
    descriptionEn: 'Staff & accountant access',
    color: 'from-emerald-600 to-teal-600',
    route: '/subaccount/login',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
  },
]

export default function PortalSelection() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#090A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            تيقن
          </motion.h1>
          <p className="text-xl text-gray-400 mb-2">Teyqen</p>
          <p className="text-gray-500">اختر البوابة المناسبة للدخول</p>
        </motion.div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portals.map((portal, index) => {
            const Icon = portal.icon
            return (
              <motion.div
                key={portal.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <motion.div
                  className={`relative bg-gradient-to-br ${portal.gradient} backdrop-blur-xl bg-white/[0.03] border ${portal.borderColor} rounded-3xl p-8 cursor-pointer overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push(portal.route)}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 5 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-2">{portal.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">{portal.titleEn}</p>
                  <p className="text-gray-500 text-sm mb-6">{portal.description}</p>
                  <p className="text-gray-600 text-xs mb-4">{portal.descriptionEn}</p>

                  {/* Arrow */}
                  <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">دخول</span>
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Demo accounts info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="inline-block bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 mb-4 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              حسابات تجريبية جاهزة للاختبار
            </p>
            <div className="flex gap-8 justify-center text-sm">
              <div>
                <p className="text-gray-500">Admin:</p>
                <p className="text-white font-mono">admin@teyqen.com</p>
              </div>
              <div>
                <p className="text-gray-500">Vendor:</p>
                <p className="text-white font-mono">vendor@teyqen.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
