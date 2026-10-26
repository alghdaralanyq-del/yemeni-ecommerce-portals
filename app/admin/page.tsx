'use client'

import { useState, useEffect } from 'react'
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
        <div className="text-gray-600">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">لوحة إدارة النظام</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المنتجات قيد المراجعة</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingProducts}</div>
            <p className="text-xs text-muted-foreground">تحتاج إلى موافقة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المتاجر النشطة</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeVendors}</div>
            <p className="text-xs text-muted-foreground">متاجر نشطة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalSales)}</div>
            <p className="text-xs text-muted-foreground">جميع المتاجر</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">رسوم المنصة</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.platformFees)}</div>
            <p className="text-xs text-muted-foreground">3% من المبيعات</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أحدث المنتجات قيد المراجعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingProductsList.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{product.nameAr}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(product.basePrice)}</p>
                  </div>
                  <Badge variant="warning">قيد المراجعة</Badge>
                </div>
              ))}
              {pendingProductsList.length === 0 && (
                <p className="text-sm text-muted-foreground">لا توجد منتجات قيد المراجعة</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المتاجر النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeVendorsList.slice(0, 3).map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{vendor.nameAr}</p>
                    <p className="text-sm text-muted-foreground">{vendor.phone}</p>
                  </div>
                  <Badge variant={vendor.status === 'active' ? 'success' : 'destructive'}>
                    {vendor.status === 'active' ? 'نشط' : 'غير نشط'}
                  </Badge>
                </div>
              ))}
              {activeVendorsList.length === 0 && (
                <p className="text-sm text-muted-foreground">لا توجد متاجر نشطة</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
