import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockOrders, mockProducts, mockFinancialSummary } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { ShoppingCart, Package, TrendingUp, DollarSign } from 'lucide-react'

export default function VendorDashboard() {
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length
  const inStockProducts = mockProducts.filter(p => p.inventoryStatus === 'in-stock').length

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockFinancialSummary.totalSales)}</div>
            <p className="text-xs text-muted-foreground">+20.1% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الطلبات المعلقة</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">تحتاج إلى معالجة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المنتجات المتوفرة</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStockProducts}</div>
            <p className="text-xs text-muted-foreground">من أصل {mockProducts.length} منتج</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صافي الأرباح</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockFinancialSummary.netEarnings)}</div>
            <p className="text-xs text-muted-foreground">بعد خصم رسوم المنصة</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أحدث الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.items[0].productNameAr}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
                    <Badge variant={order.status === 'pending' ? 'warning' : 'success'}>
                      {order.status === 'pending' ? 'معلق' : order.status === 'accepted' ? 'مقبول' : order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>حالة المنتجات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{product.nameAr}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(product.basePrice)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={product.status === 'approved' ? 'success' : product.status === 'pending' ? 'warning' : 'destructive'}>
                      {product.status === 'approved' ? 'معتمد' : product.status === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
                    </Badge>
                    <Badge variant={product.inventoryStatus === 'in-stock' ? 'success' : 'destructive'}>
                      {product.inventoryStatus === 'in-stock' ? 'متوفر' : 'غير متوفر'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
