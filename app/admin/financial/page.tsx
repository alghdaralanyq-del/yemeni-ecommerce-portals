'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockFinancialSummary, mockDailyReports } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, DollarSign, ShoppingCart, Wallet } from 'lucide-react'
import TiltCard from '@/components/ui/tilt-card'

export default function FinancialPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-2 neon-text-purple">التقارير المالية</h1>
      <p className="text-gray-400 mb-6">نظرة عامة على الأداء المالي للمنصة</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TiltCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">إجمالي المبيعات</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(mockFinancialSummary.totalSales)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">{mockFinancialSummary.totalOrders} طلب</p>
        </TiltCard>

        <TiltCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">رسوم المنصة (3%)</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(mockFinancialSummary.platformFees)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">إيراد المنصة</p>
        </TiltCard>

        <TiltCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">صافي أرباح المتاجر</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(mockFinancialSummary.netEarnings)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">بعد خصم الرسوم</p>
        </TiltCard>

        <TiltCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-pink-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">إجمالي الطلبات</p>
              <p className="text-2xl font-bold text-white">{mockFinancialSummary.totalOrders}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">طلب مكتمل</p>
        </TiltCard>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">توزيع العمولات حسب المحفظة الإلكترونية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFinancialSummary.breakdownByWallet.map((wallet) => (
              <div key={wallet.provider} className="border-b border-slate-700/50 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-white">
                      {wallet.provider === 'alkuraimi' && 'الكريمي'}
                      {wallet.provider === 'jeeb' && 'جيب'}
                      {wallet.provider === 'jawali' && 'جوالي'}
                      {wallet.provider === 'other' && 'أخرى'}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-green-400">{formatCurrency(wallet.platformFees)}</p>
                    <p className="text-sm text-gray-500">
                      عمولة المنصة (3%)
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                  <div>
                    <p className="text-gray-500">المبيعات</p>
                    <p className="font-medium text-white">{formatCurrency(wallet.totalSales)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">صافي المتجر</p>
                    <p className="font-medium text-white">{formatCurrency(wallet.netEarnings)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">النسبة</p>
                    <p className="font-medium text-white">
                      {((wallet.totalSales / mockFinancialSummary.totalSales) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
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

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">التقارير اليومية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDailyReports.map((report) => (
              <div key={report.date} className="border border-slate-700/50 rounded-lg p-4 bg-slate-800/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{report.date}</h4>
                  <div className="text-left">
                    <p className="font-bold text-green-400">{formatCurrency(report.platformFees)}</p>
                    <p className="text-sm text-gray-500">عمولة المنصة</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">المبيعات</p>
                    <p className="font-medium text-white">{formatCurrency(report.totalSales)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">الطلبات</p>
                    <p className="font-medium text-white">{report.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">العمولة</p>
                    <p className="font-medium text-green-400">{formatCurrency(report.platformFees)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">صافي المتاجر</p>
                    <p className="font-medium text-white">{formatCurrency(report.netEarnings)}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                  <p className="text-xs text-gray-500 mb-2">توزيع حسب المحفظة:</p>
                  <div className="flex gap-4 text-xs">
                    {report.breakdownByWallet.map((wallet) => (
                      <div key={wallet.provider}>
                        <span className="font-medium text-white">
                          {wallet.provider === 'alkuraimi' && 'الكريمي'}
                          {wallet.provider === 'jeeb' && 'جيب'}
                          {wallet.provider === 'jawali' && 'جوالي'}
                          {wallet.provider === 'other' && 'أخرى'}
                        </span>
                        : {formatCurrency(wallet.platformFees)}
                      </div>
                    ))}
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
