'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockVendors } from '@/lib/mock-data'
import { VendorStatus } from '@/types'

export default function UsersPage() {
  const [vendors, setVendors] = useState(mockVendors)

  const toggleVendorStatus = (vendorId: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, status: vendor.status === 'active' ? 'inactive' : 'active' as VendorStatus }
        : vendor
    ))
  }

  const getStatusBadge = (status: VendorStatus) => {
    const variants: Record<VendorStatus, 'success' | 'destructive' | 'warning'> = {
      'active': 'success',
      'inactive': 'destructive',
      'suspended': 'warning',
    }
    const labels: Record<VendorStatus, string> = {
      'active': 'نشط',
      'inactive': 'غير نشط',
      'suspended': 'معلق',
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>

      <Card>
        <CardHeader>
          <CardTitle>المتاجر</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم المتجر</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>المحفظة</TableHead>
                <TableHead>رقم المحفظة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{vendor.nameAr}</p>
                      <p className="text-sm text-muted-foreground">{vendor.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>
                    {vendor.walletProvider === 'alkuraimi' && 'الكريمي'}
                    {vendor.walletProvider === 'jeeb' && 'جيب'}
                    {vendor.walletProvider === 'jawali' && 'جوالي'}
                    {vendor.walletProvider === 'other' && 'أخرى'}
                  </TableCell>
                  <TableCell>{vendor.walletNumber || '-'}</TableCell>
                  <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={vendor.status === 'active' ? 'destructive' : 'default'}
                      onClick={() => toggleVendorStatus(vendor.id)}
                    >
                      {vendor.status === 'active' ? 'تعطيل' : 'تفعيل'}
                    </Button>
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
