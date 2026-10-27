'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { Package, Users, DollarSign, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pendingProducts: 0,
    activeVendors: 0,
    totalSales: 0,
    platformFees: 0,
  })
  const [pendingProductsList, setPendingProductsList] = useState<any[]>([])
  const [activeVendorsList, setActiveVendorsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [productsRes, vendorsRes, financialRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch('/api/admin/vendors'),
        fetch('/api/admin/financial'),
      ])

      const products = await productsRes.json()
      const vendors = await vendorsRes.json()
      const financial = await financialRes.json()

      setStats({
        pendingProducts: products.pendingCount || 0,
        activeVendors: vendors.activeCount || 0,
        totalSales: financial.totalSales || 0,
        platformFees: financial.platformFees || 0,
      })

      setPendingProductsList(products.pendingProducts || [])
      setActiveVendorsList(vendors.activeVendors || [])
    } catch (error) {
      console.error('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          لوحة إدارة النظام
        </h1>
        <p className="text-gray-500 mt-1">نظرة عامة على أداء المنصة</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'المنتجات قيد المراجعة', value: stats.pendingProducts, subtitle: 'تحتاج إلى موافقة', icon: AlertCircle, color: 'from-yellow-500/20 to-orange-500/20', borderColor: 'border-yellow-500/30' },
          { title: 'المتاجر النشطة', value: stats.activeVendors, subtitle: 'متاجر نشطة', icon: Users, color: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-500/30' },
          { title: 'إجمالي المبيعات', value: formatCurrency(stats.totalSales), subtitle: 'جميع المتاجر', icon: DollarSign, color: 'from-green-500/20 to-emerald-500/20', borderColor: 'border-green-500/30' },
          { title: 'رسوم المنصة', value: formatCurrency(stats.platformFees), subtitle: '3% من المبيعات', icon: Package, color: 'from-purple-500/20 to-pink-500/20', borderColor: 'border-purple-500/30' },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className={`backdrop-blur-xl bg-gradient-to-br ${stat.color} bg-white/[0.03] border ${stat.borderColor}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="backdrop-blur-xl bg-white/[0.03] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">أحدث المنتجات قيد المراجعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingProductsList.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="font-medium text-white">{product.nameAr}</p>
                      <p className="text-sm text-gray-500">{formatCurrency(product.basePrice)}</p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">قيد المراجعة</Badge>
                  </div>
                ))}
                {pendingProductsList.length === 0 && (
                  <p className="text-sm text-gray-500">لا توجد منتجات قيد المراجعة</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="backdrop-blur-xl bg-white/[0.03] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">المتاجر النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeVendorsList.slice(0, 3).map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="font-medium text-white">{vendor.nameAr}</p>
                      <p className="text-sm text-gray-500">{vendor.phone}</p>
                    </div>
                    <Badge className={vendor.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                      {vendor.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                ))}
                {activeVendorsList.length === 0 && (
                  <p className="text-sm text-gray-500">لا توجد متاجر نشطة</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
