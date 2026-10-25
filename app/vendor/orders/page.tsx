'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockOrders } from '@/lib/mock-data'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { OrderStatus } from '@/types'

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const getStatusBadge = (status: OrderStatus) => {
    const variants: Record<OrderStatus, 'warning' | 'success' | 'destructive' | 'default'> = {
      'pending': 'warning',
      'accepted': 'success',
      'preparing': 'default',
      'out-for-delivery': 'default',
      'delivered': 'success',
      'cancelled': 'destructive',
    }
    const labels: Record<OrderStatus, string> = {
      'pending': 'معلق',
      'accepted': 'مقبول',
      'preparing': 'قيد التحضير',
      'out-for-delivery': 'في الطريق',
      'delivered': 'تم التسليم',
      'cancelled': 'ملغي',
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-2 neon-text-cyan">إدارة الطلبات</h1>
      <p className="text-gray-400 mb-6">إدارة وتتبع طلبات المتجر</p>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">جميع الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">رقم الطلب</TableHead>
                <TableHead className="text-gray-300">العميل</TableHead>
                <TableHead className="text-gray-300">المنتجات</TableHead>
                <TableHead className="text-gray-300">المبلغ</TableHead>
                <TableHead className="text-gray-300">التاريخ</TableHead>
                <TableHead className="text-gray-300">الحالة</TableHead>
                <TableHead className="text-gray-300">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-slate-700/50">
                  <TableCell className="font-medium text-white">#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        {item.productNameAr} × {item.quantity}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="font-medium text-white">{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell className="text-gray-300">{formatDateTime(order.createdAt)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'accepted')}
                            className="bg-green-600 hover:bg-green-700 neon-glow-green"
                          >
                            قبول
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          >
                            رفض
                          </Button>
                        </>
                      )}
                      {order.status === 'accepted' && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                        >
                          بدء التحضير
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'out-for-delivery')}
                        >
                          إرسال للتوصيل
                        </Button>
                      )}
                      {order.status === 'out-for-delivery' && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="bg-green-600 hover:bg-green-700 neon-glow-green"
                        >
                          تم التسليم
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
