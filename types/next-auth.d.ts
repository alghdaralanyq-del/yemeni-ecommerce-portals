import { UserRole } from "./index"

declare module "next-auth" {
  interface User {
    id: string
    role: UserRole
    permissions: any[]
    vendorId?: string
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: UserRole
      permissions: any[]
      vendorId?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
    permissions: any[]
    vendorId?: string
  }
}
