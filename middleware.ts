import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check for authentication token in localStorage (client-side check)
  // For server-side middleware, we'll use cookies
  const authToken = request.cookies.get('auth_token')
  
  // Protected admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!authToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  // Protected vendor routes
  if (pathname.startsWith('/vendor') && pathname !== '/vendor/login') {
    if (!authToken) {
      return NextResponse.redirect(new URL('/vendor/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/vendor/:path*',
  ],
}
