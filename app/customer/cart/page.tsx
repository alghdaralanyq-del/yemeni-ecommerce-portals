'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'

interface CartItem {
  id: string
  productId: string
  quantity: number
  product: {
    id: string
    name: string
    nameAr: string
    basePrice: number
    images: string[]
  }
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      const data = await response.json()
      setCartItems(data.items || [])
    } catch (error) {
      toast.error('فشل تحميل السلة')
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return
    try {
      await fetch(`/api/cart/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      })
      fetchCart()
    } catch (error) {
      toast.error('فشل تحديث الكمية')
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE'
      })
      fetchCart()
      toast.success('تم حذف المنتج من السلة')
    } catch (error) {
      toast.error('فشل حذف المنتج')
    }
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.basePrice * item.quantity,
    0
  )

  const handleCheckout = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      toast.error('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    if (cartItems.length === 0) {
      toast.error('السلة فارغة')
      return
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerAddress
        })
      })

      if (response.ok) {
        toast.success('تم إنشاء الطلب بنجاح')
        router.push('/customer/orders')
      } else {
        toast.error('فشل إنشاء الطلب')
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء إنشاء الطلب')
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">سلة المشتريات</h1>

      {cartItems.length === 0 ? (
        <Card className="p-12 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">السلة فارغة</p>
          <Button onClick={() => router.push('/customer')}>
            تصفح المنتجات
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.nameAr}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      لا توجد صورة
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.product.nameAr}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{item.product.name}</p>
                  <p className="text-lg font-bold text-gray-900 mb-2">
                    {item.product.basePrice.toLocaleString()} ريال
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="mr-auto text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">معلومات التوصيل</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل *
                </label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="أحمد محمد"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف *
                </label>
                <Input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+967 777 123 456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  العنوان *
                </label>
                <Input
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="صنعاء، شارع الزبيري"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">المجموع الكلي:</span>
                <span className="text-2xl font-bold text-gray-900">
                  {totalAmount.toLocaleString()} ريال
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                إتمام الطلب
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
