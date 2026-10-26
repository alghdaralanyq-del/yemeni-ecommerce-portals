'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Order {
  id: string
  totalAmount: number
  status: string
  customerName: string
  customerPhone: string
  customerAddress: string
  createdAt: string
  items: {
    productName: string
    productNameAr: string
    quantity: number
    price: number
  }[]
}

const statusLabels: Record<string, { ar: string; color: string }> = {
  pending: { ar: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-800' },
  accepted: { ar: 'مقبول', color: 'bg-blue-100 text-blue-800' },
  preparing: { ar: 'قيد التحضير', color: 'bg-purple-100 text-purple-800' },
  out_for_delivery: { ar: 'في الطريق', color: 'bg-orange-100 text-orange-800' },
  delivered: { ar: 'تم التوصيل', color: 'bg-green-100 text-green-800' },
  cancelled: { ar: 'ملغي', color: 'bg-red-100 text-red-800' },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders')
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">طلباتي</h1>

      {orders.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-600">لا توجد طلبات بعد</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    رقم الطلب: #{order.id.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('ar-EG')}
                  </p>
                </div>
                <Badge className={statusLabels[order.status]?.color}>
                  {statusLabels[order.status]?.ar}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.productNameAr} × {item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()} ريال</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t flex justify-between items-center">
                <span className="font-semibold">المجموع:</span>
                <span className="text-xl font-bold">
                  {order.totalAmount.toLocaleString()} ريال
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
