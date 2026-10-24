import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockFinancialSummary, mockDailyReports } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, DollarSign, ShoppingCart, Percent } from 'lucide-react'

export default function AnalyticsPage() {
  const platformFeeRate = 0.03

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">التحليلات المالية</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockFinancialSummary.totalSales)}</div>
            <p className="text-xs text-muted-foreground">{mockFinancialSummary.totalOrders} طلب</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">رسوم المنصة (3%)</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(mockFinancialSummary.platformFees)}</div>
            <p className="text-xs text-muted-foreground">خصم من المبيعات</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صافي الأرباح</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(mockFinancialSummary.netEarnings)}</div>
            <p className="text-xs text-muted-foreground">بعد خصم الرسوم</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFinancialSummary.totalOrders}</div>
            <p className="text-xs text-muted-foreground">طلب مكتمل</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>توزيع المبيعات حسب المحفظة الإلكترونية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFinancialSummary.breakdownByWallet.map((wallet) => (
              <div key={wallet.provider} className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">
                      {wallet.provider === 'alkuraimi' && 'الكريمي'}
                      {wallet.provider === 'jeeb' && 'جيب'}
                      {wallet.provider === 'jawali' && 'جوالي'}
                      {wallet.provider === 'other' && 'أخرى'}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{formatCurrency(wallet.netEarnings)}</p>
                    <p className="text-sm text-muted-foreground">
                      رسوم: {formatCurrency(wallet.platformFees)}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(wallet.totalSales / mockFinancialSummary.totalSales) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>التقارير اليومية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDailyReports.map((report) => (
              <div key={report.date} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{report.date}</h4>
                  <div className="text-left">
                    <p className="font-bold text-green-600">{formatCurrency(report.netEarnings)}</p>
                    <p className="text-sm text-muted-foreground">صافي الربح</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">المبيعات</p>
                    <p className="font-medium">{formatCurrency(report.totalSales)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">الطلبات</p>
                    <p className="font-medium">{report.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">الرسوم</p>
                    <p className="font-medium text-red-600">{formatCurrency(report.platformFees)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
