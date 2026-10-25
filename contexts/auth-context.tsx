'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserRole, AdminSubRole, VendorSubRole, Permission } from '@/types'

interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  subRole?: AdminSubRole | VendorSubRole
  permissions: Permission[]
  parentId?: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  hasPermission: (permissionId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('auth_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock authentication - replace with actual API call
    // For demo purposes, we'll accept any email/password combination
    
    const mockUser: AuthUser = {
      id: 'user_1',
      name: role === 'admin' ? 'Admin User' : 'Vendor User',
      email,
      role,
      subRole: role === 'admin' ? 'super-admin' : undefined,
      permissions: role === 'admin' 
        ? [] // Will be populated based on sub-role
        : [],
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem('auth_user', JSON.stringify(mockUser))
    
    // Set cookie for middleware
    document.cookie = 'auth_token=authenticated; path=/; max-age=86400'
    
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('auth_user')
    
    // Clear cookie
    document.cookie = 'auth_token=; path=/; max-age=0'
  }

  const hasPermission = (permissionId: string): boolean => {
    if (!user) return false
    return user.permissions.some(p => p.id === permissionId)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, hasPermission }}>
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
