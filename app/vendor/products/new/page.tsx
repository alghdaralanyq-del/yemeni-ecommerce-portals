'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { categories } from '@/lib/mock-data'
import { NewProductFormData } from '@/types'

export default function NewProductPage() {
  const [formData, setFormData] = useState<NewProductFormData>({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    images: [],
    basePrice: 0,
    category: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting product:', formData)
    alert('تم إرسال المنتج للمراجعة بنجاح!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">إضافة منتج جديد</h1>

      <Card>
        <CardHeader>
          <CardTitle>معلومات المنتج</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم المنتج (إنجليزي)</label>
                <Input
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم المنتج (عربي)</label>
                <Input
                  placeholder="اسم المنتج"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">الوصف (إنجليزي)</label>
                <Textarea
                  placeholder="Product Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الوصف (عربي)</label>
                <Textarea
                  placeholder="وصف المنتج"
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">السعر الأساسي (ريال يمني)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.basePrice || ''}
                  onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">التصنيف</label>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">اختر التصنيف</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nameAr}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">صور المنتج</label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  setFormData({ ...formData, images: files })
                }}
              />
              <p className="text-xs text-muted-foreground">يمكنك رفع صور متعددة</p>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                إرسال للمراجعة
              </Button>
              <Button type="button" variant="outline">
                حفظ كمسودة
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
