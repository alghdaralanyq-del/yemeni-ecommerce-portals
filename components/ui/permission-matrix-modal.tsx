'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Shield, Lock, Package, ShoppingCart, DollarSign, Users, FileText, Settings } from 'lucide-react'
import { Permission } from '@/types'

interface PermissionMatrixModalProps {
  isOpen: boolean
  onClose: () => void
  availablePermissions: Permission[]
  selectedPermissions: string[]
  onPermissionsChange: (permissions: string[]) => void
  title: string
  type: 'admin' | 'vendor'
}

const categoryIcons: Record<string, any> = {
  products: Package,
  orders: ShoppingCart,
  financials: DollarSign,
  users: Users,
  reports: FileText,
  settings: Settings,
}

const categoryNames: Record<string, string> = {
  products: 'المنتجات',
  orders: 'الطلبات',
  financials: 'المالية',
  users: 'المستخدمين',
  reports: 'التقارير',
  settings: 'الإعدادات',
}

export default function PermissionMatrixModal({
  isOpen,
  onClose,
  availablePermissions,
  selectedPermissions,
  onPermissionsChange,
  title,
  type,
}: PermissionMatrixModalProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedPermissions)

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  const togglePermission = (permissionId: string) => {
    setLocalSelected(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId)
      } else {
        return [...prev, permissionId]
      }
    })
  }

  const toggleCategory = (category: string) => {
    const categoryPermissions = groupedPermissions[category].map(p => p.id)
    const allSelected = categoryPermissions.every(id => localSelected.includes(id))
    
    setLocalSelected(prev => {
      if (allSelected) {
        return prev.filter(id => !categoryPermissions.includes(id))
      } else {
        const newSet = new Set([...prev, ...categoryPermissions])
        return Array.from(newSet)
      }
    })
  }

  const handleSave = () => {
    onPermissionsChange(localSelected)
    onClose()
  }

  const isCategoryFullySelected = (category: string) => {
    const categoryPermissions = groupedPermissions[category].map(p => p.id)
    return categoryPermissions.every(id => localSelected.includes(id))
  }

  const isCategoryPartiallySelected = (category: string) => {
    const categoryPermissions = groupedPermissions[category].map(p => p.id)
    const selectedCount = categoryPermissions.filter(id => localSelected.includes(id)).length
    return selectedCount > 0 && selectedCount < categoryPermissions.length
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <p className="text-sm text-gray-400">
                      حدد الصلاحيات لهذا الحساب الفرعي
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar max-h-[60vh]">
                <div className="space-y-6">
                  {Object.entries(groupedPermissions).map(([category, permissions]) => {
                    const Icon = categoryIcons[category] || Lock
                    const isFullySelected = isCategoryFullySelected(category)
                    const isPartiallySelected = isCategoryPartiallySelected(category)

                    return (
                      <motion.div
                        key={category}
                        className="space-y-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {/* Category Header */}
                        <div
                          className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                          onClick={() => toggleCategory(category)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-cyan-400" />
                            </div>
                            <span className="font-medium text-white">
                              {categoryNames[category] || category}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({permissions.length})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">
                              {permissions.filter(p => localSelected.includes(p.id)).length} / {permissions.length}
                            </span>
                            <div className="w-6 h-6 rounded border-2 flex items-center justify-center transition-colors"
                              style={{
                                borderColor: isFullySelected ? '#8b5cf6' : isPartiallySelected ? '#8b5cf6' : '#475569',
                                backgroundColor: isFullySelected ? 'rgba(139, 92, 246, 0.2)' : 'transparent'
                              }}
                            >
                              {isFullySelected && <Check size={14} className="text-purple-400" />}
                              {isPartiallySelected && <div className="w-3 h-3 bg-purple-400 rounded-sm" />}
                            </div>
                          </div>
                        </div>

                        {/* Permissions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {permissions.map((permission) => (
                            <motion.div
                              key={permission.id}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                localSelected.includes(permission.id)
                                  ? 'bg-purple-500/10 border-purple-500/50'
                                  : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600'
                              }`}
                              onClick={() => togglePermission(permission.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                                  localSelected.includes(permission.id)
                                    ? 'border-purple-500 bg-purple-500/20'
                                    : 'border-slate-600'
                                }`}>
                                  {localSelected.includes(permission.id) && (
                                    <Check size={12} className="text-purple-400" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-white text-sm">
                                    {permission.nameAr}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {permission.description}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-slate-700/50">
                <div className="text-sm text-gray-400">
                  <span className="text-purple-400 font-medium">{localSelected.length}</span> صلاحية محددة
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg border border-slate-600 text-gray-300 hover:bg-slate-700/50 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:from-purple-700 hover:to-cyan-700 transition-all neon-glow-purple"
                  >
                    حفظ التغييرات
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
