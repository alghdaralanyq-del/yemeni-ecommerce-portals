'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockProducts } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { ProductStatus } from '@/types'

export default function ModerationPage() {
  const [products, setProducts] = useState(mockProducts)
  const [rejectionReason, setRejectionReason] = useState<Record<string, string>>({})

  const updateProductStatus = (productId: string, status: ProductStatus, reason?: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, status, rejectionReason: reason } 
        : product
    ))
  }

  const getStatusBadge = (status: ProductStatus) => {
    const variants: Record<ProductStatus, 'warning' | 'success' | 'destructive'> = {
      'pending': 'warning',
      'approved': 'success',
      'rejected': 'destructive',
    }
    const labels: Record<ProductStatus, string> = {
      'pending': 'قيد المراجعة',
      'approved': 'معتمد',
      'rejected': 'مرفوض',
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">مراجعة المنتجات</h1>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم المنتج</TableHead>
                <TableHead>المتجر</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{product.nameAr}</p>
                      <p className="text-sm text-muted-foreground">{product.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>متجر #{product.vendorId}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(product.basePrice)}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    {product.status === 'pending' && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateProductStatus(product.id, 'approved')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            قبول
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              const reason = rejectionReason[product.id]
                              if (!reason) {
                                alert('الرجاء إدخال سبب الرفض')
                                return
                              }
                              updateProductStatus(product.id, 'rejected', reason)
                            }}
                          >
                            رفض
                          </Button>
                        </div>
                        <Input
                          placeholder="سبب الرفض..."
                          value={rejectionReason[product.id] || ''}
                          onChange={(e) => setRejectionReason({ ...rejectionReason, [product.id]: e.target.value })}
                          className="text-xs"
                        />
                      </div>
                    )}
                    {product.status === 'rejected' && product.rejectionReason && (
                      <p className="text-sm text-red-600">سبب: {product.rejectionReason}</p>
                    )}
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
