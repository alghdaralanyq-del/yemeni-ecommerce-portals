'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import TiltCard from '@/components/ui/tilt-card'
import PermissionMatrixModal from '@/components/ui/permission-matrix-modal'
import { SubAccount, VendorSubRole, VENDOR_PERMISSIONS, VENDOR_ROLE_PERMISSIONS } from '@/types'
import { Plus, Shield, User, Mail, Phone, Edit, Trash2 } from 'lucide-react'

export default function VendorSubAccountsPage() {
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([
    {
      id: 'vs1',
      parentId: 'v1',
      name: 'محمد المحاسب',
      email: 'mohammed@store.com',
      phone: '+967 777 111 222',
      role: 'financial-accountant',
      permissions: VENDOR_PERMISSIONS.filter(p => ['v7', 'v8'].includes(p.id)),
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'vs2',
      parentId: 'v1',
      name: 'سارة المخزون',
      email: 'sara@store.com',
      phone: '+967 771 333 444',
      role: 'inventory-manager',
      permissions: VENDOR_PERMISSIONS.filter(p => ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v9'].includes(p.id)),
      status: 'active',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<SubAccount | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const roleLabels: Record<VendorSubRole, string> = {
    'financial-accountant': 'محاسب مالي',
    'inventory-manager': 'مدير المخزون',
  }

  const handleEditPermissions = (account: SubAccount) => {
    setSelectedAccount(account)
    setSelectedPermissions(account.permissions.map(p => p.id))
    setIsModalOpen(true)
  }

  const handleSavePermissions = (permissions: string[]) => {
    if (selectedAccount) {
      setSubAccounts(accounts =>
        accounts.map(account =>
          account.id === selectedAccount.id
            ? {
                ...account,
                permissions: VENDOR_PERMISSIONS.filter(p => permissions.includes(p.id)),
                updatedAt: new Date(),
              }
            : account
        )
      )
    }
    setIsModalOpen(false)
    setSelectedAccount(null)
  }

  const handleDeleteAccount = (accountId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الحساب الفرعي؟')) {
      setSubAccounts(accounts => accounts.filter(account => account.id !== accountId))
    }
  }

  const handleToggleStatus = (accountId: string) => {
    setSubAccounts(accounts =>
      accounts.map(account =>
        account.id === accountId
          ? { ...account, status: account.status === 'active' ? 'inactive' : 'active' }
          : account
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 neon-text-cyan">
            إدارة الحسابات الفرعية
          </h1>
          <p className="text-gray-400">
            إدارة حسابات فريق المتجر وصلاحياتهم
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 neon-glow-cyan"
          onClick={() => {/* TODO: Implement create account modal */}}
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة حساب جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TiltCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <User className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{subAccounts.length}</p>
              <p className="text-sm text-gray-400">إجمالي الحسابات</p>
            </div>
          </div>
        </TiltCard>

        <TiltCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {subAccounts.filter(a => a.status === 'active').length}
              </p>
              <p className="text-sm text-gray-400">حسابات نشطة</p>
            </div>
          </div>
        </TiltCard>

        <TiltCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {subAccounts.filter(a => a.status === 'inactive').length}
              </p>
              <p className="text-sm text-gray-400">حسابات غير نشطة</p>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Sub-Accounts Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">قائمة الحسابات الفرعية</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">الاسم</TableHead>
                <TableHead className="text-gray-300">الدور</TableHead>
                <TableHead className="text-gray-300">البريد الإلكتروني</TableHead>
                <TableHead className="text-gray-300">الهاتف</TableHead>
                <TableHead className="text-gray-300">الحالة</TableHead>
                <TableHead className="text-gray-300">الصلاحيات</TableHead>
                <TableHead className="text-gray-300">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subAccounts.map((account) => (
                <TableRow key={account.id} className="border-slate-700/50">
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span>{account.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                      {roleLabels[account.role as VendorSubRole]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {account.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {account.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={account.status === 'active' ? 'default' : 'destructive'}
                      className={account.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : ''}
                    >
                      {account.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                      {account.permissions.length} صلاحية
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPermissions(account)}
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(account.id)}
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                      >
                        {account.status === 'active' ? 'تعطيل' : 'تفعيل'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permission Matrix Modal */}
      <PermissionMatrixModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedAccount(null)
        }}
        availablePermissions={VENDOR_PERMISSIONS}
        selectedPermissions={selectedPermissions}
        onPermissionsChange={handleSavePermissions}
        title={`تعديل صلاحيات: ${selectedAccount?.name}`}
        type="vendor"
      />
    </div>
  )
}
