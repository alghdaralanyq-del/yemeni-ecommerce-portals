'use client'

import { useState, useEffect } from 'react'
import { prisma } from '@/lib/prisma'
import { Product } from '@/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

export default function CustomerPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      toast.error('فشل تحميل المنتجات')
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
    toast.success('تمت إضافة المنتج إلى السلة')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">المنتجات المتاحة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.filter(p => p.status === 'approved' && p.inventoryStatus === 'in-stock').map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              {product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.nameAr}
                  className="object-cover w-full h-48"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center text-gray-400">
                  لا توجد صورة
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.nameAr}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{product.name}</p>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {product.descriptionAr}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  {product.basePrice.toLocaleString()} ريال
                </span>
                <Button
                  onClick={() => addToCart(product.id)}
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  أضف للسلة
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {products.filter(p => p.status === 'approved' && p.inventoryStatus === 'in-stock').length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">لا توجد منتجات متاحة حالياً</p>
        </div>
      )}
    </div>
  )
}
