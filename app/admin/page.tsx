import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockProducts, mockVendors, mockFinancialSummary } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Package, Users, DollarSign, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
  const pendingProducts = mockProducts.filter(p => p.status === 'pending').length
  const activeVendors = mockVendors.filter(v => v.status === 'active').length

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
            <div className="text-2xl font-bold">{pendingProducts}</div>
            <p className="text-xs text-muted-foreground">تحتاج إلى موافقة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المتاجر النشطة</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeVendors}</div>
            <p className="text-xs text-muted-foreground">من أصل {mockVendors.length} متجر</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockFinancialSummary.totalSales)}</div>
            <p className="text-xs text-muted-foreground">جميع المتاجر</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">رسوم المنصة</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(mockFinancialSummary.platformFees)}</div>
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
              {mockProducts.filter(p => p.status === 'pending').slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{product.nameAr}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(product.basePrice)}</p>
                  </div>
                  <Badge variant="warning">قيد المراجعة</Badge>
                </div>
              ))}
              {pendingProducts === 0 && (
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
              {mockVendors.slice(0, 3).map((vendor) => (
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
