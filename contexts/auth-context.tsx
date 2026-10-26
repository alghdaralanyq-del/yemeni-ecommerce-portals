'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { UserRole, Permission } from '@/types'

interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  vendorId?: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => Promise<void>
  hasPermission: (permissionId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  const user: AuthUser | null = session?.user ? {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
    permissions: session.user.permissions,
    vendorId: session.user.vendorId
  } : null

  const logout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const hasPermission = (permissionId: string): boolean => {
    if (!user) return false
    return user.permissions.some(p => p.id === permissionId)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading: status === 'loading',
      logout,
      hasPermission 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
